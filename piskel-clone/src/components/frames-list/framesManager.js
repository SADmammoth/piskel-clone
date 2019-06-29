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
    if (e.target.classList.contains('btn')) {
      let target = $(e.target).find('span');
      if (target.text() === window.globalState.currentFrame.count) {
        return true;
      }


      this.framesList.editFrame(target.text());
      $('.frames-list button.active').removeClass('active');
      e.target.classList.add('active');
    }
  }
}
