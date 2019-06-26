import Tool from '../tool.js';

export default class Pen extends Tool {
    constructor() {
        super('pen');
    }

    clickAction(event) {
        let context = this.manager.canvas.getContext('2d');
        this.currentPath = new Path2D();
        this.widthMod = window.globalState.brushWidth;
        this.paintColor = window.globalState.primaryColor;
        context.fillStyle = this.paintColor;
        context.beginPath();
        this.stopAction(event);
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
        console.log('Pen tool invoked succesfully...');
    }

    paintPoint(event) {
        return this.manager.getPointedUnit(event.pageX, event.pageY);
    }

    intimeActions(event) {
        let context = this.manager.canvas.getContext('2d');
        let paintPoint = this.paintPoint(event);
        paintPoint.paint(this.currentPath, this.widthMod * this.manager.unit_size, this.paintColor);
        this.prevX = paintPoint.d_x;
        this.prevY = paintPoint.d_y;
        context.fill(this.currentPath);
    }

    stopAction() {
        let context = this.manager.canvas.getContext('2d');
        this.prevX = null; this.prevY = null;
        context.closePath();
        console.log('Pen tool suspended succesfully...');
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
}























// function setpixelated(context) {
//     context['imageSmoothingEnabled'] = false;       /* standard */
//     context['mozImageSmoothingEnabled'] = false;    /* Firefox */
//     context['oImageSmoothingEnabled'] = false;      /* Opera */
//     context['webkitImageSmoothingEnabled'] = false; /* Safari */
//     context['msImageSmoothingEnabled'] = false;     /* IE */
// }



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
