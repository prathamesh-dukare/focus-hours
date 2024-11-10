const getRandomNumber = (N) => {
  return Math.floor(Math.random() * N);
};

console.log("Background script running");

chrome.webNavigation.onBeforeNavigate.addListener(function (details) {
  console.log("onBeforeNavigate details", details);
  if (details.frameType !== "main_frame") {
    // Ignore sub-frame navigations (e.g., embedded iframes)
    return;
  }

  chrome.storage.sync.get(
    ["blockedUrls", "redirects", "localUrls", "isFocusModeOn"],
    (result) => {
      const { blockedUrls, redirects, localUrls } = result;
      const redirectUrl = redirects[getRandomNumber(redirects.length)];

      const url = new URL(details.url);
      const domain = url.hostname;

      chrome.storage.sync.get(["isFocusModeOn"], (result) => {
        if (blockedUrls.includes(domain) && result.isFocusModeOn) {
          console.log("Blocked site", domain);
          chrome.tabs.update(details.tabId, { url: redirectUrl });
        }
      });
    }
  );
});
