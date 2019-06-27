window.globalState = {
    app_name: 'PiskelClone',
    canvasTemplate: '<canvas width= 500 height = 500 style="width: 500px; height: 500px; background-image: none; border:1px solid #000000;"></canvas>',
    unit_width: 32,
    unit_height: 32
};

import canvasManager from "./Tools/canvasManager.js";
import locator from "./Tools/locator.js";
import Pen from "./Tools/pen/index.js";
import Eraser from "./Tools/eraser/index.js";
import toolbarManager from "./Tools/toolbarManager.js";
import colorManager from "./Tools/colorManager.js";
import brushbarManager from "./Tools/brushbarManager.js";
import layersList from "../../components/layers-list/index.js";
import Layer from "../../components/layers-list/layer.js";
import Bucket from "./Tools/bucket/bucket.js";

let manager = new canvasManager(window.globalState.unit_width, window.globalState.unit_height, $('canvas')[0]);

let layerslist = new layersList(new Layer('Layer 1', manager, 0));

layerslist.embed();

let loc = new locator(manager);
$('canvas').on('mousemove', function (event) { loc.drawLocation(event); });

let toolsObject = {};
toolsObject['pen'] = Pen;
toolsObject['eraser'] = Eraser;
toolsObject['bucket'] = Bucket;

let toolbar = new toolbarManager(toolsObject);
toolbar.start();

layerslist.linkSignal(toolbar.signal);

let colorbar = new colorManager('#000000', '#ff0000');
colorbar.start();

let brushbar = new brushbarManager(1);
brushbar.start();
