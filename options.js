// Saves options to chrome.storage
async function saveOptions() {
  const expiry = document.getElementById('expiry').value;
  const ssoDomain = document.getElementById('sso-domain').value;
  await chrome.storage.sync.set({
    expiryNew: +expiry,
    ssoDomain,
  });
  // Update status to let user know options were saved.
  const status = document.getElementById('status');
  status.textContent = 'Options saved.';
  setTimeout(function () {
    status.textContent = '';
  }, 750);
}

async function restoreOptions() {
  const { ssoDomain, expiryNew } = await chrome.storage.sync.get({
    expiryNew: 84,
    ssoDomain: '',
  });
  document.getElementById('sso-domain').value = ssoDomain;
  document.getElementById('expiry').value = expiryNew.toString();
}
document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
