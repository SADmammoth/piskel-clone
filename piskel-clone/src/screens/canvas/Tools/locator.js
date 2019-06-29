export default class locator {
  constructor() {
  }

  reactEvent(event) {
    return window.globalState.currentLayer.manager.pointedUnit(event.pageX, event.pageY);
  }

  drawLocation(event) {
    let XY = this.reactEvent(event);
    $('#location_X').text(`${XY.unitX}`);
    $('#location_Y').text(`${XY.unitY}`);
  }

  noLocation() {
    $('#location_X').text(`-`);
    $('#location_Y').text(`-`);
  }
}
