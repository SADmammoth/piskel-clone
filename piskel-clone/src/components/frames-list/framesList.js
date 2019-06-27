
import Frame from './Frame.js';
import layersList from '../layers-list/index.js';
import framesManager from './framesManager.js'

export default class framesList {
    constructor(basicFrame, manager) {
        if (basicFrame && manager) {
            this.basicFrame = basicFrame;
            this.framesManager = manager;
            this.list = Array.of(this.basicFrame);
            this.framesCount = 1;
            window.globalState.currentFrame = basicFrame;
        } else {
            this.framesCount = 0;
            this.framesManager = new framesManager(this);
            this.list = [];
            this.update = this.update.bind(this);
        }
    }

    start(toolbarSignal) {
        this.signal = toolbarSignal;
        this.createFrame();

    }

    embed() {
        this.framesManager.delete();
        this.framesManager.html();


        this.framesManager.bind();
    }

    createFrame() {
        let frame = new Frame(this.framesCount, new layersList(this.signal));
        this.list.push(frame);
        this.embed();
        window.globalState.currentFrame = frame;
        this.framesCount++;
    }

    editFrame(count) {
        console.log(count);
        window.globalState.currentFrame = this.list[count];
        window.globalState.currentFrame.layerList.showCanvas();
        window.globalState.currentLayer = window.globalState.currentFrame.layerList.lastLayer;
        this.embed();
    }

    update() {
        this.embed();
    }

    frames() {
        return this.list;
    }
}
