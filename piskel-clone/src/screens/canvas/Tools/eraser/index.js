import Pen from "../pen/index.js";

export default class Eraser extends Pen {
    constructor(canvasManager) {
        super(canvasManager, null);
        this.manager.canvas.globalCompositeOperation = 'destination-out';
    }

    stopAction(event) {
        super.stopAction(event);
        this.manager.canvas.globalCompositeOperation = 'source-over';
    }

}
