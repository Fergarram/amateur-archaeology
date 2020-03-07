class Grid {

	constructor() {
		this.world = null;
		this.global_x = 576;
		this.global_y = 192;
		this.gridList = [];
		this.timePassed = 0; // Milliseconds
		// TYPES:
		// 1. air
		// 2. dirt
		// 3. foe
		// 4. treasureN
		// 5. empty
		// 6. null
		// 7. hard
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

				const typeBelow = this.getBlockType(x, y + 1);
				const typeAbove = this.getBlockType(x, y - 1);
				const typeAtRight = this.getBlockType(x + 1, y);
				const typeAtLeft = this.getBlockType(x - 1, y);

				// Check if surrounding empty blocks need replacement
				if (typeBelow === 'empty') this.addBlock(x, y + 1, 'dirt');
				if (typeAbove === 'empty') this.addBlock(x, y - 1, 'dirt');
				if (typeAtRight === 'empty') this.addBlock(x + 1, y, 'dirt');
				if (typeAtLeft === 'empty') this.addBlock(x - 1, y, 'dirt');

				if (type === 'air') {
					let treasureAbove = typeAbove ? typeAbove.indexOf('treasure') !== -1 : false;
					let treasureBelow = typeBelow ? typeBelow.indexOf('treasure') !== -1 : false;
					let treasureAtRight = typeAtRight ? typeAtRight.indexOf('treasure') !== -1 : false;
					let treasureAtLeft = typeAtLeft ? typeAtLeft.indexOf('treasure') !== -1 : false;
					
					if (treasureAbove) {
						if (this.getBlockType(x, y - 2) === 'empty') this.addBlock(x, y - 2, 'dirt');
						if (this.getBlockType(x + 1, y - 1) === 'empty') this.addBlock(x + 1, y - 1, 'dirt');
						if (this.getBlockType(x - 1, y - 1) === 'empty') this.addBlock(x - 1, y - 1, 'dirt');
					}

					if (treasureBelow) {
						if (this.getBlockType(x, y + 2) === 'empty') this.addBlock(x, y + 2, 'dirt');
						if (this.getBlockType(x + 1, y + 1) === 'empty') this.addBlock(x + 1, y + 1, 'dirt');
						if (this.getBlockType(x - 1, y + 1) === 'empty') this.addBlock(x - 1, y + 1, 'dirt');
					}
		
					if (treasureAtLeft) {
						if (this.getBlockType(x - 1, y + 1) === 'empty') this.addBlock(x - 1, y + 1, 'dirt');
						if (this.getBlockType(x - 1, y - 1) === 'empty') this.addBlock(x - 1, y - 1, 'dirt');
						if (this.getBlockType(x - 2, y) === 'empty') this.addBlock(x - 2, y, 'dirt');
					}
		
					if (treasureAtRight) {
						if (this.getBlockType(x + 1, y + 1) === 'empty') this.addBlock(x + 1, y + 1, 'dirt');
						if (this.getBlockType(x + 1, y - 1) === 'empty') this.addBlock(x + 1, y - 1, 'dirt');
						if (this.getBlockType(x + 2, y) === 'empty') this.addBlock(x + 2, y, 'dirt');
					}
				}

				return;
			}
		}

		this.addBlock(x, y, type);
	}

	reCalculate(player_y) {
		// This method is executed everytime the player moves one block down.
		
		// Clean the previous blocks above which are not visible
		this.gridList = this.gridList.filter(block => block.y >= player_y - 4);
		
		// player_y + 4 is the bottom-most visible block position.
		// Thus, we need to add the player_y + 5 to make this seamless.
		// Let's do this lane-by-lane.
		this.randomizeLane(player_y + 5);
	}

	randomizeLane(laneY) {
		for (let x = 0; x < 7; x++) {
			// Roll the dice for dirt
			let dice = Math.random() * 100;
			if (dice <= 7) {
				// Roll again for treasure
				dice = Math.floor(Math.random() * 100);
				
				if (dice <= 20) {
					this.setBlock(x, laneY, `treasure2`);

				} else if (dice > 20 && dice <= 40) {
					this.setBlock(x, laneY, `treasure4`);

				} else if (dice > 40 && dice <= 60) {
					this.setBlock(x, laneY, `treasure0`);
					
				} else if (dice > 60 && dice <= 80) {
					this.setBlock(x, laneY, `treasure1`);
					
				} else if (dice > 80 && dice <= 90) {
					this.setBlock(x, laneY, `treasure5`);
					
				} else if (dice > 90 && dice <= 100) {
					this.setBlock(x, laneY, `treasure3`);					
				}
			}
		}
	}

	draw(CanvasHelper) {
		if (this.gridList.length < 1)
			return;

		// Draw air first
		for (var i = 0; i < this.gridList.length; i++) {
			if (this.gridList[i].type === 'air') {

				const x = this.world.x + this.global_x + this.gridList[i].x * 32;
				const y = this.world.y + this.global_y + this.gridList[i].y * 32;
				CanvasHelper.drawRect('#B8C4D4', x-1, y-1, 34, 34);

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
			
			const x = this.world.x + this.global_x + this.gridList[i].x * 32;
			const y = this.world.y + this.global_y + this.gridList[i].y * 32;
			
			if (this.gridList[i].type.indexOf('treasure') !== -1) {
				CanvasHelper.drawImage(this.gridList[i].type, x, y);
			}

			if (this.gridList[i].type === 'dirt' || this.gridList[i].type === 'hard') {
				CanvasHelper.drawImage('dirt', x, y);
			}

			// Debug
			if (window.DEBUG) {
				CanvasHelper.drawText(`(${this.gridList[i].x}, ${this.gridList[i].y})`, x, y);
			}
		}
	}
}

export default new Grid();