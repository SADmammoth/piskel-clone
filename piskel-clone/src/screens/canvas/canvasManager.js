export default class canvasManager {
    constructor(width, height, canvas) {
        this.unit_width = width;
        this.unit_height = height;
        this.canvas = canvas;
    }

    constructCanvas() {
        this.unit_size = window.devicePixelRatio;
        this.width = this.unit_width * this.unit_size;
        this.height = this.unit_height * this.unit_size;
    }

    getCanvasPoint(pageX, pageY, canvasX, canvasY) {
        if (canvasX || canvasY) {
            throw Error(`canvasY and canvasY are return parameters`);
        }
        let rect = this.canvas.getBoundingClientRect();
        if (pageX >= this.width - rect.right) {
            canvasX = this.width - rect.right;
        }

    }
}

export class canvasUnit {
    construct(canvasManager, d_x, d_y) {
        this.d_x = d_x;
        this.d_y = d_y;
        this.manager = canvas_manager;
    }

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
}
