import { easeLinear } from './Utilities.js';

class Treasures {
    constructor() {
        this.list = [];
        this.world = null;
        this.grid = null;
        this.speed = 0.1 // Seconds? - More means slower
    }

    create(gx, gy, type) {
        const x = this.world.x + this.grid.global_x + gx * this.grid.size;
        const y = this.world.y + this.grid.global_y + gy * this.grid.size;

        this.list.push({
			type: type,
			grid_x: gx,
            grid_y: gy,
            x: x,
            y: y,
            dx: x,
            dy: y,
            isFalling: false,
            movingTime: 0, // Milliseconds
		});
    }

    reset() {
        this.list = [];
    }

    clean(player_y) {
        this.list = this.list.filter(t => t.grid_y >= player_y - 4);
    }

    takeTreasures(x, y, callback) {
        if (this.list < 1) {
            return;
        }

        const treasures = [];
        for (var i = 0; i < this.list.length; i++) {
			if (this.list[i].grid_x === x && this.list[i].grid_y === y) {
                treasures.push(this.list[i].type);
                this.list[i] = null;
			}
        }

        if (treasures.length > 0) {
            this.list = this.list.filter(t => t !== null);
            callback(treasures);
        }
    }

    update(delta) {
        if (this.list.length < 1)
			return;

		for (var i = 0; i < this.list.length; i++) {
            const blockBelow = this.grid.getBlockType(this.list[i].grid_x, this.list[i].grid_y + 1);
            this.list[i].y = this.world.y + this.grid.global_y + this.list[i].grid_y * this.grid.size;

            if (blockBelow === 'air') {
                if (!this.list[i].isFalling) {
                    this.list[i].movingTime = 0;
                    this.list[i].dy = this.list[i].y + this.grid.size;
                }

                if (this.list[i].y < this.list[i].dy) {
                    this.list[i].isFalling = true;
                    this.list[i].movingTime += delta;
                    this.list[i].y += easeLinear(this.list[i].movingTime / 1000, 0, this.grid.size, this.speed);
                }

                if (this.list[i].y >= this.list[i].dy && this.list[i].isFalling) {
                    this.list[i].y = this.list[i].dy;
                    this.list[i].movingTime = 0;
                    this.list[i].isFalling = false;
                    this.list[i].grid_y += 1;
                }
            }
        }
    }

    draw(CanvasHelper) {
        if (this.list.length < 1)
			return;

		for (var i = 0; i < this.list.length; i++) {
            CanvasHelper.drawImage(this.list[i].type, this.list[i].x, this.list[i].y);
        }
    }
}

export default new Treasures();