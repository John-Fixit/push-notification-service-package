// src/index.js
export { PushNotificationClient } from "./client/PushNotificationClient.js";
export { PushNotificationServer } from "./server/PushNotificationServer.js";

// Only export server components if we're in a Node.js environment
// This prevents browser builds from including server code
// if (typeof window === "undefined") {
//   module.exports.PushNotificationServer =
//     require("./server/PushNotificationServer.js").PushNotificationServer;
// }
