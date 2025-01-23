import webPush from "web-push";

export class PushNotificationServer {
  constructor(config) {
    this.publicKey = config.publicKey;
    this.privateKey = config.privateKey;
    this.email = config.email;
    this.subscriptions = new Map();

    webPush.setVapidDetails(
      `mailto:${this.email}`,
      this.publicKey,
      this.privateKey
    );
  }

  setupRoutes(app) {
    app.post("/save-subscription", this.saveSubscription.bind(this));
    app.post("/send-notification", this.sendNotification.bind(this));
  }

  saveSubscription(req, res) {
    const { user, key } = req.body;
    const userAuth = key?.keys?.auth;

    if (!this.subscriptions.has(key.endpoint)) {
      this.subscriptions.set(key.endpoint, { userAuth, key });
    }

    res.status(200).json({
      status: "success",
      message: "Subscription saved!",
    });
  }

  async sendNotification(req, res) {
    const data = req.body;

    if (this.subscriptions.size === 0) {
      return res.status(400).json({
        status: "error",
        message: "No subscriptions found",
      });
    }

    try {
      const results = await Promise.all(
        Array.from(this.subscriptions.values()).map((subscription) =>
          webPush
            .sendNotification(subscription.key, JSON.stringify(data))
            .then(() => ({ success: true }))
            .catch((err) => ({ success: false, error: err.message }))
        )
      );

      const successCount = results.filter((result) => result.success).length;
      const failureCount = results.length - successCount;

      res.status(200).json({
        status: "success",
        message: `Notifications sent! Success: ${successCount}, Failures: ${failureCount}`,
      });
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }
}
