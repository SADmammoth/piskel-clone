import Tool from "../tool.js";

export default class Bucket extends Tool {
    constructor() {
        super('bucket');
        this.clickAction = this.clickAction.bind(this);
    }

    clickAction(event) {
        let trampoline = fn => (...args) => {
            let result = fn(...args)
            while (typeof result === 'function') {
                result = result()
            }
            return result
        };

        let start = this.manager.getPointedUnit(event.pageX, event.pageY);
        this.colorToPaint = start.getColor();
        if (this.colorToPaint === window.globalState.secondaryColor) {
            return;
        }

        function addThatNotIn(arr1, arr2, flag) {
            let i = 0;
            arr2.forEach((x) => { if (!inthe(arr1, x)) { return arr1.push(x); } i++; });
            if (flag && arr1.length <= i) {
                return null;
            }
            return arr1;
        }

        function inthe(arr, a) {
            if (a === null) {
                return true;
            }
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] === null) {
                    return true;
                }
                if (arr[i].d_x === a.d_x && arr[i].d_y === a.d_y) {
                    return true;
                }
            }
            return false;
        }

        function recursion(color, neighbors, unit, i) {
            // if (i > 4) {
            //     throw Error(`Too long: think better about this; ${neighbors.length}`);
            // }


            if (unit && unit.getColor() === color) {

                unit.paint(null, window.globalState.unit_size, window.globalState.secondaryColor);
            }
            neighbors = addThatNotIn(neighbors, unit.get_neighbors(), i !== 0 && i >= neighbors.length);
            if (!neighbors) {
                return;
            }
            unit = neighbors[i];
            i++;
            return recursion(color, neighbors, unit, i);
        }
        trampoline(recursion)(this.colorToPaint, [], start, 0);
    }



    startAction() { return true; }

    intimeActions() { return true; }

    stopAction() { return true; }

    toolAction() { return true; }

    activateTool() { return true; }

    deactivateTool() { return true; }
}
