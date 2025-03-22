import { subscribe, unsubscribe, createLocalState, createState } from './StateManager.js';

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
    this.componentDidMount();
    this.update();
  }
  
  update() {
    if (this.#container) {
      if (this.#container.innerHTML === this.render()) {
        return;
      }
      this.#container.innerHTML = this.render();
      this.addEvent();
      this.componentDidUpdate();
    }
  }
  
  on(prop, callback, isLocal = false) {
    if (!this.#subscriptions.has(prop)) {
      this.#subscriptions.set(prop, []);
    }
    const callbacks = this.#subscriptions.get(prop);
    if (!callbacks.includes(callback)) {
      callbacks.push(callback);
      subscribe(prop, callback, isLocal);
    }
  }

  
  off(prop, callback, isLocal = false) {
    if (this.#subscriptions.has(prop)) {
      const callbacks = this.#subscriptions.get(prop);
      const index = callbacks.indexOf(callback);
      if (index !== -1) {
        callbacks.splice(index, 1);
        unsubscribe(prop, callback, isLocal);
      }
    }
  }
  
  getElement(selector) {
    return this.#container ? this.#container.querySelector(selector) : null;
  }
  
  setState(newState) {
    for (const key in newState) {
      this.#state[key] = newState[key];
    }
    this.update();
  }
  
  setGlobalState(newState) {
    for (const key in newState) {
      createState[key] = newState[key];
    }
    this.update();
  }
  
  getState(key) {
    return this.#state[key];
  }
  
  getStates() {
    return this.#state;
  }
  
  getGlobalState(key) {
    return createState[key];
  }
  
  getGlobalStates() {
    return { ...createState };
  }
  
  render() {
    throw new Error('Render method must be implemented in the child class');
  }
  
  unmount() {
    this.componentWillUnmount();
    this.#container.innerHTML = '';
    this.#subscriptions.forEach((callbacks, prop) => {
      callbacks.forEach(callback => unsubscribe(prop, callback, true));
    });
    this.#subscriptions.clear();
  }
  
  addEvent() {}
  componentDidMount() {}
  componentDidUpdate() {}
  componentWillUnmount() {}
}
