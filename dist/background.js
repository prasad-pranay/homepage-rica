chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "GET_HISTORY") {
    chrome.history.search(
      { text: msg.query || "", maxResults: 20 },
      (results) => {
        sendResponse(results);
      } 
    ); 
    return true; // IMPORTANT (async response)
  }
});
 