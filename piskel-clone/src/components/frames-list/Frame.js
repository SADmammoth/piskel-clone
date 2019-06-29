export default class Frame {
  constructor(count, layerList) {
    this.count = count;
    this.layerList = layerList;
  }

  html() {
    let node = $(`<button class='frame btn btn-secondary rounded-0' style='padding: 0;'><span class='framecount'>${this.count}</span>${window.globalState.previewTemplate}</button>`);
    $('.frames-list').prepend(node);
    this.layerList.preview(node.find('.preview.checked'));
  }

  preview(canvas) {
    return this.layerList.redraw(canvas);
  }
}
