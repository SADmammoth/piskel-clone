import canvasManager from '../../screens/canvas/Tools/canvasManager.js'
import layersManager from './layersManager.js';
import Layer from './Layer.js';

export default class layersList {
    constructor(base_layer) {
        this.base_layer = base_layer;
        this.layersManager = new layersManager(this);
        this.listObject = { 'Layer 1': base_layer };
        this.layersCount = 1;
        window.globalState.currentLayer = base_layer;
    }

    embed() {
        this.layersManager.delete();
        let html = this.layersManager.html();
        $('body').append(html);
        this.layersManager.bind();
    }

    createLayer(name) {
        if (this.listObject[name] !== undefined) {
            throw new Error('Cannot create layer with name specified');
        }
        this.layersCount++;
        let canvas = $(window.globalState.canvasTemplate);
        canvas.css('zIndex', this.layersCount);
        $('.workflow').append(canvas);
        let manager = new canvasManager(window.globalState.unit_width, window.globalState.unit_height, canvas[0]);
        if (!name) {
            name = `Layer ${this.layersCount}`;
        }
        this.listObject[name] = new Layer(name, manager, this.layersCount);
        window.globalState.currentLayer = this.listObject[name];
        if (window.globalState.currentTool) {
            this.updateView();
        }
        this.embed();
    }

    editLayer(name) {
        if (!name || this.listObject[name] === undefined) {
            throw new Error('Cannot find layer with name specified');
        }
        window.globalState.currentLayer = this.listObject[name];
        if (window.globalState.currentTool) {
            this.updateView();
        }
    }

    linkSignal(signal) {
        this.updateView = signal;
    }

    layers() {
        return Object.keys(this.listObject).reduce((acc, x) => { acc.push(this.listObject[x]); return acc; }, []).reverse();
    }
}
