import locator from "./locator";

export default class toolbarManager {
  constructor(toolsObject) {
    this.toolsObject = toolsObject;
    window.globalState.currentTool = null;
    this.locator = new locator();
  }

  start(updateView, updatePreview) {
    $('.btn').mouseup(function () { this.blur() });
    $('.workflow').on('mousemove', this.locator.drawLocation.bind(this.locator));
    $('.workflow').on('mouseout', this.locator.noLocation.bind(this.locator));
    $('.toolbar').on('click', this.delegate.bind(this));
    this.signal = this.signal.bind(this);
    this.update = updateView;
    this.reload = updatePreview;
  }

  signal() {
    this.tool = window.globalState.currentTool;
    if (this.tool) {
      this.tool.invokeTool();
    }
    let canvas = window.globalState.currentLayer.canvas;
    $(canvas).off('click');
    $(canvas).off('mousedown');
    $(canvas).off('mousemove');
    $(canvas).off('mouseup');
    $(canvas).off('mouseout');
    $(canvas).on('click', (e => { this.reload(); e.stopImmediatePropagation(); window.globalState.currentTool.clickAction(e); }));
    $(canvas).on('mousedown', (e) => window.globalState.currentTool.activateTool(e));
    $(canvas).on('mousemove', (e) => { this.reload(); window.globalState.currentTool.toolAction(e) });
    $('.workflow').on('mousemove', this.locator.drawLocation.bind(this.locator));
    $('.workflow').on('mouseout', this.locator.noLocation.bind(this.locator));
    $(canvas).on('mouseup', (e) => { this.update(); window.globalState.currentTool.deactivateTool(e) });
    $(canvas).on('mouseout', (e) => { this.update(); window.globalState.currentTool.deactivateTool(e) });
  }

  delegate(event) {
    this.event = event;
    this.tool = new this.toolsObject[event.target.getAttribute('tool')].prototype.constructor();

    if (window.globalState.currentTool) {
      $(this.tool.manager.canvas).off('click');
      $(this.tool.manager.canvas).off('mousedown');
      $(this.tool.manager.canvas).off('mousemove');
      $(this.tool.manager.canvas).off('mouseup');
      $(this.tool.manager.canvas).off('mouseout');
      $('.toolbar .active').removeClass('active');
      if (event.target.getAttribute('tool') === window.globalState.currentTool.name) {
        window.globalState.currentTool.suspendTool(event);
        return true;
      }
      window.globalState.currentTool.suspendTool(event);
    }
    event.target.classList.add('active');
    this.tool.invokeTool(event);
    $(this.tool.manager.canvas).on('click', (e => { this.reload(); e.stopImmediatePropagation(); window.globalState.currentTool.clickAction(e); }));
    $(this.tool.manager.canvas).on('mousedown', (e) => window.globalState.currentTool.activateTool(e));
    $(this.tool.manager.canvas).on('mousemove', (e) => { this.reload(); window.globalState.currentTool.toolAction(e) });
    $(this.tool.manager.canvas).on('mouseup', (e) => { this.update(); window.globalState.currentTool.deactivateTool(e) });
    $(this.tool.manager.canvas).on('mouseout', (e) => { this.update(); window.globalState.currentTool.deactivateTool(e) });
    this.tool = null;
  }


}
