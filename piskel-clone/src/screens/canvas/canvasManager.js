export default class canvasManager {
    constructor(width, height, canvas) {
        this.unit_width = width;
        this.unit_height = height;
        this.canvas = canvas;
        this.constructCanvas();
    }

    constructCanvas() {
        this.unit_size = window.devicePixelRatio;
        this.width = this.unit_width * this.unit_size;
        this.height = this.unit_height * this.unit_size;
        this.canvas.style.setProperty('--i', this.unit_width);
        this.canvas.style.setProperty('--w', parseInt(getComputedStyle(this.canvas).width) - parseInt(getComputedStyle(this.canvas).borderLeftWidth) - parseInt(getComputedStyle(this.canvas).borderRightWidth) + 'px');
    }

    getCanvasPoint(pageX, pageY) {
        let rect = this.canvas.getBoundingClientRect();
        let canvasX;
        let canvasY;
        if (pageX >= rect.width + rect.left) {
            canvasX = rect.width + rect.left;
        } else if (pageX <= rect.left) {
            canvasX = rect.left;
        } else {
            canvasX = pageX - rect.left;
        }
        if (pageY >= rect.height + rect.top) {
            canvasY = rect.height + rect.top;
        } else if (pageY <= rect.top) {
            canvasY = rect.top;
        } else {
            canvasY = pageY - rect.top;
        }
        return { canvasX: canvasX, canvasY: canvasY };
    }

    findUnit(canvasX, canvasY) {
        let rect = this.canvas.getBoundingClientRect();
        let unitX;
        let unitY;
        unitX = Math.floor(canvasX / rect.width * this.unit_width);

        unitY = Math.floor(canvasY / rect.height * this.unit_height);
        return { unitX: unitX, unitY: unitY };
    }

    pointedUnit(pageX, pageY) {
        let XY = this.getCanvasPoint(pageX, pageY);
        return this.findUnit(XY.canvasX, XY.canvasY);
    }

    getUnit(unitX, unitY) {
        return new canvasUnit(this, unitX, unitY);
    }
}

export class canvasUnit {
    construct(canvasManager, unitX, unitY) {
        this.d_x = unitX;
        this.d_y = unitY;
        this.manager = canvasManager;
        Object.defineProperty(this, "unitX", { set: function (x) { reconfigurePixels(); this.unitX = x; } });
        Object.defineProperty(this, "unitY", { set: function (y) { reconfigurePixels(); this.unitY = y; } });
        this.reconfigurePixels();
    }

    get
        south() {
        return new canvasUnit(this.manager, d_x, d_y - this.manager.unit_size);
    }

    north() {
        return new canvasUnit(this.manager, d_x, d_y + this.manager.unit_size);
    }

    west() {
        return new canvasUnit(this.manager, d_x - this.manager.unit_size, d_y);
    }

    east() {
        return new canvasUnit(this.manager, d_x + this.manager.unit_size, d_y);
    }

    south_west() {
        return new canvasUnit(this.manager, d_x - this.manager.unit_size, d_y - this.manager.unit_size);
    }

    south_east() {
        return new canvasUnit(this.manager, d_x + this.manager.unit_size, d_y - this.manager.unit_size);
    }

    north_west() {
        return new canvasUnit(this.manager, d_x - this.manager.unit_size, d_y + this.manager.unit_size);
    }

    north_east() {
        return new canvasUnit(this.manager, d_x + this.manager.unit_size, d_y + this.manager.unit_size);
    }

    get_neighbors() {
        let neighbors = [];
        neighbors.push(this.west(), this.north_west(), this.north(), this.north_east());
        neighbors.push(this.east(), this.south_east(), this.south(), this.south_west());
        return neighbors;
    }

    reconfigurePixels() {
        this.pixels = canvasManager.canvas.getContext('2d').getImageData(unitX * canvasManager.unit_size, unitY * canvasManager.unit_size, canvasManager.unit_size, canvasManager.unit_size);
    }

    getPixels() {
        return this.pixels;
    }
}
