import Tool from '../tool.js';

export default class Pen extends Tool {
  constructor() {
    super('pen');
  }

  clickAction() {
    return true;
  }

  startAction(event) {
    let context = this.manager.canvas.getContext('2d');
    this.currentPath = new Path2D();
    this.widthMod = this.widthMod = window.globalState.brushWidth;
    this.paintColor = window.globalState.primaryColor;
    context.fillStyle = this.paintColor;
    context.beginPath();
    let paintPoint = this.paintPoint(event);
    paintPoint.paint(this.currentPath, this.widthMod * this.manager.unit_size, this.paintColor);
    this.prevX = paintPoint.center_pixel.d_x;
    this.prevY = paintPoint.center_pixel.d_y;
    context.fill(this.currentPath);
  }

  paintPoint(event) {
    return this.manager.getPointedUnit(event.pageX, event.pageY);
  }

  intimeActions(event) {
    let paintPoint = this.paintPoint(event);
    paintPoint.paint(this.currentPath, this.widthMod * this.manager.unit_size, this.paintColor);
    this.prevX = paintPoint.d_x;
    this.prevY = paintPoint.d_y;
  }

  stopAction() {
    let context = this.manager.canvas.getContext('2d');
    this.prevX = null; this.prevY = null;
    context.closePath();
  }

  activateTool(event) {
    return super.activateTool(event, this.startAction.bind(this));
  }

  toolAction(event) {
    super.toolAction(event, this.intimeActions.bind(this));
  }

  deactivateTool(event) {
    super.deactivateTool(event, this.stopAction.bind(this));
  }

  suspend() {
    this.paintColor = null;
    this.widthMod = null;
  }

  suspendTool(event) {
    super.suspendTool(event, this.suspend.bind(this));
  }
