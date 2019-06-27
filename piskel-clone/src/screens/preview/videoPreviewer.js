export default class videoPreviewer {
  constructor() {
    this.frame = 0;
    this.update = this.update.bind(this);
  }

  async start() {
    this.embed();
    this.interval = setInterval(this.updateView.bind(this), 1000 / window.globalState.fps);

  }

  async updateView() {
    this.frames[this.frame].preview(this.canvas);
    if (this.canvas2 !== undefined) {
      this.frames[this.frame].preview(this.canvas2);
    }
    if (this.frame === this.frames.length - 1) {

      this.frame = 0;
      return;
    }
    this.frame++;
  }

  async embed() {

    clearInterval(this.interval);
    let canvas = $(window.globalState.previewTemplate);
    $('body').append(canvas);
    $('body .preview').wrap('<div class="big_preview"/>');
    this.canvas = $('.big_preview canvas');
    this.frames = window.globalState.currentFramelist.frames();
    $('body').append('<button class ="fullpreview">Preview</button>');
    $('body .fullpreview').on('click', this.blankwindow.bind(this));
  }

  async update() {
    clearInterval(this.interval);
    this.frames = window.globalState.currentFramelist.frames();
    this.interval = setInterval(this.updateView.bind(this), 1000 / window.globalState.fps);
  }

  async blankwindow() {
    clearInterval(this.interval);
    let win = window.open('about:blank', 'Video preview');
    $(win.document.body).append($(window.globalState.canvasTemplate));
    this.canvas2 = $(win.document.body).find('canvas');
    this.frames = window.globalState.currentFramelist.frames();
    this.interval = setInterval(this.updateView.bind(this), 1000 / window.globalState.fps);
  }
}
