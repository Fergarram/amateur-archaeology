import { easeLinear } from './Utilities.js';

class Player {

	constructor() {
		this.world = null;
		this.assets = null;
		this.entities = null;
		this.game = null;
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
		this.last_sprite = 'idle';
		this.canMove = false;
	}

	reset() {
		this.grid_x = 2;
		this.grid_y = -1;
		this.x = this.grid_startx + this.grid_x * this.grid_size;
		this.y = this.grid_starty + this.grid_y * this.grid_size;
		this.dx = this.x;
		this.dy = this.y;
		this.movingTime = 0; // Milliseconds
		this.dir = 'right';
		this.isMoving = false;
		this.isFalling = false;
		this.lastKeyPressed = false;
		this.sprite = 'idle';
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
			this.entities.clean(this.grid_y);
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

		// Camera
		this.world.updateCamera(this.y);
	}

	draw(CanvasHelper) {
		CanvasHelper.drawImage(this.sprite, this.world.x + this.x, this.world.y + this.y, 1, this.dir === 'left');

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
			const foeAtRight = this.grid.getBlockType(this.grid_x + 1, this.grid_y) === 'bad_dirt';
			const foeAtLeft = this.grid.getBlockType(this.grid_x - 1, this.grid_y) === 'bad_dirt';

			if (this.dir === 'right' && dirtAtRight) {
				this.grid.setBlock(this.grid_x + 1, this.grid_y, 'air');
			} else if (this.dir === 'right' && foeAtRight) {
				this.grid.setBlock(this.grid_x + 1, this.grid_y, 'air');
				this.entities.create(this.grid_x + 1, this.grid_y, 'scorpion');
			}

			if (this.dir === 'left' && dirtAtLeft) {
				this.grid.setBlock(this.grid_x - 1, this.grid_y, 'air');
			} else if (this.dir === 'left' && foeAtLeft) {
				this.grid.setBlock(this.grid_x - 1, this.grid_y, 'air');
				this.entities.create(this.grid_x - 1, this.grid_y, 'scorpion');
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
			const foeAtRight = this.grid.getBlockType(this.grid_x + 1, this.grid_y) === 'bad_dirt';
			const foeAtLeft = this.grid.getBlockType(this.grid_x - 1, this.grid_y) === 'bad_dirt';
			const foeAtBottomRight = this.grid.getBlockType(this.grid_x + 1, this.grid_y + 1) === 'bad_dirt' ||
									 this.grid.getBlockType(this.grid_x + 1, this.grid_y + 1) === 'foe';
			const foeAtBottomLeft = this.grid.getBlockType(this.grid_x - 1, this.grid_y + 1) === 'bad_dirt' ||
									this.grid.getBlockType(this.grid_x - 1, this.grid_y + 1) === 'foe';

			if (this.dir === 'right') {
				if (dirtAtRight) {
					this.grid.setBlock(this.grid_x + 1, this.grid_y, 'air');
				}
				if (foeAtRight) {
					this.grid.setBlock(this.grid_x + 1, this.grid_y, 'air');
					this.entities.create(this.grid_x + 1, this.grid_y, 'scorpion');
				}
				if (dirtAtBottomRight) {
					this.grid.setBlock(this.grid_x + 1, this.grid_y + 1, 'air');
				}
				if (foeAtBottomRight) {
					this.grid.setBlock(this.grid_x + 1, this.grid_y + 1, 'air');
					this.entities.create(this.grid_x + 1, this.grid_y + 1, 'scorpion');
				}
			}

			if (this.dir === 'left') {
				if (dirtAtLeft) {
					this.grid.setBlock(this.grid_x - 1, this.grid_y, 'air');
				}
				if (foeAtLeft) {
					this.grid.setBlock(this.grid_x - 1, this.grid_y, 'air');
					this.entities.create(this.grid_x - 1, this.grid_y, 'scorpion');
				}
				if (dirtAtBottomLeft) {
					this.grid.setBlock(this.grid_x - 1, this.grid_y + 1, 'air');
				}
				if (foeAtBottomLeft) {
					this.grid.setBlock(this.grid_x - 1, this.grid_y + 1, 'air');
					this.entities.create(this.grid_x - 1, this.grid_y + 1, 'scorpion');
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

		this.entities.collide(this.grid_x, this.grid_y, (entities) => {
			let playGoodSound = false;
			let playHurtSound = false;
			entities.forEach((t) => {
				switch(t) {
					case 'treasure2':
						this.game.addPoints(15);
						playGoodSound = true;
						break;
					case 'treasure4':
						this.game.addPoints(20);
						playGoodSound = true;
						break;
					case 'treasure0':
						this.game.addPoints(25);
						playGoodSound = true;
						break;
					case 'treasure1':
						this.game.addPoints(30);
						playGoodSound = true;
						break;
					case 'treasure5':
						this.game.addPoints(80);
						playGoodSound = true;
						break;
					case 'treasure3':
						this.game.addPoints(100);
						playGoodSound = true;
						break;
					case 'treasure6':
						this.game.addTime(15);
						playGoodSound = true;
						break;
					case 'scorpion':
						playHurtSound = true;
						this.last_sprite = this.sprite;
						this.sprite = 'hurt';
						this.canMove = false;
						setTimeout(() => {
							this.sprite = this.last_sprite;
							this.canMove = true;
						}, 1000);
						break;
				}
			});
			if (playGoodSound) {
				this.assets.playSound('good');
			}
			if (playHurtSound) {
				this.assets.playSound('hurt');
			}
		});
		
	}
}

export default new Player();