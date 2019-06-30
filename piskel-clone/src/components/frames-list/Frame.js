export default class Frame {
  constructor(count, layerList) {
    this.count = count;
    this.layerList = layerList;
  }

  copy() {
    return new Frame(this.count, this.layerList.copy());
  }
  html() {
    let node = $(`<button class='frame btn btn-secondary rounded-0' style='padding: 0;'>
    <span class='framecount'>${this.count}</span>${window.globalState.previewTemplate}
    <a class='duplicateframe'><i class="fa fa-files-o"></i></a>
    <a class='deleteframe'><i class="fa fa-trash-o"></i></a>
    </button>`);
    $('.frames-list').prepend(node);
    this.layerList.preview(node.find('.preview.checked'));
  }

  preview(canvas) {
    return this.layerList.redraw(canvas);
  }
}
