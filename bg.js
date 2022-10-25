function buildUrl(domain, path) {
  if (domain.substr(0, 1) === '.') domain = domain.substring(1);

  return 'https://' + domain + path;
}

async function clearSsoExpiringCookies() {
  const { expiry, ssoDomain } = await chrome.storage.sync.get({
    expiry: 8,
    ssoDomain: '',
  });
  const EXPIRE_AFTER = expiry * 3600;
  const cookies = await chrome.cookies.getAll({
    domain: `${ssoDomain}.awsapps.com`,
    session: false,
  });
  const expiryThreshold = Date.now() / 1000 + EXPIRE_AFTER;

  for (const cookie of cookies) {
    if (cookie.expirationDate < expiryThreshold) {
      await chrome.cookies.remove({
        name: cookie.name,
        url: buildUrl(cookie.domain, cookie.path),
      });
    }
  }
}

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === 'clear_sso_expiring_cookies') clearSsoExpiringCookies();
});
