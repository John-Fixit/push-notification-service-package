# Push Notification Service

A comprehensive push notification package that provides both client and server functionality, enabling web developers to integrate push notifications into their projects seamlessly.

## Features

- Client and Server: Includes both client-side and server-side implementations.
- Secure Communication: Uses VAPID keys for secure messaging.
- Customizable Notifications: Supports custom titles, body, icons, and actions.
- Persistent notification: Notifications will be delivered even if the app is not open, as long as the browser is running.
- Express Integration: Easily set up routes for handling push notifications

## Installation

Install the package via npm:

```bash
npm install push-notification-service
```

Or with Yarn:

```bash
yarn add push-notification-service
```

## Server Usage

The `PushNotificationServer` is used to handle push notification subscriptions and send notifications from your backend.

```javascript
import express from "express";
import { PushNotificationServer } from "push-notification-service/server";
import cors from "cors";

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*", // Adjust origin based on your environment
  })
);

const pushServer = new PushNotificationServer({
  publicKey: "YOUR_PUBLIC_VAPID_KEY", //only if available
  privateKey: "YOUR_PRIVATE_VAPID_KEY", //only if available
  email: "your-email@example.com", // Used for VAPID authentication
});

// Setup server routes for push notifications
pushServer.setupRoutes(app);

app.listen(8080, () => console.log("Server running on port 8080"));
```

### Configuration Options for `PushNotificationServer`

| Option       | Type     | Description                                        |
| :----------- | :------- | :------------------------------------------------- |
| `publicKey`  | `string` | The public VAPID key for your push notifications.  |
| `privateKey` | `string` | The private VAPID key for your push notifications. |
| `email`      | `string` | A contact email for VAPID authentication.          |

how to generate `publicKey and privateKey`, run `npm install web-push --save-dev && npx web-push generate-vapid-keys` in your project terminal

## Client Usage

After installing the package into your client side, you need the **service worker file `sw.js`** into your project's `public/` directory.

**You can use our CLI to do this and will create the file in your public directory automatically:**

```bash
npx create-sw "My App Name" //replace with your app name
```

**Manual Setup (Alternative to CLI)**
If you prefer **not to use the CLI**, you can manually set up the service worker for push notifications.

### 📁 Step 1: Get the Default Service Worker

Open the default service worker template in the repository:  
👉 [`template/sw.template.js`](https://github.com/John-Fixit/push-notification-service-package/blob/master/template/sw.template.js)

---

### 📂 Step 2: Copy It Into Your Project

Copy the contents of `sw.template.js` and paste it into `sw.js` file you created in your project’s `public/` directory:

The `PushNotificationClient` is used to initialize and send notifications from the frontend.

```javascript
import { PushNotificationClient } from "push-notification-service/client";

const pushClient = new PushNotificationClient({
  serverUrl: "http://localhost:8080", // Replace with your backend server(Node.js) URL
  userId: "unique-user-id", // Replace with the user's unique identifier(anything for your identifier)
});

// Initialize the push notification client
async function initializeNotifications() {
  try {
    await pushClient.initialize();
    console.log("Push notifications initialized successfully");
  } catch (error) {
    console.error("Failed to initialize push notifications:", error.message);
  }
}

initializeNotifications();
```

#### Sending Notification

```javascript
function handleSendNotification() {
  try {
    pushClient.sendNotification({
      body: "This is a sample notification!",
      icon: "https://example.com/icon.png",
      image: "https://example.com/image.png",
      badge: "https://example.com/badge.png",
      url: "https://example.com",
    });
  } catch (error) {
    console.error("Failed to send notification:", error.message);
  }
}

handleSendNotification();
```

### Configuration Options for `PushNotificationClient`

| Option           | Type     | Description                                                      |
| :--------------- | :------- | :--------------------------------------------------------------- |
| `serverUrl`      | `string` | The URL of your push notification server.                        |
| `publicVapidKey` | `string` | The public VAPID key for your push notifications.                |
| `userID`         | `string` | A unique identifier for the user (e.g., email, username, or ID). |

## Requirement

- A backend server running `PushNotificationServer` with VAPID keys.
- A modern browser that supports the Push API.
- HTTPS-enabled site (required for Push API in production).
- Generate sw.js file through CLI or copy the template.

## Contributing

We welcome contributions! Please follow these steps to contribute:

- Fork the repository.
- Create a new branch for your feature or bug fix.
- Submit a pull request with a detailed description of your changes
