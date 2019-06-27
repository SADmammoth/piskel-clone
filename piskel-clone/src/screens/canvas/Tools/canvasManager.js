
export default class canvasManager {
    constructor(width, height, canvas) {
        this.unit_width = width;
        this.unit_height = height;
        this.canvas = canvas;
        this.constructCanvas();
    }

    constructCanvas() {
        this.canvas.getContext('2d').fillStyle = '#ffffff00';
        this.canvas.getContext('2d').fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.unit_size = this.canvas.width / this.unit_width;
        window.globalState.unit_size = this.unit_size;
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
        let unitX;
        let unitY;
        unitX = Math.floor(canvasX / this.unit_size);
        unitY = Math.floor(canvasY / this.unit_size);
        return { unitX: unitX, unitY: unitY };
    }

    pointedUnit(pageX, pageY) {
        let XY = this.getCanvasPoint(pageX, pageY);
        return this.findUnit(XY.canvasX, XY.canvasY);
    }

    getUnit(unitX, unitY) {
        return new canvasUnit(this, unitX, unitY);
    }

    getPointedUnit(pageX, pageY) {
        let XY = this.getCanvasPoint(pageX, pageY);
        XY = this.findUnit(XY.canvasX, XY.canvasY);
        return this.getUnit(XY.unitX, XY.unitY);
    }

    locateUnit(unitX, unitY) {
        return { canvasX: unitX * this.unit_size, canvasY: unitY * this.unit_size };
    }

    locateThatUnit(canvasUnit) {
        return this.locateUnit(canvasUnit.d_x, canvasUnit.d_y);
    }
}

export class canvasUnit {
    constructor(canvasManager, unitX, unitY, dir) {
        this.d_x = unitX;
        this.d_y = unitY;
        this.manager = canvasManager;
        let XY = this.manager.locateUnit(this.d_x, this.d_y);
        this.center_pixel = { d_x: XY.canvasX + (this.manager.unit_size / 2), d_y: XY.canvasY + (this.manager.unit_size / 2) };
        Object.defineProperty(this, "unitX", { set: function (x) { this.reconfigurePixels(); this.unitX = x; } });
        Object.defineProperty(this, "unitY", { set: function (y) { this.reconfigurePixels(); this.unitY = y; } });
        this.reconfigurePixels();
        this.dir = dir;
        this['south'] = this.south.bind(this);
        this['north'] = this.north.bind(this);
        this['east'] = this.east.bind(this);
        this['west'] = this.west.bind(this);
        this['south_west'] = this.south_west.bind(this);
        this['south_east'] = this.south_east.bind(this);
        this['north_west'] = this.south_west.bind(this);
        this['north_east'] = this.south_east.bind(this);

    }

    south(i) {
        if (this.d_y - i < 0) {
            return null;
        }
        return new canvasUnit(this.manager, this.d_x, this.d_y - i, 'south');
    }

    north(i) {
        if (this.d_y + i > this.manager.unit_height - 1) {
            return null;
        }
        return new canvasUnit(this.manager, this.d_x, this.d_y + i, 'north');
    }

    west(i) {
        if (this.d_x - i < 0) {
            return null;
        }
        return new canvasUnit(this.manager, this.d_x - i, this.d_y, 'west');
    }

    east(i) {
        if (this.d_x + i > this.manager.unit_width - 1) {
            return null;
        }
        return new canvasUnit(this.manager, this.d_x + i, this.d_y, 'east');
    }

    south_west(i) {
        if (this.d_x - i < 0 || this.d_y - i < 0) {
            return null;
        }
        return new canvasUnit(this.manager, this.d_x - i, this.d_y - i, 'south_west');
    }

    south_east(i) {
        if (this.d_x + i > this.manager.unit_width - 1 || this.d_y - i < 0) {
            return null;
        }
        return new canvasUnit(this.manager, this.d_x + i, this.d_y - i, 'south_east');
    }

    'north_west'(i) {
        if (this.d_x - i < 0 || this.d_y + i > this.manager.unit_height - 1) {
            return null;
        }
        return new canvasUnit(this.manager, this.d_x - i, this.d_y + i, 'north_west');
    }

    north_east(i) {
        if (this.d_x + i > this.manager.unit_width - 1 || this.d_y + i > this.manager.unit_height - 1) {
            return null;
        }
        return new canvasUnit(this.manager, this.d_x + i, this.d_y + i, 'north_east');
    }

    get_neighbors(i) {
        let neighbors = [];
        neighbors.push(this.west(i), this.north_west(i), this.north(i), this.north_east(i));
        neighbors.push(this.east(i), this.south_east(i), this.south(i), this.south_west(i));
        return neighbors;
    }

    reconfigurePixels() {
        let XY = this.manager.locateUnit(this.d_x, this.d_y);
        this.pixels = this.manager.canvas.getContext('2d').getImageData(XY.canvasX, XY.canvasY, this.manager.unit_size, this.manager.unit_size);
    }

    getColor() {
        let XY = this.manager.locateUnit(this.d_x, this.d_y);
        this.pixels = this.manager.canvas.getContext('2d').getImageData(XY.canvasX, XY.canvasY, this.manager.unit_size, this.manager.unit_size);
        let data = this.pixels.data;
        if (data[3] < 255) {

            return null;
        }
        return `${data[0]}${data[1]}${data[2]}`;
    }

    getPixels() {
        return this.pixels;
    }

    paint(path, width, color) {
        let XY = this.manager.locateUnit(this.d_x, this.d_y);
        if (path === null) {
            this.manager.canvas.getContext('2d').fillStyle = color;
            this.manager.canvas.getContext('2d').rect(XY.canvasX, XY.canvasY, width, width);
            this.manager.canvas.getContext('2d').fill();
        } else {
            path.rect(XY.canvasX, XY.canvasY, width, width);
            this.manager.canvas.getContext('2d').fill(path);
        }
        this.painted = true;
    }
}
