export default (time) => {
  time = time / 1000;
  return {
    hours: Math.floor(time / 3600),
    minutes: Math.floor((time % 3600) / 60),
    seconds: Math.floor(time % 3600 % 60),
    get human () {
      return `${this.hours} hours, ${this.minutes} minutes and ${this.seconds} seconds`;
    }
  };
};
