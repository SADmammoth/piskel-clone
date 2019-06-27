window.globalState = {
    app_name: 'PiskelClone',
    canvasTemplate: '<canvas class="layer" width= 500 height = 500 style="width: 500px; height: 500px; background-image: none; border:1px solid #000000;"></canvas>',
    previewTemplate: '<canvas class="preview" width= 500 height = 500 style="width: 100px; height: 100px; border:1px solid #000000;"></canvas>',
    unit_width: 32,
    unit_height: 32,
    fps: 24
};

// import canvasManager from "./Tools/canvasManager.js";
// import locator from "./Tools/locator.js";
import Pen from "./Tools/pen/index.js";
import Eraser from "./Tools/eraser/index.js";
import toolbarManager from "./Tools/toolbarManager.js";
import colorManager from "./Tools/colorManager.js";
import brushbarManager from "./Tools/brushbarManager.js";
import Bucket from "./Tools/bucket/bucket.js";
import framesList from "../../components/frames-list/index.js";

let framelist = new framesList();




let toolsObject = {};
toolsObject['pen'] = Pen;
toolsObject['eraser'] = Eraser;
toolsObject['bucket'] = Bucket;

let toolbar = new toolbarManager(toolsObject);
toolbar.start(framelist.update);
framelist.start(toolbar.signal);

let colorbar = new colorManager('#000000', '#ff0000');
colorbar.start();

let brushbar = new brushbarManager(1);
brushbar.start();

$(function () {
    $('.workflow').css('--i', window.globalState.unit_width);
    $('.workflow').css('--w', '500px');
});
