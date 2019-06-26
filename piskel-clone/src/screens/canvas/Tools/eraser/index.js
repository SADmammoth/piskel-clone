import Pen from "../pen/index.js";

export default class Eraser extends Pen {
    constructor(canvasManager) {
        super(canvasManager, null);
        this.name = 'eraser';
    }

    startAction(event) {
        this.manager.canvas.getContext('2d').globalCompositeOperation = 'destination-out';
        super.startAction(event);
    }

    stopAction(event) {
        super.stopAction(event);
        this.manager.canvas.getContext('2d').globalCompositeOperation = 'source-over';
    }

}
