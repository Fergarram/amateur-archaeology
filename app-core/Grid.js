class Grid {

	constructor() {
		this.global_x = 576;
		this.global_y = 192;
		this.gridList = [];
		this.timePassed = 0; // Milliseconds
	}

	addBlock(x, y, type) {
		// TYPES:
		// 1. air
		// 2. dirt
		// 3. foe
		// 4. treasure

		this.gridList.push({
			type: type,
			x: x,
			y: y
		});
	}

	update(delta) {

	}

	draw(World, CanvasHelper, AssetLoader) {
		
		if (this.gridList.length < 1)
			return;

		for (var i = 0; i < this.gridList.length; i++) {

			const x = World.x + this.global_x + this.gridList[i].x * 32;
			const y = World.y + this.global_y + this.gridList[i].y * 32;

			if (this.gridList[i].type === 'dirt') {
				CanvasHelper.drawAndScale(AssetLoader.images.dirt, x, y);

			} else if (this.gridList[i].type === 'air') {
				CanvasHelper.drawRect('#B8C4D4', x, y, 32, 32);
			} else {
				CanvasHelper.drawRect('#FF0000', x, y, 32, 32);
			}
		}
	}
}

export default new Grid();