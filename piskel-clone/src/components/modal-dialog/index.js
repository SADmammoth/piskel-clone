let doc = require;
let parser = new DOMParser()
doc = parser.parseFromString(require("./index.html"), "text/html")

$('#welcomescreen').html($(doc.body).html());

export default class canvasCreator {
  constructor(func) {
    this.func = func;
  }
  start() {
    $('#welcomescreen').modal('toggle');

    $('.create').on('click', (e) => {
      e.stopImmediatePropagation();
      if ($('#width').val() === '') {
        $('[data-toggle="popover"]').popover('show');
        return;
      }
      this.func($('#width').val(), $('#width').val());
      $('#welcomescreen').modal('toggle');
    });
  }
}
