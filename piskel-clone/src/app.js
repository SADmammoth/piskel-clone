import { Pen, Eraser, Bucket, toolbarManager, colorManager, brushbarManager } from './screens/canvas/index.js'

import framesList from "./components/frames-list/index.js";

import videoPreviewer from "./screens/preview/videoPreviewer.js";

export default class PiskelApp {
  constructor() {
    window.globalState = {
      app_name: 'PiskelClone',
      canvasTemplate: '<canvas class="layer" width= 500 height = 500 style="width: 500px; height: 500px; background-image: none; border:1px solid #000000;"></canvas>',
      previewTemplate: '<canvas class="preview" width= 500 height = 500 style="width: 100px; height: 100px; border:1px solid #000000;"></canvas>',
      unit_width: 32,
      unit_height: 32,
      fps: 24
    };
  }

  start() {
    window.globalState.currentFramelist = new framesList();

    let previewer = new videoPreviewer();
    previewer.start();

    let toolsObject = {};
    toolsObject['pen'] = Pen;
    toolsObject['eraser'] = Eraser;
    toolsObject['bucket'] = Bucket;

    let toolbar = new toolbarManager(toolsObject);
    toolbar.start(window.globalState.currentFramelist.update, previewer.update);
    window.globalState.currentFramelist.start(toolbar.signal);

    let colorbar = new colorManager('#000000', '#ff0000');
    colorbar.start();

    let brushbar = new brushbarManager(1);
    brushbar.start();
    $('.workflow').css('--i', window.globalState.unit_width);
    $('.workflow').css('--w', '500px');
  }
}
