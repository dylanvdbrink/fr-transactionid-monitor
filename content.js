let transactionDisplay = null;
let currentTransactionId = null;

function createTransactionDisplay() {
  const container = document.createElement('div');
  container.id = 'fr-transaction-display';
  container.style.cssText = `
    position: fixed;
    bottom: 10px;
    right: 10px;
    background-color: black;
    color: white;
    padding: 8px 12px;
    border-radius: 4px;
    font-family: monospace;
    font-size: 12px;
    z-index: 999999;
    box-shadow: 0 2px 10px rgba(0,0,0,0.3);
    pointer-events: auto;
    opacity: 0;
    transition: opacity 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;
  `;

  const textSpan = document.createElement('span');
  textSpan.id = 'fr-transaction-text';

  const copyButton = document.createElement('button');
  copyButton.style.cssText = `
    background: transparent;
    color: white;
    width: 16px;
    height: 16px;
    border-radius: 2px;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    position: relative;
  `;

  copyButton.innerHTML = `
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" stroke-width="4" stroke="#ffffff" fill="none"><rect x="11.13" y="17.72" width="33.92" height="36.85" rx="2.5"/><path d="M19.35,14.23V13.09a3.51,3.51,0,0,1,3.33-3.66H49.54a3.51,3.51,0,0,1,3.33,3.66V42.62a3.51,3.51,0,0,1-3.33,3.66H48.39"/></svg>
  `;

  copyButton.addEventListener('click', async () => {
    if (currentTransactionId) {
      try {
        await navigator.clipboard.writeText(currentTransactionId);
      } catch (err) {
        console.error('Failed to copy transaction ID:', err);
      }
    }
  });

  container.appendChild(textSpan);
  container.appendChild(copyButton);
  document.body.appendChild(container);
  return container;
}

function showTransactionId(transactionId) {
  if (!transactionDisplay) {
    transactionDisplay = createTransactionDisplay();
  }

  currentTransactionId = transactionId;
  const textSpan = transactionDisplay.querySelector('#fr-transaction-text');
  textSpan.textContent = `Transaction ID: ${transactionId}`;
  transactionDisplay.style.opacity = '1';
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'SHOW_TRANSACTION_ID') {
    showTransactionId(message.transactionId);
  }
});