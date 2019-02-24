export default (url) => new Promise(resolve => {
  const script = document.createElement('script');
  script.setAttribute('async', '');
  script.setAttribute('src', url);
  script.onload = resolve;
  document.head.appendChild(script);
});