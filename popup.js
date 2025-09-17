document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.getElementById('toggle');

  chrome.storage.local.get(['extensionEnabled'], function(result) {
    const isEnabled = result.extensionEnabled !== false;
    updateToggleState(isEnabled);
  });

  toggle.addEventListener('click', function() {
    chrome.storage.local.get(['extensionEnabled'], function(result) {
      const currentState = result.extensionEnabled !== false;
      const newState = !currentState;

      chrome.storage.local.set({ extensionEnabled: newState }, function() {
        updateToggleState(newState);
      });
    });
  });

  function updateToggleState(isEnabled) {
    if (isEnabled) {
      toggle.classList.add('enabled');
    } else {
      toggle.classList.remove('enabled');
    }
  }
});