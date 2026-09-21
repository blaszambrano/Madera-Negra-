self.addEventListener('push', function(event) {
  let data = { title: 'Madera Negra', body: 'Nuevo pedido' };
  try { data = event.data.json(); } catch (err) {}

  const opciones = {
    body: data.body || '',
    icon: data.icon || undefined,
    badge: data.badge || undefined,
    vibrate: [200, 80, 200],
    tag: data.tag || 'madera-negra-pedido',
    renotify: true,
    data: { url: data.url || '/vista-mozos.html' },
  };

  event.waitUntil(self.registration.showNotification(data.title || 'Madera Negra', opciones));
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  const url = (event.notification.data && event.notification.data.url) || '/vista-mozos.html';
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(function(clientList) {
      for (const client of clientList) {
        if (client.url.includes('vista-mozos') && 'focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow(url);
    })
  );
});
