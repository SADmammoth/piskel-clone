import Tool from '../tool.js';

export default class Pen extends Tool {
    constructor(canvasManager, colorManager) {
        super('pen', canvasManager, colorManager);
        this.prevX = null;
        this.prevY = null;
        this.widthMod = 1;
        this.startAction = this.startAction.bind(this);
        this.intimeActions = this.intimeActions.bind(this);
        this.stopAction = this.stopAction.bind(this);
    }

    startAction(event) {

        let context = this.manager.canvas.getContext('2d');
        this.currentPath = new Path2D();
        context.strokeStyle = 'blue';
        context.fillStyle = 'blue';
        context.beginPath();
        let paintPoint = this.paintPoint(event);
        paintPoint.paint(this.currentPath);
        this.prevX = paintPoint.center_pixel.d_x;
        this.prevY = paintPoint.center_pixel.d_y;
        console.log('Pen tool invoked succesfully...');
    }

    paintPoint(event) {
        return this.manager.getPointedUnit(event.pageX, event.pageY);
    }

    intimeActions(event) {
        let context = this.manager.canvas.getContext('2d');
        context.lineWidth = this.widthMod * this.manager.unit_size;
        let paintPoint = this.paintPoint(event);
        paintPoint.paint(this.currentPath);
        this.prevX = paintPoint.d_x;
        this.prevY = paintPoint.d_y;
        context.fill(this.currentPath);


    }

    stopAction(event) {

        let paintPoint = this.paintPoint(event);
        paintPoint.paint(this.currentPath);
        this.prevX = null; this.prevY = null;
        this.currentPath.closePath();
        console.log('Pen tool suspended succesfully...');
    }


    // startAction(event) {

    //     let context = this.manager.canvas.getContext('2d');
    //     context.beginPath();
    //     context.strokeStyle = 'blue';
    //     context.fillStyle = 'blue';
    //     let paintPoint = this.paintPoint(event);
    //     paintPoint.paint();
    //     this.prevX = paintPoint.center_pixel.d_x;
    //     this.prevY = paintPoint.center_pixel.d_y;

    //     console.log('Pen tool invoked succesfully...');
    // }

    // paintPoint(event) {
    //     return this.manager.getPointedUnit(event.pageX, event.pageY);
    // }

    // intimeActions(event) {
    //     let context = this.manager.canvas.getContext('2d');
    //     context.lineWidth = this.widthMod * this.manager.unit_size;
    //     let paintPoint = this.paintPoint(event).center_pixel;

    //     moveTo(paintPoint.d_x, paintPoint.d_y);
    //     if (this.prevY || this.prevX) {
    //         context.lineTo(this.prevX, this.prevY);
    //     }
    //     context.stroke();
    //     this.prevX = paintPoint.d_x;
    //     this.prevY = paintPoint.d_y;
    // }

    // stopAction(event) {
    //     let paintPoint = this.paintPoint(event);
    //     paintPoint.paint();
    //     this.prevX = null; this.prevY = null;
    //     console.log('Pen tool suspended succesfully...');
    // }

    activateTool(event) {
        return super.activateTool(event, this.startAction);
    }

    toolAction(event) {
        super.toolAction(event, this.intimeActions);
    }
    deactivateTool(event) {
        super.deactivateTool(event, this.stopAction);
    }
};
// function setpixelated(context) {
//     context['imageSmoothingEnabled'] = false;       /* standard */
//     context['mozImageSmoothingEnabled'] = false;    /* Firefox */
//     context['oImageSmoothingEnabled'] = false;      /* Opera */
//     context['webkitImageSmoothingEnabled'] = false; /* Safari */
//     context['msImageSmoothingEnabled'] = false;     /* IE */
// }
