console.log('background script');
chrome.tabs.onUpdated.addListener(function (s, e, t) {
  e.status === 'complete' &&
    chrome.tabs.sendMessage(s, { message: 'urlChange', url: e.url });
});
