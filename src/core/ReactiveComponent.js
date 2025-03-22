import { subscribe, unsubscribe, createLocalState } from './StateManager.js';

export class VortexJs {
  #state = null;
  #subscriptions = new Map();
  #container = null;
  
  constructor(component) {
    this.component = component;
    this.#state = createLocalState(this.component);
  }
  
  mount(container) {
    this.#container = container;
    this.update();
  }
  
  update() {
    if (this.#container) {
      this.#container.innerHTML = this.render();
      this.addEvent();
    }
  }
  
  addEvent() {}
  
  on(prop, callback) {
    if (!this.#subscriptions.has(prop)) {
      this.#subscriptions.set(prop, []);
    }
    const callbacks = this.#subscriptions.get(prop);
    if (!callbacks.includes(callback)) {
      callbacks.push(callback);
      subscribe(prop, callback, true);
    }
  }

  
  off(prop, callback) {
    if (this.#subscriptions.has(prop)) {
      const callbacks = this.#subscriptions.get(prop);
      const index = callbacks.indexOf(callback);
      if (index !== -1) {
        callbacks.splice(index, 1);
        unsubscribe(prop, callback, true);
      }
    }
  }
  
  setState(newState) {
    for (const key in newState) {
      this.#state[key] = newState[key];
    }
    this.update();
  }
  
  getState(key) {
    return this.#state[key];
  }
  
  render() {
    throw new Error('Render method must be implemented in the child class');
  }
  
  unmount() {
    this.#container.innerHTML = '';
    this.#subscriptions.forEach((callbacks, prop) => {
      callbacks.forEach(callback => unsubscribe(prop, callback, true));
    });
    this.#subscriptions.clear();
  }
}
