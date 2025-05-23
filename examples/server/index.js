// examples/server/index.js
import express from "express";
import { PushNotificationServer } from "push-notification-service/server";
import cors from "cors";

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

const pushServer = new PushNotificationServer({
  publicKey:
    "BEI933NamyTJX3yq_O487ybrimEAVfw2aAnxOTLKkbyzAr-u-h5tIEhf8SMjslkDtlGXHUkN0Pz5jXpjredIkKU",
  privateKey: "m8lDYasYKsIB1x_pUhHc-avKUWL2qFpRoteDjE8mifU",
  email: "jfixcoding@gmail.com",
});

pushServer.setupRoutes(app);

app.listen(8080, () => console.log("Server running on port 8080"));
