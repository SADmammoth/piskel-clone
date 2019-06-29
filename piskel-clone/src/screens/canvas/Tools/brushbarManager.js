export default class brushbarManager {
  constructor(default_width) {
    this.default_width = default_width;
    window.globalState.brushWidth = default_width;
  }

  start() {
    $('#width-bar')[0].value = window.globalState.brushWidth;
    $(".brushbar output[for='width-bar']").text(window.globalState.brushWidth);
    $('#width-bar').on('input', this.update.bind(this));
  }

  update(event) {
    clearTimeout(this.timeout);
    window.globalState.brushWidth = event.target.value;
    $(".brushbar output[for='width-bar']").text(window.globalState.brushWidth);
    $(".brushbar output[for='width-bar']").css('left', ((window.globalState.brushWidth - 1) * 30.5) + '%');
  }
}
