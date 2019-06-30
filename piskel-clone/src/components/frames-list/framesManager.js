export default class framesManager {
  constructor(framesList) {
    this.framesList = framesList;
  }

  html() {
    this.framesList.frames().map((x) => x.html());
  }

  delete() {
    $('.frames-list').children().remove();
  }

  rebind() {
    $('.frame').on('click', this.chooseFrame.bind(this));
    $('.duplicateframe').on('click', (e) => {
      this.framesList.duplicateFrame($(e.target).parent().parent().find('.framecount').text());
    });
    $('.deleteframe').on('click', (e) => {
      this.framesList.deleteFrame($(e.target).parent().parent().find('.framecount').text());
    });
  }

  bind() {
    $('.frame').on('click', this.chooseFrame.bind(this));
    $('.framesbar').on('click', (event) => {
      if ($(event.target).attr('tool') === 'newframe') {
        this.framesList.createFrame();
      }
    });
  }

  chooseFrame(e) {
    if (e.target.classList.contains('preview')) {
      e.target = $(e.target).parent()[0];
    }
    console.log(e.target);
    if (e.target.classList.contains('btn')) {
      e.stopPropagation();
      let target = $(e.target).find('.framecount');
      if (target.text() === window.globalState.currentFrame.count) {
        return true;
      }
      this.framesList.editFrame.bind(this.framesList)(target.text());
      $('.frames-list button.active').removeClass('active');
      e.target.classList.add('active');
      console.log(e.target.classList);
    }
  }
}
