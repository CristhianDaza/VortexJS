import { VortexJs } from '../src';

class App extends VortexJs {
  constructor() {
    super({});
    this.setState({ theme: 'dark', pageName: 'Home' });
  }
  
  addEvent() {
    document.querySelector('#toggleTheme').addEventListener('click', () => {
      this.setState({
        theme: this.getState('theme') === 'dark' ? 'light' : 'dark'
      });
    });
    
    document.querySelector('#nameApp').addEventListener('click', () => {
      this.setState({
        pageName: this.getState('pageName') === 'Home' ? 'VortexJS' : 'Home'
      });
    });
  }
  
  render() {
    const theme = this.getState('theme');
    const pageName = this.getState('pageName');
    const style = `
      padding: 20px;
      background-color: ${theme === 'dark' ? '#333' : '#FFF'};
      color: ${theme === 'dark' ? '#FFF' : '#000'};
    `;
    return `
       <div style="${style}">
        <h1>Welcome to ${pageName}</h1>
        <p>Theme: ${theme}</p>
        <button id="toggleTheme">Toggle Theme</button>
        <button id="nameApp">Show name App</button>
      </div>
    `;
  }
}

const app = new App();
const VortexJS = document.querySelector('#app');;
app.mount(VortexJS);

// dismount
const time = 10000000;
setTimeout(() => {
  app.unmount();
}, time);
