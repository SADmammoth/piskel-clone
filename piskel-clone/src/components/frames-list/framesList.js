
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
        }
    }

    start() {
        this.framesCount = 0;
        this.framesManager = new framesManager(this);
        this.list = [];
        this.createFrame();
    }

    embed() {
        this.framesManager.delete();
        let html = this.framesManager.html();
        $('body').append(html);
        this.framesManager.bind();
    }

    createFrame() {
        let frame = new Frame(this.framesCount, new layersList());
        this.list.push(frame);
        this.embed();
        window.globalState.currentFrame = frame;
        this.framesCount++;
    }

    editFrame(count) {
        console.log(count);
        window.globalState.currentFrame = this.list[count];
        window.globalState.currentFrame.layerList.showCanvas();
        this.embed();
    }

    // editLayer(name) {
    //     if (!name || this.listObject[name] === undefined) {
    //         throw new Error('Cannot find layer with name specified');
    //     }
    //     window.globalState.currentLayer = this.listObject[name];
    //     if (window.globalState.currentTool) {
    //         this.updateView();
    //     }
    // }

    // linkSignal(signal) {
    //     this.updateView = signal;
    // }

    frames() {
        return this.list;
    }
}
