import sleep from './sleep.js';

const reeOverlay = document.createElement('div');
reeOverlay.id = 'ree-overlay';
document.body.appendChild(reeOverlay);

let reeCount = 0;

export default async ({ duration = 1500, heavyness = 10, playAudio = true, rage = true } = {}) => {
  reeCount++;
  const getDelta = () => (-(heavyness / 2) + (Math.random() * heavyness)).toFixed(2);
  const interval = setInterval(() =>
    document.body.style.transform = `translate(${getDelta()}px, ${getDelta()}px)`
  );

  reeOverlay.style.transition = `opacity ${(duration / 1000).toFixed(1)}s`;

  setTimeout(() => {
    clearInterval(interval);
    if (--reeCount === 0) {
      document.body.style.transform = '';
      reeOverlay.className = '';
    }
  }, duration);

  if (rage) {
    reeOverlay.className = 'reeing';
  }

  if (playAudio) {
    const audio = new Audio('static/audio/reeee.mp3'); // this is reinstantiated on every call on purpose. browsers will cache this for us,
    audio.volume = 0.5;                           // us caching it manually will only cause issues with overlapping calls
    await audio.play();

    const steps = audio.volume / 0.001;
    const timePerStep = duration / steps;
    while (audio.volume > 0.001) {
      await sleep(timePerStep);
      audio.volume -= 0.001;
    }
    audio.volume = 0;
  }

  return interval;
};;