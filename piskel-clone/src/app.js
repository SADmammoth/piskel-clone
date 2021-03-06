import { Pen, Eraser, Bucket, toolbarManager, colorManager, brushbarManager } from './screens/canvas/index.js'

import framesList from "./components/frames-list/index.js";

import videoPreviewer from "./screens/preview/videoPreviewer.js";


export default class PiskelApp {
  constructor(unit_width, unit_height) {
    window.globalState = {
      app_name: 'PiskelClone',
      canvasTemplate: '<canvas class="layer" width= 640 height= 640></canvas>',
      previewTemplate: '<canvas class="preview checked" width= 500 height = 500></canvas>',
      unit_width: unit_width,
      unit_height: unit_height,
      fps: 24,
    };
  }

  setSize(unit_width, unit_height) {
    window.globalState.unit_width = unit_width;
    window.globalState.unit_height = unit_height;
  }

  start(unit_width, unit_height) {
    this.setSize(unit_width, unit_height);
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
    $(':root').css('--i', window.globalState.unit_width);


  }

  dev() {
    $('body').on('keydown', (e) => { if (e.key === 'B') { window.globalState.currentFramelist.moveFrame(0, 1); } });
  }
}
