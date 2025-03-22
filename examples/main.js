import {
  createLocalState,
  createState,
  subscribe,
  unsubscribe,
} from '../src/core/StateManager.js'

// TEST 1: Global State
console.log("=== Test 1: Global State ===");

subscribe('name', () => {
  console.log(`The name is ${createState.name}`);
});

createState.name = 'VortexJS';
createState.name = 'VortexJS Final Subscribe';

// TEST 2: Local State
console.log("=== Test 2: Local State ===");

const myComponent = {};
const componentState = createLocalState(myComponent);

subscribe('appName', () => {
  console.log(`The app name is ${componentState.appName}`);
}, true);

componentState.appName = 'VortexJS';
componentState.appName = 'VortexJS Final Subscribe';

// TEST 3: Unsubscribe
console.log("=== Test 3: Unsubscribe ===");

const changeName = () => {
  console.log('The name has changed');
}

subscribe('otherName', changeName);
createState.otherName = 'VortexJS';

unsubscribe('otherName', changeName);
createState.otherName = 'VortexJS Final';

// TEST 4: Multiple Local State
console.log("=== Test 4: Multiple Local State ===");

const myOtherComponent = {};
const otherComponentState = createLocalState(myOtherComponent);

subscribe('theme', () => {
  console.log(`The theme is ${otherComponentState.theme}`);
}, true);

subscribe('user', () => {
  console.log(`The user is ${otherComponentState.user}`);
}, true);

otherComponentState.theme = 'dark';
otherComponentState.user = 'admin';
