document.addEventListener("DOMContentLoaded", function () {
  const logger = document.getElementById("logger");

  // INSTAGRAM
  const instagramSwitch = document.getElementById("flexSwitchCheckInstagram");

  // Load saved state
  chrome.storage.sync.get(["instagramSwitch"], function (result) {
    instagramSwitch.checked = result.instagramSwitch ?? false;
  });

  // Save state on change
  instagramSwitch.addEventListener("change", function () {
    chrome.storage.sync.set({ instagramSwitch: this.checked });
  });

  //YT SHORTS
  const ytShortsSwitch = document.getElementById("ytShortsSwitch");

  // Load saved state
  chrome.storage.sync.get(["ytShortsSwitch"], function (result) {
    ytShortsSwitch.checked = result.ytShortsSwitch ?? false;
    // logger.innerHTML = `Youtube Switch: ${ytShortsSwitch.checked}`;
  });

  // Save state on change
  ytShortsSwitch.addEventListener("change", function () {
    chrome.storage.sync.set({ ytShortsSwitch: this.checked });
    // logger.innerHTML = `Youtube Switch: ${this.checked}`;
  });
});
