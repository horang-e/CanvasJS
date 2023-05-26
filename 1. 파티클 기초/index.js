/**
 * 기본세팅
 */
const canvas = document.querySelector('canvas');

//캔버스에 그림그리는 도구
const ctx = canvas.getContext('2d');
const dpr = window.devicePixelRatio;
console.log(window.devicePixelRatio);

const canvasWidth = innerWidth;
const canvasHeight = innerHeight;

//아래 두개처럼만 하면 캔버스 잡아 늘리는거
canvas.style.width = canvasWidth + 'px';
canvas.style.height = canvasHeight + 'px';
//아래 두개까지 적용시키면 사이즈 적용됨
canvas.width = canvasWidth;
canvas.height = canvasHeight;

//dpr=2 -> 1px 2*2개
ctx.scale(dpr, dpr);
const feGaussianBlur = document.querySelector('feGaussianBlur');
const feColorMatrix = document.querySelector('feColorMatrix');

const controls = new function () {
  this.blurValue = 40;
  this.alphaChannel = 100;
  this.alphaOffset = -23;
};

let gui = new dat.GUI();

gui.add(controls, 'blurValue', 0, 100).onchange((v) => {
  feGaussianBlur.setAttribute('stdDeviation', value);
});

gui.add(controls, 'alphaChannel', 1, 200).onchange((v) => {
  feColorMatrix.setAttribute('values', `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${value} 0`);
});
gui.add(controls, 'alphaOffset')
/**
 * 기본세팅 끝
 */

/**
 * 파티클세팅
 */
class Particle {
  constructor(x, y, radius, vy, acc) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.vy = vy;
    this.acc = 1.01;
  }
  update() {
    this.vy *= this.acc;
    this.y += this.vy;
  }
  draw() {
    //원을 그리자
    //나 길그린다
    ctx.beginPath();
    //각도가 라디안으로 되어있음
    ctx.arc(this.x, this.y, this.radius, 0, (Math.PI / 180) * 360);
    ctx.fillStyle = 'rgb(97, 21, 21)';
    ctx.fill();
    // ctx.stroke()
    //나 길 끝났다
    ctx.closePath();
  }
}

const x = 100;
const y = 100;
const radius = 50;
const particle = new Particle(x, y, radius);

const TOTAL = 20;
const randomNumBtw = (min, max) => {
  return Math.random() * (max - min + 1) + min;
};

let particles = [];

for (let i = 0; i < TOTAL; i++) {
  const x = randomNumBtw(0, canvasWidth);
  const y = randomNumBtw(0, canvasHeight);
  const radius = randomNumBtw(20, 70);
  //떨어지는 속도 랜덤
  const vy = randomNumBtw(1, 5);
  const particle = new Particle(x, y, radius, vy);
  particles.push(particle);
}

//FPS설정 60FPS
let interval = 1000 / 60;
let now, delta;
let then = Date.now();

//재생 함수 생성
function animate() {
  window.requestAnimationFrame(animate);
  now = Date.now();
  delta = now - then;
  if (delta < interval) return;
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  //x를 1px 이동시키기
  //모니터주사율마다 다르게보일수있음
  //FPS => 내가 원하는 초당 프레임 실행시간
  //내가 원하는 화면으로 보여주기 위해서는 복잡한 식을 실행하면됨
  //fps 높을수록 부드럽게보임

  particles.forEach((particle) => {
    particle.update();
    particle.draw();

    if (particle.y - particle.radius > canvasHeight) {
      //공이 사라지느 시점에 다시 돌아가게
      particle.y = -particle.radius;
      particle.x = randomNumBtw(0, canvasWidth);
      particle.radius = randomNumBtw(20, 70);
      particle.vy = randomNumBtw(1, 5);
      //속도 랜덤
    }
  });

  then = now - (delta % interval);
}

animate();
