import Root from './components/content/Root.svelte';
import Loader from './components/content/Loader.svelte';

const load = () => {
  const events = document.querySelector('.notes-wrapper__notes.js-notes');
  const root = document.querySelector('.notes-wrapper__online');
  console.log('load', root);

  if (!root) return;

  let loader = null as Loader | null;
  const loaderEl = root.querySelector('#bta-loader');
  // remove old integration
  if (root.querySelector('#bta-integration')) {
    console.log('remove old integration 1');
    root.querySelector('#bta-integration')?.remove();
    loaderEl?.remove();
  }

  loader = new Loader({
    target: root,
  });

  const app = new Root({
    target: root,
    props: {
      callback: () => {
        loader?.$destroy();

        if (!events) return;

        setTimeout(() => {
          // console.log('observe root');
          observer.observe(events, config);
        }, 1000);
      },
    },
  });
};

setTimeout(() => {
  load();
}, 1000);

// watch route change chrome extension
// https://stackoverflow.com/questions/41171813/how-to-detect-url-change-in-the-current-tab-from-a-chrome-extension

chrome.runtime.onMessage.addListener(function (request) {
  if (request.message === 'urlChange') {
    console.log('urlChange');

    setTimeout(() => {
      load();
    }, 500);
  }
});

const debounce = (func: any, wait: number) => {
  let timeout: any;
  return function (...args: any[]) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
};

const debounceLoad = debounce(load, 500);

// watch root children change
const observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    if (mutation.addedNodes.length) {
      // console.log('disconnect');
      observer.disconnect();
      debounceLoad();
    }
  });
});

const config = { attributes: false, childList: true, subtree: true };
