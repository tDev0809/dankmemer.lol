export default (id, opts, device) => {
  if (device === 'desktop') opts.mediaQuery = '(min-width: 1025px)';
  else if (device === 'mobile') opts.mediaQuery = '(min-width: 768px) and (max-width: 1024px), (min-width: 320px) and (max-width: 767px)';

  window.nitroAds && window.nitroAds.createAd(id, {
    "refreshLimit": 10,
    "refreshTime": 30,
    "renderVisibleOnly": false,
    "refreshVisibleOnly": true,
    "report": {
      "enabled": true,
      "wording": "Report Ad",
      "position": "top-right"
    },
    "demo": !LIVE_ADS,
    ...opts
  });
}
