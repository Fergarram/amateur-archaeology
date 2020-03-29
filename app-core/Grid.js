class Grid {

	constructor() {
		this.world = null;
		this.entities = null;
		this.global_x = 576;
		this.global_y = 192;
		this.size = 32;
		this.gridList = [];
		this.timePassed = 0; // Milliseconds
	}

	reset() {
		this.gridList = [];
		this.addBlock(0, 0, 'dirt');
		this.addBlock(1, 0, 'dirt');
		this.addBlock(2, 0, 'dirt');
		this.addBlock(3, 0, 'air');
		this.addBlock(3, 1, 'dirt');
		this.addBlock(4, 0, 'dirt');
		this.addBlock(5, 0, 'dirt');
		this.addBlock(6, 0, 'dirt');
		this.randomizeLine(3);
	}

	addBlock(x, y, type) {
		if (x < 0 || x > 6) type = 'hard';
		this.gridList.push({
			type: type,
			x: x,
			y: y
		});
	}

	getBlockType(x, y) {
		if (y < 0)
			return null;

		for (var i = 0; i < this.gridList.length; i++) {
			if (this.gridList[i].x === x && this.gridList[i].y === y) {
				return this.gridList[i].type;
			}
		}

		return 'empty';
	}

	setBlock(x, y, type) {
		for (var i = 0; i < this.gridList.length; i++) {
			if (this.gridList[i].x === x && this.gridList[i].y === y) {
				this.gridList[i] = {
					type: type,
					x: x,
					y: y
				};

				if (type === 'bad_dirt') {
					return;
				}

				const typeBelow = this.getBlockType(x, y + 1);
				const typeAbove = this.getBlockType(x, y - 1);
				const typeAtRight = this.getBlockType(x + 1, y);
				const typeAtLeft = this.getBlockType(x - 1, y);

				// Check if surrounding empty blocks need replacement
				if (typeBelow === 'empty') this.addBlock(x, y + 1, 'dirt');
				if (typeAbove === 'empty') this.addBlock(x, y - 1, 'dirt');
				if (typeAtRight === 'empty') this.addBlock(x + 1, y, 'dirt');
				if (typeAtLeft === 'empty') this.addBlock(x - 1, y, 'dirt');

				// Check if foe blocks need bad dirt replacement
				if (typeBelow === 'foe') this.setBlock(x, y + 1, 'bad_dirt');
				if (typeAbove === 'foe') this.setBlock(x, y - 1, 'bad_dirt');
				if (typeAtRight === 'foe') this.setBlock(x + 1, y, 'bad_dirt');
				if (typeAtLeft === 'foe') this.setBlock(x - 1, y, 'bad_dirt');

				if (type === 'air') {
					let treasureAbove = typeAbove ? typeAbove.indexOf('treasure') !== -1 : false;
					let treasureBelow = typeBelow ? typeBelow.indexOf('treasure') !== -1 : false;
					let treasureAtRight = typeAtRight ? typeAtRight.indexOf('treasure') !== -1 : false;
					let treasureAtLeft = typeAtLeft ? typeAtLeft.indexOf('treasure') !== -1 : false;
					
					if (treasureAbove) {
						this.setBlock(x, y - 1, 'air');
						this.entities.create(x, y - 1, typeAbove);
					}

					if (treasureBelow) {
						this.setBlock(x, y + 1, 'air');
						this.entities.create(x, y + 1, typeBelow);
					}
		
					if (treasureAtLeft) {
						this.setBlock(x - 1, y, 'air');
						this.entities.create(x - 1, y, typeAtLeft);
					}
		
					if (treasureAtRight) {
						this.setBlock(x + 1, y, 'air');
						this.entities.create(x + 1, y, typeAtRight);
					}
				}

				return;
			}
		}

		this.addBlock(x, y, type);
	}

	updateGrid(player_y) {
		this.gridList = this.gridList.filter(block => block.y >= player_y - 4);
		this.randomizeLine(player_y + 5);
	}

	randomizeLine(laneY) {
		for (let x = 0; x < 7; x++) {
			// Roll the dice for dirt
			let dice = Math.random() * 100;
			if (dice <= 7) {
				// Roll again for treasure
				dice = Math.floor(Math.random() * 100);
				
				if (dice <= 20) {
					this.setBlock(x, laneY, 'treasure2');

				} else if (dice > 20 && dice <= 40) {
					this.setBlock(x, laneY, 'treasure4');

				} else if (dice > 40 && dice <= 60) {
					this.setBlock(x, laneY, 'treasure0');
					
				} else if (dice > 60 && dice <= 80) {
					this.setBlock(x, laneY, 'treasure1');
					
				} else if (dice > 80 && dice <= 85) {
					this.setBlock(x, laneY, 'treasure5');
					
				} else if (dice > 85 && dice <= 90) {
					this.setBlock(x, laneY, 'treasure3');					

				} else if (dice > 95 && dice <= 100) {
					this.setBlock(x, laneY, 'treasure6');
				}
			} else if (dice > 7 && dice < 10) {
				this.setBlock(x, laneY, 'foe');
			}
		}
	}

	draw(CanvasHelper) {
		if (this.gridList.length < 1)
			return;

		// Draw air first
		for (var i = 0; i < this.gridList.length; i++) {
			const isAir = this.gridList[i].type === 'air'
			const isTreasure = this.gridList[i].type.indexOf('treasure') !== -1;
			if (isAir || isTreasure) {

				const x = this.world.x + this.global_x + this.gridList[i].x * this.size;
				const y = this.world.y + this.global_y + this.gridList[i].y * this.size;

				if (isAir) {
					CanvasHelper.drawSquare([0.721, 0.768, 0.831, 1], x-1, y-1, 34);
				} else {
					CanvasHelper.drawSquare([0.721, 0.768, 0.831, 1], x, y, 32);
				}

				// Debug
				if (window.DEBUG) {
					CanvasHelper.drawText(`(${this.gridList[i].x}, ${this.gridList[i].y})`, x, y);
				}
			}
		}

		// Then everything else
		for (var i = 0; i < this.gridList.length; i++) {
			if (this.gridList[i].type === 'air') {
				continue;
			}
			
			const x = this.world.x + this.global_x + this.gridList[i].x * this.size;
			const y = this.world.y + this.global_y + this.gridList[i].y * this.size;
			
			if (this.gridList[i].type.indexOf('treasure') !== -1) {
				CanvasHelper.drawImage(this.gridList[i].type, x, y);
			}

			if (this.gridList[i].type === 'dirt' || this.gridList[i].type === 'hard') {
				CanvasHelper.drawImage('dirt', x, y);
			}

			// Debug only!
			if (this.gridList[i].type === 'foe') {
				CanvasHelper.drawSquare([1, 0, 0, 1], x + 15, y + 15, 2);
			}

			if (this.gridList[i].type === 'bad_dirt') {
				CanvasHelper.drawImage('dirt', x, y);
				CanvasHelper.drawSquare([1, 0, 0, 1], x + 15, y + 15, 2);
			}

			// Debug
			if (window.DEBUG) {
				CanvasHelper.drawText(`(${this.gridList[i].x}, ${this.gridList[i].y})`, x, y);
			}
		}
	}
}

export default new Grid();