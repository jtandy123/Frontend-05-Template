// listen => recognize => dispatch
// new Listener(new Recognizer(dispatch))

export class Listener {
  constructor(element, recognizer) {
    let isListeningMouse = false;
    let contexts = new Map();

    element.addEventListener('mousedown', e => {
      let context = Object.create(null);
      contexts.set(`mouse${1 << event.button}`, context);
    
      recognizer.start(e, context);
    
      let mousemove = event => {
        let button = 1;
    
        while(button <= event.buttons) {
          if (button & event.buttons) {
            // order of buttons & button property is not same
            let key;
            if (button === 2) {
              key = 4;
            } else if (button === 4) {
              key = 2;
            } else {
              key = button;
            }
            let ctx = contexts.get(`mouse${key}`);
            recognizer.move(event, ctx); 
          }
          button = button << 1;
        }
      };
    
      let mouseup = event => {
        let ctx = contexts.get(`mouse${1 << event.button}`);
        recognizer.end(event, ctx);
        contexts.delete(`mouse${1 << event.button}`);
    
        if (event.buttons === 0) {
          document.removeEventListener('mousemove', mousemove);
          document.removeEventListener('mouseup', mouseup);
          isListeningMouse = false;
        }
      };
    
      if (!isListeningMouse) {
        document.addEventListener('mousemove', mousemove);
        document.addEventListener('mouseup', mouseup);
        isListeningMouse = true;
      }
    });
    
    element.addEventListener('touchstart', event => { // event有多个触电
      for (let touch of event.changedTouches) {
        let context = Object.create(null);
        contexts.set(touch.identifier, context);
        recognizer.start(touch, context);
      }
    });
    
    element.addEventListener('touchmove', event => {
      for (let touch of event.changedTouches) {
        let context = contexts.get(touch.identifier);
        recognizer.move(touch, context);
      }
    });
    
    element.addEventListener('touchend', event => {
      for (let touch of event.changedTouches) {
        let context = contexts.get(touch.identifier);
        recognizer.end(touch, context);
        contexts.delete(touch.identifier);
      }
    });
    
    element.addEventListener('touchcancel', event => {
      for (let touch of event.changedTouches) {
        let context = contexts.get(touch.identifier);
        recognizer.cancel(touch, context);
        contexts.delete(touch.identifier);
      }
    });
  }
}

export class Recognizer {
  constructor(dispatcher) {
    this.dispatcher = dispatcher;
  }

  start(point, context) {
    // console.log('start', point.clientX, point.clientY);
    context.startX = point.clientX;
    context.startY = point.clientY;

    this.dispatcher.dispatch('start', {
      clientX: point.clientX,
      clientY: point.clientY
    });

    context.points = [{
      t: Date.now(),
      x: point.clientX,
      y: point.clientY
    }];
  
    context.isTap = true;
    context.isPan = false;
    context.isPress = false;
  
    context.handler = setTimeout(() => {
      context.isTap = false;
      context.isPan = false;
      context.isPress = true;
      context.handler = null;
      // console.log('pressstart');
      this.dispatcher.dispatch('press', {});
    }, 500);
  }

  move(point, context) {
    let dx = point.clientX - context.startX;
    let dy = point.clientY - context.startY;
    if (!context.isPan && dx ** 2 + dy ** 2 > 100) {
      context.isTap = false;
      context.isPan = true;
      context.isPress = false;
      context.isVertical = Math.abs(dx) < Math.abs(dy);
      // console.log('panstart');
      this.dispatcher.dispatch('panstart', {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        isVertical: context.isVertical
      });
      clearTimeout(context.handler);
    }
  
    if (context.isPan) {
      // console.log('pan');
      this.dispatcher.dispatch('pan', {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        isVertical: context.isVertical
      });
    }
  
    context.points = context.points.filter(p => Date.now() - p.t < 500);
  
    context.points.push({
      t: Date.now(),
      x: point.clientX,
      y: point.clientY
    });
  }

  end(point, context) {
    if (context.isTap) {
      // console.log('tap');
      this.dispatcher.dispatch('tap', {});
      clearTimeout(context.handler);
    }
    
    let d;
    let v;
    if (context.isPress) {
      // console.log('pressend');
      this.dispatcher.dispatch('pressend', {});
    }

    context.points = context.points.filter(p => Date.now() - point.t < 500);
    if (!context.points.length) {
      v = 0;
    } else {  
      d = Math.sqrt((point.clientX - context.points[0].x) ** 2 + (point.clientY - context.points[0].y) ** 2);
      v = d / (Date.now() - context.points[0].t);
    }
  
    if (v > 1.5) {
      // console.log('flick');
      context.isFlick = true;
      this.dispatcher.dispatch('flick', {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        isVertical: context.isVertical,
        isFlick: context.isFlick,
        velocity: v
      });
    } else {
      context.isFlick = false;
    }

    if (context.isPan) {
      // console.log('panend');
      this.dispatcher.dispatch('panend', {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        isVertical: context.isVertical,
        isFlick: context.isFlick,
        velocity: v
      });
    }
  }

  cancel(point, context) {
    clearTimeout(context.handler);
    // console.log('cancel', point.clientX, point.clientY);
    this.dispatcher.dispatch('cancel', {}); // 一般cancel的是pan或者press这种持续性的事件
  }
}

export class Dispatcher {
  constructor(element) {
    this.element = element;
  }

  dispatch(type, properties) {
    let event = new Event(type);
    for (let name in properties) {
      event[name] = properties[name];
    }
    this.element.dispatchEvent(event);
  }
}

export function enableGesture(element) {
  new Listener(element, new Recognizer(new Dispatcher(element)));
}
