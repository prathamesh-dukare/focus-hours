// const axios = require("axios");
// const cheerio = require("cheerio");

// todo : show favicon
async function getFavicon(url) {
  console.log(url, "url ca");
  try {
    const response = await fetch(url);
    const html = response.data;
    console.log(html, "html");
    return "xx";

    // const $ = cheerio.load(html);
    // console.log($, "cheerio");

    // const faviconLink =
    //   $('link[rel="icon"]').attr("href") ||
    //   $('link[rel="shortcut icon"]').attr("href");
    // if (faviconLink) {
    //   const faviconUrl = new URL(faviconLink, url).href;
    //   return faviconUrl;
    // } else {
    //   throw new Error("Favicon not found.");
    // }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

const isValidUrl = (url) => {
  const urlPattern =
    /^(https?|ftp):\/\/([a-zA-Z0-9_-]+\.)*[a-zA-Z0-9_-]+\.[a-zA-Z]{2,}(\/[^\s/$.?#].[^\s]*)*$/i;
  return urlPattern.test(url);
};

const urlFormatter = (url) => {
  let formattedUrl = url;
  if (!(url.startsWith("http://") || url.startsWith("https://"))) {
    formattedUrl = `https://${url}`;
  }
  if (!isValidUrl(formattedUrl)) {
    throw new Error("Invalid URL");
  }

  return formattedUrl;
};

export { urlFormatter, getFavicon };
