class Grid {

	constructor() {
		this.global_x = 568;
		this.global_y = 192;
		this.gridList = [];
		this.timePassed = 0; // Milliseconds
	}

	addBlock(x, y, type) {
		// TYPES:
		// 1. air
		// 2. black
		// 3. treasure
		// 4. foe
		// 5. dirt

		this.gridList.push({
			type: type,
			x: 0,
			y: 0
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

			CanvasHelper.drawAndScale(AssetLoader.images.dirt, x, y);
		}
	}
}

export default new Grid();