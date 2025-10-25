// sw.js - Service Worker para Push Notifications
const CACHE_NAME = 'push-notifications-v1';
const urlsToCache = [
  '/',
  '/index.html'
];

// Instalar Service Worker
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

// Ativar Service Worker
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// 🔥 RECEBER MENSAGENS PUSH
self.addEventListener('push', function(event) {
  let data = {};
  
  try {
    data = event.data ? event.data.json() : {};
  } catch (error) {
    data = {
      title: '🔒 Sistema de Segurança',
      body: 'Alerta crítico de segurança!',
      requireInteraction: true
    };
  }

  const options = {
    body: data.body || 'Alerta de segurança!',
    icon: 'https://alexandre7888.github.io/ontono.exe/InShot_20251025_123921954.jpg',
    badge: 'https://alexandre7888.github.io/ontono.exe/InShot_20251025_123921954.jpg',
    image: 'https://alexandre7888.github.io/ontono.exe/InShot_20251025_123921954.jpg',
    tag: 'security-alert',
    requireInteraction: true,
    silent: false,
    vibrate: [200, 100, 200, 100, 200],
    actions: [
      {
        action: 'download',
        title: '📥 Download Segurança',
        icon: '/icon-download.png'
      },
      {
        action: 'info',
        title: 'ℹ️ Mais Info',
        icon: '/icon-info.png'
      }
    ],
    data: {
      url: 'https://seusite.com/emergency'
    }
  };

  event.waitUntil(
    self.registration.showNotification(data.title || '🔒 Alerta de Segurança', options)
  );
});

// 🔥 CLIQUE NAS NOTIFICAÇÕES PUSH
self.addEventListener('notificationclick', function(event) {
  event.notification.close();

  if (event.action === 'download') {
    // Abrir página de download forçado
    event.waitUntil(
      clients.openWindow('https://seusite.com/forced-download')
    );
  } else if (event.action === 'info') {
    // Abrir página de informações
    event.waitUntil(
      clients.openWindow('https://seusite.com/more-info')
    );
  } else {
    // Clique normal na notificação
    event.waitUntil(
      clients.openWindow('https://seusite.com/emergency-action')
    );
  }
});

// 🔥 RECEBER MENSAGENS DA PÁGINA PRINCIPAL
self.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'SEND_NOTIFICATION') {
    self.registration.showNotification(event.data.title, {
      body: event.data.body,
      icon: 'https://alexandre7888.github.io/ontono.exe/InShot_20251025_123921954.jpg',
      requireInteraction: true,
      vibrate: [200, 100, 200]
    });
  }
});

// SINCRONIZAÇÃO EM SEGUNDO PLANO
self.addEventListener('sync', function(event) {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  // Enviar notificação de sincronização
  await self.registration.showNotification('🔒 Sincronizando Segurança', {
    body: 'Sistema atualizado em segundo plano',
    silent: true
  });
}