export default class Layer {
  constructor(name, canvasManager, zIndex) {
    this.name = name;
    this.manager = canvasManager;
    this.zIndex = zIndex + 100;
    this.canvas = this.manager.canvas;
  }

  copy() {
    return new Layer(this.name + ' Copy', this.manager.copy(), this.zIndex + 1);
  }
  oldnamecopy() {
    return new Layer(this.name, this.manager.copy(), this.zIndex + 1);
  }

  html() {
    return `<button class='btn btn-secondary'>${this.name}</button>`;
  }
}
