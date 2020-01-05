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
		// 4. treasure
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

				// Check if surrounding empty blocks need replacement
				if (this.getBlockType(x, y + 1) === 'empty') this.addBlock(x, y + 1, 'dirt');
				if (this.getBlockType(x, y - 1) === 'empty') this.addBlock(x, y - 1, 'dirt');
				if (this.getBlockType(x + 1, y) === 'empty') this.addBlock(x + 1, y, 'dirt');
				if (this.getBlockType(x - 1, y) === 'empty') this.addBlock(x - 1, y, 'dirt');

				return;
			}
		}

		this.addBlock(x, y, type);
	}

	draw(CanvasHelper) {

		if (this.gridList.length < 1)
			return;

		for (var i = 0; i < this.gridList.length; i++) {

			const x = this.world.x + this.global_x + this.gridList[i].x * 32;
			const y = this.world.y + this.global_y + this.gridList[i].y * 32;

			if (this.gridList[i].type === 'dirt' || this.gridList[i].type === 'hard') {
				CanvasHelper.drawImage('dirt', x, y);

			} else if (this.gridList[i].type === 'air') {
				CanvasHelper.drawRect('#B8C4D4', x, y, 32, 32);

			} else {
				CanvasHelper.drawRect('#FF0000', x, y, 32, 32);
			}

			// Debug
			if (window.DEBUG) {
				CanvasHelper.drawText(`(${this.gridList[i].x}, ${this.gridList[i].y})`, x, y);
			}
		}
	}
}

export default new Grid();