
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
    this.framesManager.bind();
  }

  embed() {
    this.framesManager.delete();
    this.framesManager.html();
    this.framesManager.rebind();
    window.globalState.currentFrame.layerList.embed();
  }

  createFrame() {
    let frame = new Frame(this.framesCount, new layersList(this.signal));

    this.list.push(frame);
    window.globalState.currentFrame = frame;
    this.framesCount++;
    this.embed();
  }

  editFrame(count) {
    window.globalState.currentFrame = this.list[count];
    console.log(count);
    window.globalState.currentFrame.layerList.showCanvas();
    window.globalState.currentLayer = window.globalState.currentFrame.layerList.lastLayer;
    this.embed();
  }

  moveFrame(from_count, to_count) {
    if (from_count >= this.list.length || to_count < 0 || from_count >= to_count) {
      throw Error('Incorrect frame count input');
    }
    this.list[from_count].count = to_count;
    this.list[to_count].count = from_count;
    let buf = this.list[from_count];
    this.list.splice(from_count, 1);
    this.list.splice(to_count, 0, buf);
    this.embed();
  }

  duplicateFrame(count) {
    let frame = this.list[count];
    this.list.splice(count + 1, 0, frame);
    this.reassignindexes();
    this.embed();
  }

  deleteFrame(count) {
    if (this.framesCount > 1) {
      let frame = this.list[count];
      if (frame) {
        if (window.globalState.currentFrame.count === count) {
          if (count >= 1) {
            window.globalState.currentFrame = this.list[count - 1];
            this.list.splice(count, 1);
            this.framesCount--;
          }
          else {
            this.list.splice(count, 1);
            window.globalState.currentFrame = this.list[this.framesCount--];
          }
        } else {
          this.list.splice(count, 1);
          this.framesCount--;
        }
        this.reassignindexes();
        this.embed();
      } else {
        throw Error('Incorrect frame count input');
      }

    }
  }

  reassignindexes() {
    this.list.forEach((x, i) => x.count = i);
  }

  update() {
    this.embed();
  }

  frames() {
    return this.list;
  }
}
