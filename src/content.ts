import Root from "./components/content/Root.svelte";

const load = () => {
  const root = document.querySelector(".notes-wrapper__notes.js-notes");
  if (!root) return;
  if (root.querySelector("#bta-inegration")) return;

  new Root({
    target: root,
  });
};

setTimeout(() => {
  load();
}, 1000);

// watch route change chrome extension
// https://stackoverflow.com/questions/41171813/how-to-detect-url-change-in-the-current-tab-from-a-chrome-extension

chrome.runtime.onMessage.addListener(function (request) {
  if (request.message === "urlChange") {
    console.log("urlChange");
    load();
  }
});
