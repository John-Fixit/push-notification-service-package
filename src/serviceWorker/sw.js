self.addEventListener("push", (event) => {
  const data = event.data.json();

  self.registration.showNotification(data.title || "Notification", {
    body: data.body,
    icon: data.icon,
    image: data.image,
    badge: data.badge,
    tag: data.tag,
    data: {
      url: data.url,
    },
  });
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url));
});
