import canvasManager from "./canvasManager.js";
import locator from "./locator.js";
import Pen from "./Tools/pen/index.js";
import Eraser from "./Tools/eraser/index.js";

let manager = new canvasManager(32, 32, $('canvas')[0]);

let loc = new locator(manager);
let PenTool = new Eraser(manager);

$(function () {
    $('canvas').on('mousemove', function (event) { loc.drawLocation(event); });
    $('canvas').on('mousedown', (e) => PenTool.invokeTool(e));
    $('canvas').on('mousemove', (e) => PenTool.toolAction(e));
    $('canvas').on('mouseup', (e) => PenTool.suspendTool(e));
    $('canvas').on('mouseout', (e) => PenTool.suspendTool(e));
});




