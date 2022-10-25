// Saves options to chrome.storage
async function saveOptions() {
  const expiry = document.getElementById('expiry').value;
  const ssoDomain = document.getElementById('sso-domain').value;
  await chrome.storage.sync.set({
    expiry: +expiry,
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
  const { ssoDomain, expiry } = await chrome.storage.sync.get({
    expiry: 8,
    ssoDomain: '',
  });
  document.getElementById('sso-domain').value = ssoDomain;
  document.getElementById('expiry').value = expiry.toString();
}
document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
