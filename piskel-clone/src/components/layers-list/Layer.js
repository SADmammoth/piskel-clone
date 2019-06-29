export default class Layer {
  constructor(name, canvasManager, zIndex) {
    this.name = name;
    this.manager = canvasManager;
    this.zIndex = zIndex;
    this.canvas = this.manager.canvas;
  }

  html() {
    return `<button class='btn btn-secondary'>${this.name}</button>`;
  }
}
