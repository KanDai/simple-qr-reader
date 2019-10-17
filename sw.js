importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

workbox.routing.registerRoute(
    '/',
    new workbox.strategies.NetworkFirst()
)

workbox.routing.registerRoute(
    new RegExp(/(.*\.js|.*\.css|.*\.jpg|.*\.png|.*\.ico)/),
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'assets',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 20
            }),
        ],
    })
)
