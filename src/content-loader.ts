(function () {
  const script = document.createElement('script');
  script.src =
    'https://raw.githubusercontent.com/berlintech-ai/kommo-chrome-extension/main/dist/assets/content.ts.js';
  script.onload = function () {
    console.log('Remote content script loaded successfully');
  };
  script.onerror = function () {
    console.error('Failed to load remote content script');
  };
  document.head.appendChild(script);
})();
