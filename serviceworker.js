self.addEventListener("install", (event) => {
  console.log("서비스 워커가 설치됨");
});

self.addEventListener("activate", (event) => {
  console.log("서비스 워커가 활성화됨");
});

self.addEventListener("fetch", (event) => {
  event.respondWith(fetch(event.request));
});
