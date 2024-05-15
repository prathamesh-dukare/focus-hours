const getRandomNumber = (N) => {
  return Math.floor(Math.random() * N);
};

console.log("Background script running");

chrome.webNavigation.onBeforeNavigate.addListener(function (details) {
  console.log("onBeforeNavigate", details);

  chrome.storage.sync.get(
    ["blockedUrls", "redirects", "localUrls"],
    (result) => {
      console.log({
        result,
      });

      const { blockedUrls, redirects, localUrls } = result;
      const redirectUrl = redirects[getRandomNumber(redirects.length)];

      const url = new URL(details.url);
      const domain = url.hostname;
      blockedUrls.forEach((element) => {
        if (domain.includes(element)) {
          console.log("Blocked site", domain);
          chrome.tabs.update(details.tabId, { url: redirectUrl });
        }
      });
    }
  );
});
