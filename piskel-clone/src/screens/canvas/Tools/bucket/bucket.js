import Tool from "../tool.js";

export default class Bucket extends Tool {
  constructor() {
    super('bucket');
    this.clickAction = this.clickAction.bind(this);
  }


  async clickAction(event) {
    this.start = this.manager.getPointedUnit(event.pageX, event.pageY);
    this.color = this.start.getColor();
    function paint(x) {
      x.paint(null, window.globalState.unit_size, window.globalState.secondaryColor);
    }

    function rec(plus, cross, color, i) {
      if (!plus.length && !cross.length) {
        return;
      }

      if (plus.length > 2000) {
        throw Error(`bad: ${plus.length}`);
      }
      plus = plus.filter((x) => {
        if (x !== 'no_unit' && x.getColor() === color) {
          paint(x);
          return true;
        }
        return false;
      });

      cross = cross.reduce((acc, x) => { acc = addThatNotIn(acc, x.get_cross(1)); return acc; }, []);
      cross = cross.filter((x) => {
        if (x !== 'no_unit' && x.getColor() === color) {
          paint(x);
          return true;
        }
        return false;
      });

      plus = plus.reduce((acc, x) => { acc = addThatNotIn(acc, x.get_plus(1)); return acc; }, []);

      i++;
      setTimeout(rec, 0, plus, cross, color, i);
    }

    function addThatNotIn(arr1, arr2) {
      arr2.forEach((x) => { if (inthe(arr1, x) === -1) { arr1.unshift(x); } });
      return arr1;
    }

    function inthe(arr, a) {
      if (a === 'no_unit') {
        return -2;
      }
      for (let i = 0; i < arr.length; i++) {

        if (arr[i].d_x === a.d_x && arr[i].d_y === a.d_y) {
          return i;
        }
      }
      return -1;
    }

    rec(Array.of(this.start), Array.of(this.start), this.color, 0);
  }


  startAction() { return true; }

  intimeActions() { return true; }

  stopAction() { return true; }

  toolAction() { return true; }

  activateTool() { return true; }

  deactivateTool() { return true; }
}






// this.start = this.manager.getPointedUnit(event.pageX, event.pageY);
//     this.color = this.start.getColor();
//     async function paint(arr, color) {

//       for (let i = 0; i < arr.length; i++) {

//         if (arr[i] === null) {
//           return [];
//         }

//         if (arr[i].getColor() === color) {
//           arr[i].paint(null, window.globalState.unit_size, window.globalState.secondaryColor);
//         } else {
//           arr.splice(i, 1);
//         }

//       }
//       if (arr !== []) {
//         arr = arr.map((x) => { if (x.dir) { console.log(x[x.dir]); return x[x.dir](); } });
//       }
//       return arr;
//     }

//     async function rec(color, unit, arr, i) {

//       if (i === 1) {
//         unit.paint(null, window.globalState.unit_size, window.globalState.secondaryColor);
//         arr = unit.get_neighbors(1);
//       } else {
//         arr = await paint(arr, color);
//       }
//       if (arr === []) {
//         return;
//       }

//       i++;
//       if (i > 200) {
//         return;
//       }
//       return rec(color, unit, arr, i);
//     }

//     rec(this.color, this.start, Array.of(this.start), 1);
