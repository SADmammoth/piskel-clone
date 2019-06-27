export default class Frame {
    constructor(count, layerList) {
        this.count = count;
        this.layerList = layerList;
    }

    html() {
        let node = $(`<button class='frame btn btn-primary'><span>${this.count}</span>${window.globalState.previewTemplate}</button>`);
        $('.frames').append(node);
        this.layerList.preview(node.find('.preview'));
    }

    preview(canvas) {
        return this.layerList.redraw(canvas);
    }
}
