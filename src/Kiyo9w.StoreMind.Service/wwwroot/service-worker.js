"use strict";
const SHELL_CACHE = "storemind-shell-v3";
const SHELL_ASSETS = [
  "/",
  "/index.html",
  "/styles.css",
  "/app.js",
  "/manifest.webmanifest",
  "/assets/app-icon.svg",
  "/assets/icons.svg",
  "/assets/fixtures.svg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(SHELL_CACHE).then((cache) => cache.addAll(SHELL_ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== SHELL_CACHE).map((key) => caches.delete(key)))).then(() => self.clients.claim()));
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin || url.pathname.startsWith("/api/")) return;

  const fallbackKey = request.mode === "navigate" ? "/index.html" : request;
  event.respondWith(fetch(request).then((response) => {
    if (response.ok && SHELL_ASSETS.includes(url.pathname)) {
      caches.open(SHELL_CACHE).then((cache) => cache.put(fallbackKey, response.clone()));
    }
    return response;
  }).catch(() => caches.match(fallbackKey)));
});
