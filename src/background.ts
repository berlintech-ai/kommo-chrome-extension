console.log('background script');

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete') {
    chrome.tabs.sendMessage(tabId, {
      message: 'urlChange',
      url: changeInfo.url,
    });
  }
});
