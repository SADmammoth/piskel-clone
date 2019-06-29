import canvasManager from '../../screens/canvas/Tools/canvasManager.js'
import layersManager from './layersManager.js';
import Layer from './Layer.js';

export default class layersList {
  constructor(signal, base_layer) {
    this.updateView = signal;
    this.updateView = this.updateView.bind(this);
    if (base_layer) {
      this.base_layer = base_layer;
      this.layersManager = new layersManager(this);
      this.listObject = { 'Layer 1': base_layer };
      this.layersCount = 1;
      window.globalState.currentLayer = base_layer;
    }
    else {
      this.layersCount = 0;
      this.layersManager = new layersManager(this);
      this.listObject = {};
      $('.workflow').empty();
      this.createLayer('Layer 1');
    }
    this.layersManager.bind();
  }

  embed() {
    this.layersManager.delete();
    let html = this.layersManager.html();
    $('.layers-list').append(html);
    this.layersManager.rebind();
  }

  createLayer(name) {
    if (this.listObject[name] !== undefined) {
      throw new Error('Cannot create layer with name specified');
    }
    this.layersCount++;
    let canvas = $(window.globalState.canvasTemplate);
    canvas.css('zIndex', this.layersCount);
    $('.workflow').append(canvas);

    let manager = new canvasManager(window.globalState.unit_width, window.globalState.unit_height, canvas[0]);

    if (!name) {
      name = `Layer ${this.layersCount}`;
    }
    this.listObject[name] = new Layer(name, manager, this.layersCount);
    window.globalState.currentLayer = this.listObject[name];
    if (window.globalState.currentTool) {
      this.updateView();
    }
    this.lastLayer = this.listObject[name];
    this.embed();
  }

  editLayer(name) {
    if (!name || this.listObject[name] === undefined) {
      throw new Error('Cannot find layer with name specified');
    }
    window.globalState.currentLayer = this.listObject[name];
    if (window.globalState.currentTool) {
      this.updateView();
    }
    this.lastLayer = this.listObject[name];
    this.embed();
  }

  linkSignal(signal) {
    this.updateView = signal;
    this.updateView = this.updateView.bind(this);
  }

  layers() {
    return Object.keys(this.listObject).reduce((acc, x) => { acc.push(this.listObject[x]); return acc; }, []).reverse();
  }

  showCanvas() {
    $('.workflow').empty();
    Object.keys(this.listObject).forEach((x) => $('.workflow').append(this.listObject[x].canvas));
    this.embed();
  }

  preview(canvas) {
    Object.keys(this.listObject).reverse().forEach((x) => canvas[0].getContext('2d').drawImage(this.listObject[x].canvas, 0, 0));
    let html = canvas.wrap('<p></p>').parent().html();
    canvas.unwrap();
    return html;
  }

  redraw(canvas) {
    function getImageData(canvas) {
      return canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);
    }
    Object.keys(this.listObject).reverse().forEach((x) => canvas[0].getContext('2d').putImageData(getImageData(this.listObject[x].canvas), 0, 0));
    let html = canvas.wrap('<p></p>').parent().html();
    canvas.unwrap();
    return html;
  }
}
