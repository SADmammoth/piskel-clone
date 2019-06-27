export default class Frame {
    constructor(count, layerList) {
        this.count = count;
        this.layerList = layerList;
    }

    html() {
        return `<button class='frame btn btn-primary'><div><span>${this.count}</span></div></button>`;
    }
}
