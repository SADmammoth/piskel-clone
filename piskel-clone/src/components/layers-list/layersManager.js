export default class layersManager {
  constructor(layersList) {
    this.layersList = layersList;
  }

  html() {
    let str = this.layersList.layers().reduce((acc, x) => acc += x.html(), '');
    return `${str}`;
  }

  delete() {
    $('.layers-list').children().remove();
  }

  rebind() {
    $('.layers-list').on('click', this.chooseLayer.bind(this));
  }

  bind() {
    $('.layers-list').on('click', this.chooseLayer.bind(this));
    $('button[tool="newlayer"]').on('click', () => { this.layersList.createLayer(); });
  }

  chooseLayer(e) {
    if ($(e.target).text() === window.globalState.currentLayer.name) {
      return true;
    }
    this.layersList.editLayer($(e.target).text());
    $('.layers-list .active').removeClass('active');
    e.target.classList.add('active');
  }
}
