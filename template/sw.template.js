/* eslint-disable no-restricted-globals */
/* eslint-env serviceworker */
self.addEventListener("push", (event) => {
  const resData = event.data.json();

  self.registration.showNotification("{{APP_NAME}}", {
    body: resData.body,
    icon: resData.icon,
    image: resData.image,
    badge: resData.badge,
    tag: resData.tag,
    data: {
      url: resData.url,
    },
  });
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil(clients.openWindow(event.notification.data.url));
});
