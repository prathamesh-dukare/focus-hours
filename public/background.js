const getRandomNumber = (N) => {
    return Math.floor(Math.random() * (N + 1));
  }

chrome.webNavigation.onBeforeNavigate.addListener(function (details) {
    var blockedDomains = JSON.parse(localStorage.getItem('selectedUrls') || '[]') // Replace with the domains you want to redirect
    var redirectUrlList = JSON.parse(localStorage.getItem('redirects') || '[]')
    var redirectUrl = redirectUrlList[getRandomNumber(redirectUrlList.length)]; // Replace with your desired redirect URL
    console.log(redirectUrl);
    var url = new URL(details.url);
    var domain = url.replace(/.+\/\/|www.|\..+/g, '')
    console.log(url, domain);
    if (blockedDomains.includes(domain)) {
      chrome.tabs.update(details.tabId, { url: redirectUrl });
    }
  });