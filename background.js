chrome.webRequest.onResponseStarted.addListener(
  (details) => {
    chrome.storage.local.get(['extensionEnabled'], (result) => {
      if (result.extensionEnabled === false) {
        return;
      }

      const url = new URL(details.url);
      if (!url.pathname.endsWith('/authenticate')) {
        return;
      }

      const transactionHeader = details.responseHeaders?.find(
        header => header.name.toLowerCase() === 'x-forgerock-transactionid'
      );

      if (transactionHeader && transactionHeader.value) {
        chrome.tabs.sendMessage(details.tabId, {
          type: 'SHOW_TRANSACTION_ID',
          transactionId: transactionHeader.value
        }).catch(() => {
          // Ignore errors if content script is not ready
        });
      }
    });
  },
  { urls: ["<all_urls>"] },
  ["responseHeaders"]
);

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ extensionEnabled: true });
});