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
	}

	addBlock(x, y, type) {
		this.gridList.push({
			type: type,
			x: x,
			y: y
		});
	}

	getBlockType(x, y) {
		for (var i = 0; i < this.gridList.length; i++) {
			if (this.gridList[i].x === x && this.gridList[i].y === y) {
				return this.gridList[i].type;
			}
		}

		return null;
	}

	setBlock(x, y, type) {
		for (var i = 0; i < this.gridList.length; i++) {
			if (this.gridList[i].x === x && this.gridList[i].y === y) {
				this.gridList[i] = {
					type: type,
					x: x,
					y: y
				};
				break;

			} else {
				this.addBlock(x, y, type);
				break;
			}
		}
	}

	update(delta) {

	}

	draw(CanvasHelper) {

		if (this.gridList.length < 1)
			return;

		for (var i = 0; i < this.gridList.length; i++) {

			const x = this.world.x + this.global_x + this.gridList[i].x * 32;
			const y = this.world.y + this.global_y + this.gridList[i].y * 32;

			if (this.gridList[i].type === 'dirt') {
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