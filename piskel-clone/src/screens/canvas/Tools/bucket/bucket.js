import Tool from "../tool.js";

export default class Bucket extends Tool {
    constructor() {
        super('bucket');
        this.clickAction = this.clickAction.bind(this);
    }


    async clickAction(event) {
        this.start = this.manager.getPointedUnit(event.pageX, event.pageY);
        this.color = this.start.getColor();
        console.log(this.color, this.start.d_x, this.start.d_y);
        async function paint(arr, color) {

            for (let i = 0; i < arr.length; i++) {

                if (arr[i] === null) {
                    return [];
                }
                console.log(arr[i].getColor(), arr[i]);

                if (arr[i].getColor() === color) {
                    arr[i].paint(null, window.globalState.unit_size, window.globalState.secondaryColor);
                } else {
                    arr.splice(i, 1);
                }

            }
            if (arr !== []) {
                arr = arr.map((x) => { if (x.dir) { console.log(x[x.dir]); return x[x.dir](); } });
            }
            return arr;
        }

        async function rec(color, unit, arr, i) {

            if (i === 1) {
                unit.paint(null, window.globalState.unit_size, window.globalState.secondaryColor);
                arr = unit.get_neighbors(1);
            } else {
                arr = await paint(arr, color);
            }
            if (arr === []) {
                return;
            }

            i++;
            if (i > 200) {
                return;
            }
            return rec(color, unit, arr, i);
        }

        rec(this.color, this.start, Array.of(this.start), 1);
    }


    startAction() { return true; }

    intimeActions() { return true; }

    stopAction() { return true; }

    toolAction() { return true; }

    activateTool() { return true; }

    deactivateTool() { return true; }
}
