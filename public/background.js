const getRandomNumber = (N) => {
    return Math.floor(Math.random() * (N + 1));
  }

chrome.webNavigation.onBeforeNavigate.addListener(function (details) {
    var blockedDomains = JSON.parse(localStorage.getItem('selectedUrls') || '[]') 
    var redirectUrlList = JSON.parse(localStorage.getItem('redirects') || '[]')
    var redirectUrl = redirectUrlList[getRandomNumber(redirectUrlList.length)]; 
    const url = new URL(details.url);
    var domain = url.hostname;

    blockedDomains.forEach((element) => {
      if(domain.includes(element)) {
        chrome.tabs.update(details.tabId, { url: redirectUrl });
      }
    })
  });

