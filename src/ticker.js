export default function Ticker(opts) {
  opts = {
    autoStart: true,
    delay: 2000,
    ...opts
  };

  let { autoStart, delay } = opts;

  let running = autoStart;
  let ticks = 0;

  let onEnd;

  this.running = () => running;

  this.value = (scale = 1) => ticks * scale;

  this.start = () => { running = true; };

  this.stop = () => {
    ticks = 0;
    running = false;
  };

  this.reset = () => {
    ticks = 0;
  };

  this.beginDelay = (_onEnd = () => {}) => {
    onEnd = _onEnd;
    this.reset();
    this.start();
  };

  this.update = delta => {
    if (running) {
      let dt = delta;
      ticks += dt;

      if (ticks >= delay) {
        if (onEnd) {
          onEnd();
          onEnd = undefined;
          this.stop();
        }
      }
    }
  };
}
