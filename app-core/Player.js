import { easeLinear } from './Utilities.js';
import AssetLoader from './AssetLoader.js';

class Player {

	constructor() {
		this.world = null;
		this.assets = null;
		this.treasures = null;
		this.grid = null;
		this.grid_x = 2;
		this.grid_y = -1;
		this.grid_size = 32;
		this.grid_startx = 576;
		this.grid_starty = 192;
		this.x = this.grid_startx + this.grid_x * this.grid_size;
		this.y = this.grid_starty + this.grid_y * this.grid_size;
		this.dx = this.x;
		this.dy = this.y;
		this.movingTime = 0; // Milliseconds
		this.dir = 'right';
		this.speed = 0.5 // Seconds? - More means slower
		this.isMoving = false;
		this.isFalling = false;
		this.lastKeyPressed = false;
		this.sprite = 'idle';
		this.gameStarted = false;
		this.canMove = false;
	}

	update(delta) {

		// Gravity
		if (this.y < this.dy) {
			this.isFalling = true;
			this.sprite = 'move';
			this.movingTime += delta;
			this.y += easeLinear(this.movingTime / 1000, 0, this.grid_size, this.speed);
		}

		if (this.y >= this.dy && this.isFalling) {
			this.y = this.dy;
			this.movingTime = 0;
			this.isFalling = false;
			this.sprite = 'idle';
			this.assets.playSound('step');
			this.calculateGridPosition();

			// Updating the grid and treasure lists for clean up, etc.
			this.grid.updateGrid(this.grid_y);
			this.treasures.clean(this.grid_y);
		}

		// Move right
		if (this.dir === 'right') {

			if (this.x < this.dx) {
				this.isMoving = true;
				this.sprite = 'move';
				this.movingTime += delta;
				this.x += easeLinear(this.movingTime / 1000, 0, this.grid_size, this.speed);
			}

			if (this.x >= this.dx && this.isMoving) {
				this.x = this.dx;
				this.movingTime = 0;
				this.isMoving = false;
				this.sprite = 'idle';

				this.calculateGridPosition();
				
				if (this.lastKeyPressed === 'left') {
					this.dir = 'left';
				}
			}

		// Move left
		} else if (this.dir === 'left') {
			
			if (this.x > this.dx) {
				this.isMoving = true;
				this.sprite = 'move';
				this.movingTime += delta;
				this.x -= easeLinear(this.movingTime / 1000, 0, this.grid_size, this.speed);
			}

			if (this.x <= this.dx && this.isMoving) {
				this.x = this.dx;
				this.movingTime = 0;
				this.isMoving = false;
				this.sprite = 'idle';

				this.calculateGridPosition();

				if (this.lastKeyPressed === 'right') {
					this.dir = 'right';
				}
			}
		}

		// Update sprite
		this.currentImage = `${this.sprite}_${this.dir}`;

		// Camera
		this.world.y = -(this.y - 160);
	}

	draw(CanvasHelper) {
		CanvasHelper.drawImage(this.currentImage, this.world.x + this.x, this.world.y + this.y);

		if (window.DEBUG) {
			const text = `(${this.grid_x}, ${this.grid_y})`;
			CanvasHelper.drawText(text, this.world.x + this.x, this.world.y + this.y);
		}
	}

	onKeyDown(key) {

		if (!this.canMove) {
			return;
		}

		// Move left
		if (key === '4' || key === 'ArrowLeft') {
			this.lastKeyPressed = 'left';

			const canMoveLeft = this.grid.getBlockType(this.grid_x - 1, this.grid_y) === 'air' ||
								this.grid.getBlockType(this.grid_x - 1, this.grid_y) === null;

			if (canMoveLeft) {
				this.assets.playSound('step');
			}

			if (!this.isMoving && !this.isFalling && canMoveLeft) {
				this.dir = 'left';
				this.movingTime = 0;
				this.dx = this.x - this.grid_size
			}

			if (!canMoveLeft || this.isFalling) {
				this.dir = 'left';
			}
		}

		// Move right
		if (key === '6' || key === 'ArrowRight') {
			this.lastKeyPressed = 'right';

			const canMoveRight = this.grid.getBlockType(this.grid_x + 1, this.grid_y) === 'air' ||
								 this.grid.getBlockType(this.grid_x + 1, this.grid_y) === null;

			if (canMoveRight) {
				this.assets.playSound('step');
			}

			if (!this.isMoving && !this.isFalling && canMoveRight) {
				this.dir = 'right';
				this.movingTime = 0;
				this.dx = this.x + this.grid_size;
			}

			if (!canMoveRight || this.isFalling) {
				this.dir = 'right';
			}
		}

		// Dig straight
		if (key === '5' || key === 'Enter') {
			this.assets.playSound('dig');
			this.sprite = 'dig';

			const dirtAtRight = this.grid.getBlockType(this.grid_x + 1, this.grid_y) === 'dirt';
			const dirtAtLeft = this.grid.getBlockType(this.grid_x - 1, this.grid_y) === 'dirt';

			if (this.dir === 'right' && dirtAtRight) {
				this.grid.setBlock(this.grid_x + 1, this.grid_y, 'air');
			}

			if (this.dir === 'left' && dirtAtLeft) {
				this.grid.setBlock(this.grid_x - 1, this.grid_y, 'air');
			}

			setTimeout(() => this.sprite = 'idle', 150);
		}

		// Dig down
		if (key === '8' || key === 'ArrowDown') {
			this.assets.playSound('dig');
			this.sprite = 'dig';

			const dirtAtRight = this.grid.getBlockType(this.grid_x + 1, this.grid_y) === 'dirt';
			const dirtAtLeft = this.grid.getBlockType(this.grid_x - 1, this.grid_y) === 'dirt';
			const dirtAtBottomRight = this.grid.getBlockType(this.grid_x + 1, this.grid_y + 1) === 'dirt' ||
									  this.grid.getBlockType(this.grid_x + 1, this.grid_y + 1) === 'empty';
			const dirtAtBottomLeft = this.grid.getBlockType(this.grid_x - 1, this.grid_y + 1) === 'dirt' ||
									 this.grid.getBlockType(this.grid_x - 1, this.grid_y + 1) === 'empty';

			if (this.dir === 'right') {
				if (dirtAtRight) {
					this.grid.setBlock(this.grid_x + 1, this.grid_y, 'air');
				}
				if (dirtAtBottomRight) {
					this.grid.setBlock(this.grid_x + 1, this.grid_y + 1, 'air');
				}
			}

			if (this.dir === 'left') {
				if (dirtAtLeft) {
					this.grid.setBlock(this.grid_x - 1, this.grid_y, 'air');
				}
				if (dirtAtBottomLeft) {
					this.grid.setBlock(this.grid_x - 1, this.grid_y + 1, 'air');
				}
			}

			setTimeout(() => this.sprite = 'idle', 150);
		}
	}

	calculateGridPosition() {
		this.grid_x = Math.floor((this.x - this.grid_startx) / this.grid_size);
		this.grid_y = Math.floor((this.y - this.grid_starty) / this.grid_size);
		if (this.grid.getBlockType(this.grid_x, this.grid_y + 1) === 'air') {
			if (!this.isFalling) {
				this.movingTime = 0;
				this.dy = this.y + this.grid_size;
			}
		}

		this.treasures.takeTreasures(this.grid_x, this.grid_y, (treasures) => {
			this.assets.playSound('good');
		});
		
	}
}

export default new Player();