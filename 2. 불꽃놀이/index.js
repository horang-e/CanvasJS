// import Particle from './js/Particle.js';

// import {CanvasOption} from './js/CanvasOption';
class CanvasOption {
  constructor() {
    this.canvas = document.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.dpr = devicePixelRatio;
    this.fps = 60;
    this.interval = 1000 / this.fps;
    this.canvasWidth = innerWidth;
    this.canvasHeight = innerHeight;
  }
}

class Particle extends CanvasOption {
  constructor() {
    super();
    this.x = x;
    this.y = y;
  }
  update() {
    this.y += 1;
  }
  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.closePath();
  }
}

class Canvas extends CanvasOption {
  constructor() {
    //부모꺼가져옴
    super();
    this.particles = [];
  }
  init() {
    this.canvasWidth = innerWidth;
    this.canvasHeight = innerHeight;
    this.canvas.width = this.canvasWidth * this.dpr;
    this.canvas.height = this.canvasHeight * this.dpr;
    this.ctx.scale(this.dpr, this.dpr);

    this.canvas.style.width = this.canvasWidth + 'px';
    this.canvas.style.height = this.canvasHeight + 'px';
  }

  createParticles() {
    const PARTICLE_NUM = 1;
    for (let i = 0; i < PARTICLE_NUM; i++) {
      const x = 300;
      const y = 300;
      this.particles.push(new Particle(x, y));
    }
  }

  render() {
    let now, delta;
    let then = Date.now();

    const frame = () => {
      requestAnimationFrame(frame);
      now = Date.now();
      delta = now - then;
      if (delta < this.interval) return;

      // this.ctx.fillRect(100, 100, 200, 200);

      this.particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });
      then = now - (delta % this.interval);
    };
    requestAnimationFrame(frame);
  }
}

const canvas = new Canvas();

let canvasWidth, canvasHeight;

//animate 함수

window.addEventListener('load', () => {
  canvas.init();
  canvas.render();
});

window.addEventListener('resize', () => {
  canvas.init();
});
