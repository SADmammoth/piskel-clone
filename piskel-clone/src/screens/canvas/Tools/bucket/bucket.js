import Tool from "../tool.js";

export default class Bucket extends Tool {
  constructor() {
    super('bucket');
    this.clickAction = this.clickAction.bind(this);
  }


  async clickAction(event) {
    let trampoline = fn => (...args) => {
      let result = fn(...args)
      while (typeof result === 'function') {
        result = result()
      }
      return result
    };
    this.start = this.manager.getPointedUnit(event.pageX, event.pageY);
    this.color = this.start.getColor();
    function paint(x) {
      x.paint(null, window.globalState.unit_size, window.globalState.secondaryColor);
    }
    paint(this.start);
    function rec(plus, color, i) {
      if (!plus.length) {
        console.log(`Bucket suspended; array max size ${plus.length}`)
        return;
      }

      if (plus.length > 2000) {
        throw Error(`bad: ${plus.length}`);
      }

      plus = plus.reduce((acc, x) => { acc = addThatNotIn(acc, x.get_plus(1), color); return acc; }, []);

      i++;
      setTimeout(rec, 0, plus, color, i);
    }

    function addThatNotIn(arr1, arr2, color) {
      arr2.forEach((x, i) => { if (inthe(arr1, x, i) === -1 && x.getColor() === color) { paint(x); arr1.push(x); } });
      return arr1;
    }

    function inthe(arr, a, m) {
      if (a === 'no_unit') {
        return -2;
      }
      for (let i = m; i < arr.length; i++) {
        if (arr[i].d_x === a.d_x && arr[i].d_y === a.d_y) {
          return i;
        }
      }
      return -1;
    }

    trampoline(rec)(Array.of(this.start), this.color, 0);
  }


  startAction() { return true; }

  intimeActions() { return true; }

  stopAction() { return true; }

  toolAction() { return true; }

  activateTool() { return true; }

  deactivateTool() { return true; }
}
