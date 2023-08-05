const getRandomNumber = (N) => {
  return Math.floor(Math.random() * (N + 1));
}

chrome.webNavigation.onBeforeNavigate.addListener(function (details) {
    let blockedDomains = JSON.parse(localStorage.getItem('selectedUrls') || '[]') 
    let redirectUrlList = JSON.parse(localStorage.getItem('redirects') || '[]')
    let redirectUrl = redirectUrlList[getRandomNumber(redirectUrlList.length)]; 

    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){   
      let domain = tabs[0].url;
      blockedDomains.forEach((element) => {
        if(domain.includes(element)) {
          chrome.tabs.update(details.tabId, { url: redirectUrl });
        }
    });
  });
});


