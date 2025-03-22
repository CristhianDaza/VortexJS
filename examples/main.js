import { VortexJs } from '../src';

class App extends VortexJs {
  constructor() {
    super({});
    this.setState({ theme: 'dark', pageName: 'Home' });
    this.setGlobalState({ nameApp: 'VortexJS', theme: 'light' });
  }
  
  addEvent() {
    document.querySelector('#toggleTheme').addEventListener('click', () => {
      this.setState({
        theme: this.getState('theme') === 'dark' ? 'light' : 'dark'
      });
    });
    
    document.querySelector('#nameAppButton').addEventListener('click', () => {
      this.setGlobalState({
        nameApp: this.getGlobalState('nameApp') === 'Home' ? 'VortexJS' : 'Home'
      });
    });
  }
  
  componentDidMount() {
    console.log('states: ', this.getStates());
    console.log('Global states: ', this.getGlobalStates());
  }
  
  componentDidUpdate() {
    console.log('Component did update');
  }
  
  componentWillUnmount() {
    console.log('Component will unmount');
  }
  
  render() {
    const theme = this.getState('theme');
    const nameApp = this.getGlobalState('nameApp');
    const style = `
      padding: 20px;
      background-color: ${theme === 'dark' ? '#333' : '#FFF'};
      color: ${theme === 'dark' ? '#FFF' : '#000'};
    `;
    return `
       <div style="${style}">
        <h1>Welcome to ${nameApp}</h1>
        <p>Theme: ${theme}</p>
        <button id="toggleTheme">Toggle Theme</button>
        <button id="nameAppButton">Show name App</button>
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
