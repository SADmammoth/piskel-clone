window.globalState = { app_name: 'PiskelClone' };

import canvasManager from "./canvasManager.js";
import locator from "./locator.js";
import Pen from "./Tools/pen/index.js";
import Eraser from "./Tools/eraser/index.js";
import toolbarManager from "./toolbarManager.js";
import colorManager from "./colorManager.js";

let manager = new canvasManager(32, 32, $('canvas')[0]);

let loc = new locator(manager);
$('canvas').on('mousemove', function (event) { loc.drawLocation(event); });

let toolsObject = {};
toolsObject['pen'] = new Pen(manager);
toolsObject['eraser'] = new Eraser(manager);

let toolbar = new toolbarManager(toolsObject);
toolbar.start();

let colorbar = new colorManager('#000000', '#ffffff');
colorbar.start();
