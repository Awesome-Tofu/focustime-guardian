chrome.webNavigation.onHistoryStateUpdated.addListener(function (details) {
  chrome.storage.sync.get(
    ["instagramSwitch", "ytShortsSwitch"],
    function (result) {
      const isInstagramChecked = result.instagramSwitch ?? false;
      const isYtShortsChecked = result.ytShortsSwitch ?? false;
      const url = details.url;

      // Function to hide elements
      const hideElement = (selector, logMessage) => {
        const element = document.querySelector(selector);
        if (element) element.style.display = "none";
        else console.log(logMessage);
      };

      // Instagram
      if (isInstagramChecked && url.includes("insta")) {
        chrome.scripting.executeScript({
          target: { tabId: details.tabId },
          function: () => {
            const reelsIcon = document.querySelector('svg[aria-label="Reels"]');
            if (reelsIcon) {
              let parentEl = reelsIcon;
              for (let i = 0; i < 7 && parentEl; i++) {
                parentEl = parentEl.parentElement;
              }
              if (parentEl) parentEl.style.display = "none";
              else console.log("Parent element not found");
            }
          },
        });

        if (url.includes("reels")) {
          chrome.scripting.executeScript({
            target: { tabId: details.tabId },
            function: () => window.history.go(-1),
          }).then(() => console.log("Injected a function"));
          return;
        }
      }

      // YouTube Shorts
      if (isYtShortsChecked && url.includes("y") && url.includes("tube")) {
        chrome.scripting.executeScript({
          target: { tabId: details.tabId },
          function: () => {
            hideElement('#endpoint[title="Shorts"]', "Shorts link not found");
          },
        });

        if (url.includes("shorts")) {
          chrome.scripting.executeScript({
            target: { tabId: details.tabId },
            function: () => window.history.go(-1),
          }).then(() => console.log("Injected a function"));
        }
      }
    }
  );
}, { url: [{ urlMatches: ".*" }] });
