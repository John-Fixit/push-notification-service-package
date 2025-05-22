export class PushNotificationClient {
  constructor(config) {
    this.serverUrl = config.serverUrl;
    this.publicVapidKey = config.publicVapidKey;
    this.swPath = config.swPath || "/sw.js";
    this.userId = config.userId;
  }

  urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  async initialize() {
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
      console.log("Push notifications are not supported");
    }

    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.log("Notification permission not granted");
    }

    try {
      // 👇 Lazy-load VAPID key from the server if not passed in constructor
      if (!this.publicVapidKey) {
        const res = await fetch(`${this.serverUrl}/vapid-public-key`);
        const data = await res.json();
        console.log(data);
        this.publicVapidKey = data.publicKey;
      }
      const registration = await navigator.serviceWorker.register(this.swPath);
      await navigator.serviceWorker.ready;

      let subscription = await registration.pushManager.getSubscription();

      if (!subscription) {
        const convertedVapidKey = this.urlBase64ToUint8Array(
          this.publicVapidKey
        );
        subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: convertedVapidKey,
        });
      }

      await this.saveSubscription(subscription);
      return subscription;
    } catch (error) {
      console.error(`Service Worker Registration failed: ${error.message}`);
      return "There's an error";
    }
  }

  async saveSubscription(subscription) {
    const response = await fetch(`${this.serverUrl}/save-subscription`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: this.userId,
        key: subscription,
      }),
    });
    return response.json();
  }

  async sendNotification(notificationData) {
    try {
      const response = await fetch(`${this.serverUrl}/send-notification`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(notificationData),
      });
      return response.json();
    } catch (error) {
      console.log(error);
    }
  }
}
