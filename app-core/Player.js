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
		this.dx = 0;
		this.dy = 0;
		this.movingTime = 0; // Milliseconds
		this.dir = 'right'; 
	}

	init() {

	}

	update(delta) {

		// Move right
		if (this.x < this.dx && this.dir === 'right') {
			this.movingTime += delta;
			this.x += easeLinear(this.movingTime / 1000, 0, this.grid_size, 0.3);
			if (this.x > this.dx) {
				this.x = this.dx;
				this.movingTime = 0;
			}
		
		// Move left
		} else if (this.x > this.dx && this.dir === 'left') {
			this.movingTime += delta;
			this.x -= easeLinear(this.movingTime / 1000, 0, this.grid_size, 0.3);
			if (this.x < this.dx) {
				this.x = this.dx;
				this.movingTime = 0;
			}
		}

	}

	draw(World, CanvasHelper, AssetLoader) {
		CanvasHelper.drawAndScale(AssetLoader.images.idle, World.x + this.x, World.y + this.y);
	}

	onKeyDown(key) {

		// Move left
		if (key === 'ArrowLeft') {
			this.movingTime = 0;
			this.dir = 'left';
			this.dx = this.x - this.grid_size;
		}

		// Move right
		if (key === 'ArrowRight') {
			this.movingTime = 0;
			this.dir = 'right';
			this.dx = this.x + this.grid_size;
		}

		// Dig straight
		if (key === '5' || key === 'Enter') {
			
		}
		
		// Dig down
		if (key === 'ArrowDown') {
			
		}
	}
}

export default new Player();