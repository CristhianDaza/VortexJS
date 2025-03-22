import { ReactiveComponent } from './ReactiveComponent.js';
export class VortexJs extends ReactiveComponent {
  constructor(component) {
    super(component);
    this.updateCallback = this.update.bind(this);
  }
}
