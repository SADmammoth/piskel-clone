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
    this.stopPreview();
    let canvas = $(window.globalState.previewTemplate);
    $('body').append(canvas);
    $('body .preview').wrap('<div class="big_preview"/>');
    this.canvas = $('.big_preview canvas');
    this.frames = window.globalState.currentFramelist.frames();
    $('body .big_preview').append('<button class ="fullpreview">Preview</button>');
    $('body .big_preview .fullpreview').on('click', this.blankwindow.bind(this));
    $('body .big_preview').append('<button class ="stopPreview">StopPreview</button>');
    $('body .big_preview .stopPreview').on('click', this.stopPreview.bind(this));
    $('body .big_preview').append('<br><button class ="startPreview">startPreview</button>');
    $('body .big_preview .startPreview').on('click', this.update.bind(this));
  }

  async update() {
    this.stopPreview();
    this.frames = window.globalState.currentFramelist.frames();
    this.interval = setInterval(this.updateView.bind(this), 1000 / window.globalState.fps);
  }

  async blankwindow() {
    this.stopPreview();
    let win = window.open('about:blank', 'Video preview');
    $(win.document.body).append($(window.globalState.canvasTemplate));
    this.canvas2 = $(win.document.body).find('canvas');
    this.canvas2.addClass('fullscreen');
    this.canvas2[0].style = `--w: 500px;
    --i: ${window.globalState.unit_width};
    width: 500px;
    height: 500px;
    background-color: #ffffff;
    background-image: linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(135deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(135deg, transparent 75%, #ccc 75%);
    background-size: calc(var(--w) /var(--i) * 2) calc(var(--w) /var(--i) * 2); /* Must be a square */
    background-position: 0 0, calc(var(--w) /var(--i)) 0, calc(var(--w) /var(--i)) calc(var(--w) /var(--i) * -1), 0px calc(var(--w) /var(--i)); /* Must be half of one side of the square */
    border: 1px solid #000000; `;
    this.frames = window.globalState.currentFramelist.frames();
    this.interval = setInterval(this.updateView.bind(this), 1000 / window.globalState.fps);
  }

  async stopPreview() {
    clearInterval(this.interval);
  }
}
