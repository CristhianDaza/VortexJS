import { subscribe, unsubscribe, createLocalState, createState } from './StateManager.js';

export class VortexJs {
  #state = null;
  #subscriptions = new Map();
  #container = null;
  
  constructor(component) {
    this.component = component;
    this.#state = createLocalState(this.component);
    this.updateCallback = this.update.bind(this);
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
  
  on(prop, isLocal = false) {
    if (!this.#subscriptions.has(prop)) {
      this.#subscriptions.set(prop, []);
    }
    const callbacks = this.#subscriptions.get(prop);
    if (!callbacks.includes(this.updateCallback)) {
      callbacks.push(this.updateCallback);
      subscribe(prop, this.updateCallback, isLocal);
    }
  }

  off(prop, isLocal = false) {
    if (this.#subscriptions.has(prop)) {
      const callbacks = this.#subscriptions.get(prop);
      const index = callbacks.indexOf(this.updateCallback);
      if (index !== -1) {
        console.log('off', index, prop, isLocal);
        callbacks.splice(index, 1);
        unsubscribe(prop, this.updateCallback, isLocal);
      }
    }
  }
  
  getElement(selector) {
    return this.#container ? this.#container.querySelector(selector) : null;
  }

  setGlobalState(newState) {
    for (const key in newState) {
      createState[key] = newState[key];
      if (!this.#subscriptions.has(key)) {
        this.on(key, false);
      }
    }
  }
  
  setState(newState) {
    for (const key in newState) {
      this.#state[key] = newState[key];
      if (!this.#subscriptions.has(key)) {
        this.on(key, true);
      }
    }
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
