import Listener from './Listener.js';

export default class SpriteTouchListener extends Listener {
  constructor(sprite, recogonizers, useCapture = false) {
    super(recogonizers);
    const start = (event) => {
      const pointer = {};
      pointer.x = event.x;
      pointer.y = event.y;
      pointer.startX = event.x;
      pointer.startY = event.y;
      pointer.originalEvent = event;
      pointer.identifier = event.identifier;
      this.pointers.set(event.identifier, pointer);
      for(const recogonizer of recogonizers) { // eslint-disable-line no-restricted-syntax
        recogonizer.start(pointer, this.pointers);
      }
    };
    const move = (event) => {
      const pointer = this.pointers.get(event.identifier);
      if(!pointer) return;
      pointer.x = event.x;
      pointer.y = event.y;
      pointer.originalEvent = event;
      pointer.identifier = event.identifier;
      for(const recogonizer of recogonizers) { // eslint-disable-line no-restricted-syntax
        recogonizer.move(pointer, this.pointers);
      }
    };
    const end = (event) => {
      const pointer = this.pointers.get(event.identifier);
      if(!pointer) return;
      pointer.x = event.x;
      pointer.y = event.y;
      pointer.originalEvent = event;
      pointer.identifier = event.identifier;
      this.pointers.delete(event.identifier, pointer);
      for(const recogonizer of recogonizers) { // eslint-disable-line no-restricted-syntax
        recogonizer.end(pointer, this.pointers);
      }
    };
    const cancel = (event) => {
      // console.log(event);
      const pointer = this.pointers.get(event.identifier);
      if(!pointer) return;
      pointer.x = event.x;
      pointer.y = event.y;
      pointer.originalEvent = event;
      pointer.identifier = event.identifier;
      this.pointers.delete(event.identifier, pointer);
      for(const recogonizer of recogonizers) { // eslint-disable-line no-restricted-syntax
        recogonizer.cancel(pointer, this.pointers);
      }
    };
    sprite.addEventListener('touchstart', start, useCapture);
    sprite.addEventListener('touchmove', move, useCapture);
    sprite.addEventListener('touchend', end, useCapture);
    sprite.addEventListener('touchcancel', cancel, useCapture);
    sprite.__gestureHandlers = {start, move, end, cancel};
  }
}