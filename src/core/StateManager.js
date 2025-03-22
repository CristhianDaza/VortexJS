const globalState = {};
const subscribers = new Map();

const localState = new WeakMap();
const subscribersLocalState = new Map();

export const createState = new Proxy(globalState, {
  get(target, props) {
    return Reflect.get(target, props);
  },
  set(target, props, value) {
    const success = Reflect.set(target, props, value);
    if (success) _notify(props);
    return success;
  }
});


export const createLocalState = (component) => {
  const state = new Proxy({}, {
    get(target, props) {
      return Reflect.get(target, props);
    },
    set(target, props, value) {
      const success = Reflect.set(target, props, value);
      if (success) _notify(props, true);
      return success;
    }
  });
  
  localState.set(component, state);
  return state;
}

export const subscribe = (prop, callback, isLocal = false) => {
  const target = isLocal ? subscribersLocalState : subscribers;
  if (!target.has(prop)) {
    target.set(prop, []);
  }
  const listeners = target.get(prop);
  if (!listeners.includes(callback)) listeners.push(callback);
}

export const unsubscribe = (prop, callback, isLocal = false) => {
  const target = isLocal ? subscribersLocalState : subscribers;
  if (target.has(prop)) {
    const index = target.get(prop).indexOf(callback);
    if (index !== -1) {
      target.get(prop).splice(index, 1);
    }
  }
}

const _notify = (prop, isLocal = false) => {
  const target = isLocal ? subscribersLocalState : subscribers;
  if (target.has(prop)) {
    target.get(prop).forEach(callback => {
      if (typeof callback === 'function') callback();
    });
  }
}
