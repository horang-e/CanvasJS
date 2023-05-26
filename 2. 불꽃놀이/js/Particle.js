import CanvasOption from './CanvasOption';

export default class Particle extends CanvasOption {
  constructor() {
    super();
    this.x = x;
    this.y = y;
  }
  update() {}
  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.closePath();
  }
}
