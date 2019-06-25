export default class locator {
    constructor(canvasManager) {
        this.manager = canvasManager;
    }

    reactEvent(event) {
        return this.manager.pointedUnit(event.pageX, event.pageY);
    }

    drawLocation(event) {
        let XY = this.reactEvent(event);
        $('#location_X').text(`${XY.unitX}`);
        $('#location_Y').text(`${XY.unitY}`);
    }
}
