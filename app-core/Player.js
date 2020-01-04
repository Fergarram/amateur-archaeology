import { easeLinear } from './Utilities.js';

class Player {

	constructor() {
		this.grid_x = 3;
		this.grid_y = 0;
		this.grid_size = 32;
		this.grid_startx = 576;
		this.grid_starty = 192;
		this.x = this.grid_startx + this.grid_x * this.grid_size;
		this.y = this.grid_starty + this.grid_y * this.grid_size;
		this.dx = this.x;
		this.dy = this.y;
		this.movingTime = 0; // Milliseconds
		this.dir = 'right';
		this.speed = 0.5 // Seconds - More means slower
		this.isMoving = false;
		this.lastKeyPressed = false;
	}

	init() {

	}

	update(delta) {

		// Move right
		if (this.dir === 'right') {

			if (this.x < this.dx) {
				this.isMoving = true;
				this.movingTime += delta;
				this.x += easeLinear(this.movingTime / 1000, 0, this.grid_size, this.speed);
			}

			if (this.x >= this.dx) {
				this.x = this.dx;
				this.movingTime = 0;
				this.isMoving = false;
				
				if (this.lastKeyPressed === 'left') {
					this.dir = 'left';
				}
			}

		// Move left
		} else if (this.dir === 'left') {
			
			if (this.x > this.dx) {
				this.isMoving = true;
				this.movingTime += delta;
				this.x -= easeLinear(this.movingTime / 1000, 0, this.grid_size, this.speed);
			
			}

			if (this.x <= this.dx) {
				this.x = this.dx;
				this.movingTime = 0;
				this.isMoving = false;

				if (this.lastKeyPressed === 'right') {
					this.dir = 'right';
				}
			}
		}

	}

	draw(World, CanvasHelper, AssetLoader) {
		if (this.dir === 'left')
			CanvasHelper.drawAndScale(AssetLoader.images.idle_left, World.x + this.x, World.y + this.y);
		else
			CanvasHelper.drawAndScale(AssetLoader.images.idle, World.x + this.x, World.y + this.y);
	}

	onKeyDown(key) {

		// Move left
		if (key === '4' || key === 'ArrowLeft') {
			this.lastKeyPressed = 'left';

			if (!this.isMoving) {
				this.dir = 'left';
				this.movingTime = 0;
				this.dx = this.x - this.grid_size;
			}
		}

		// Move right
		if (key === '6' || key === 'ArrowRight') {
			this.lastKeyPressed = 'right';

			if (!this.isMoving) {
				this.dir = 'right';
				this.movingTime = 0;
				this.dx = this.x + this.grid_size;
			}
		}

		// Dig straight
		if (key === '5' || key === 'Enter') {

		}

		// Dig down
		if (key === '8' || key === 'ArrowDown') {

		}
	}
}

export default new Player();