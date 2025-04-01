chrome.webRequest.onAuthRequired.addListener(
  (details, callback) => {
    // Get stored credentials for this domain
    const domain = new URL(details.url).hostname;
    chrome.storage.local.get([domain], (result) => {
      if (result[domain]) {
        // Return stored credentials
        callback({
          authCredentials: {
            username: result[domain].username,
            password: result[domain].password
          }
        });
      } else {
        // No credentials stored, let Chrome show the auth prompt
        callback({});
      }
    });
    return true; // This indicates we're handling the callback asynchronously
  },
  { urls: ["<all_urls>"] },
  ["asyncBlocking"]
);
