$('#welcomescreen').html($(require("./index.html")));


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
