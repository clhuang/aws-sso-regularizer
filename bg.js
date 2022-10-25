function buildUrl(domain, path) {
  if (domain.substr(0, 1) === '.') domain = domain.substring(1);

  return 'https://' + domain + path;
}

async function clearSsoExpiringCookies() {
  const cookies = await chrome.cookies.getAll({
    domain: 'scale-ai.awsapps.com',
    session: false,
  });
  const expiryThreshold = Date.now() / 1000 + 12 * 3600;
  console.log('HIII', cookies);

  for (const cookie of cookies) {
    if (cookie.expirationDate < expiryThreshold) {
      //await chrome.cookies.remove({
      console.log('DELETE', {
        name: cookie.name,
        url: buildUrl(cookie.domain, cookie.path),
      });
    }
  }
}

chrome.runtime.onMessage.addListener((msg) => {
  console.log('HIII', msg);
  if (msg.action === 'clear_sso_expiring_cookies') clearSsoExpiringCookies();
});
