import {Component, STATE, ATTRIBUTE} from './framework.js';
import {enableGesture} from './gesture';
import {Timeline, Animation} from './animation';
import {ease} from './ease';

export {STATE, ATTRIBUTE} from './framework.js';

export class Carousel extends Component {
  constructor() {
    super();
  }

  render() {
    this.root = document.createElement('div');
    this.root.classList.add('carousel');
    for (let record of this[ATTRIBUTE].src) {
      let child = document.createElement('div');
      child.style.backgroundImage = `url('${record.img}')`;
      this.root.appendChild(child);
    }

    enableGesture(this.root);
    const timeline = new Timeline; // 用来播放动画
    timeline.start();

    let handler = null; // 定时三秒一帧

    let children = this.root.children;

    this[STATE].position = 0; // 当前滚动到的位置，代表组件当前的状态

    let t = 0;
    let ax = 0;

    this.root.addEventListener('start', (event) => {
      timeline.pause();
      clearInterval(handler);
      let progress = (Date.now() - t) / 500; // 动画的进度
      ax = ease(progress) * 500 - 500;
    });

    this.root.addEventListener('tap', (event) => {
      this.triggerEvent('click', {
        position: this[STATE].position,
        data: this[ATTRIBUTE].src[this[STATE].position]
      });
    });

    this.root.addEventListener('pan', (event) => {
      let x = event.clientX - event.startX - ax;

      let current = this[STATE].position - ((x - x % 500) / 500);

      for (let offset of [-1, 0, 1]) {
        let pos = current + offset;
        pos = (pos % children.length + children.length) % children.length;

        children[pos].style.transition = 'none';
        children[pos].style.transform = `translateX(${- pos * 500 + offset * 500 + x % 500}px)`;
      }
    });

    this.root.addEventListener('end', (event) => {
      timeline.reset();
      timeline.start();
      handler = setInterval(nextPicture, 3E3);

      let x = event.clientX - event.startX - ax;
      let current = this[STATE].position - ((x - x % 500) / 500);

      let direction = Math.round((x % 500) / 500);

      if (event.isFlick) {
        if (event.velocity > 0) {
          direction = Math.ceil((x % 500) / 500);
        } else {
          direction = Math.floor((x % 500) / 500);
        }
      }

      for (let offset of [-1, 0, 1]) {
        let pos = current + offset;
        pos = (pos % children.length + children.length) % children.length;

        children[pos].style.transition = 'none';
        timeline.add(new Animation(children[pos].style, 'transform', 
          -pos * 500 + offset * 500 + x % 500, 
          -pos * 500 + offset * 500 + direction * 500, 
          500, 0, ease, v => `translateX(${v}px)`));
      }

      this[STATE].position = this[STATE].position - ((x - x % 500) / 500) - direction;
      this[STATE].position = (this[STATE].position % children.length + children.length) % children.length;
      this.triggerEvent('change', {position: this[STATE].position});
    });

    let nextPicture = () => {
      let children = this.root.children;
      let nextPosition = (this[STATE].position + 1) % children.length;

      let current = children[this[STATE].position];
      let next = children[nextPosition];

      t = Date.now(); // 动画开始的时间

      timeline.add(new Animation(current.style, 'transform',
        - this[STATE].position * 500, -500 - this[STATE].position * 500, 500, 0, ease, v => `translateX(${v}px)`));
      timeline.add(new Animation(next.style, 'transform',
        500 - nextPosition * 500, - nextPosition * 500, 500, 0, ease, v => `translateX(${v}px)`));

        this[STATE].position = nextPosition;
        this.triggerEvent('change', {position: this[STATE].position});
    };

    handler = setInterval(nextPicture, 3E3);

    return this.root;
  }
}