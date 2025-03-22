import { VortexJs } from '../src';

class App extends VortexJs {
  constructor() {
    super({});
    this.setState({ theme: 'dark', pageName: 'Home' });
    this.setGlobalState({ nameApp: 'VortexJS', theme: 'light', counter: 0, isListening: true });
    this.on('counter')
  }
  
  addEvent() {
    const toggleButton = this.getElement('#toggleTheme');
    const nameAppButton = this.getElement('#nameAppButton');
    const incrementButton = this.getElement('#incrementCounter');
    const toggleCounter = this.getElement('#toggleCounter');
    
    if (toggleButton) {
      toggleButton.addEventListener('click', () => {
        this.setState({
          theme: this.getState('theme') === 'dark' ? 'light' : 'dark'
        });
      });
    }
    
    if (nameAppButton) {
      nameAppButton.addEventListener('click', () => {
        this.setGlobalState({
          nameApp: this.getGlobalState('nameApp') === 'Home' ? 'VortexJS' : 'Home'
        });
      });
    }
    
    if (incrementButton) {
      incrementButton.addEventListener('click', () => {
        const currentCount = this.getGlobalState('counter');
        this.setGlobalState({ counter: currentCount + 1 });
      });
    }
    
    if (toggleCounter) {
      toggleCounter.addEventListener('click', () => {
        const isListening = this.getGlobalState('isListening');
        console.log('isListening', isListening);
        if (isListening) {
          this.off('counter');
          this.setGlobalState({ isListening: false });
        } else {
          this.on('counter');
          this.setGlobalState({ isListening: true });
        }
      });
    }
  }
  
  componentDidMount() {
    const isListening = this.getGlobalState('isListening');
    console.log('isListening', isListening);
  }
  
  componentDidUpdate() {}
  
  componentWillUnmount() {}
  
  render() {
    const theme = this.getState('theme');
    const nameApp = this.getGlobalState('nameApp');
    const counter = this.getGlobalState('counter');
    const isListening = this.getGlobalState('isListening');
    
    const style = `
      padding: 20px;
      background-color: ${theme === 'dark' ? '#333' : '#FFF'};
      color: ${theme === 'dark' ? '#FFF' : '#000'};
    `;
    return `
       <div style="${style}">
        <h1>Welcome to ${nameApp}</h1>
        <p>Theme: ${theme}</p>
        <p>Global Counter: ${counter}</p>
        <button id="toggleTheme">Toggle Theme</button>
        <button id="nameAppButton">Show name App</button>
        <button id="incrementCounter">Increment Counter</button>
        <button id="toggleCounter" data-listening=${isListening}>
          ${isListening ? 'Start Listening Counter' : 'Stop Listening Counter'}
        </button>
      </div>
    `;
  }
}

const app = new App();
const VortexJS = document.querySelector('#app');
app.mount(VortexJS);

// dismount
const time = 10000000;
setTimeout(() => {
  app.unmount();
}, time);
