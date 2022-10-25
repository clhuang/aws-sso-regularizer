console.log(
  'QQQ',
  chrome.runtime.sendMessage(undefined, {
    action: 'clear_sso_expiring_cookies',
  }),
);
