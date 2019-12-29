import { easeInOutQuint } from './Utilities.js'

class World {
	
	constructor() {
		this.sky_x = 0;
		this.skyDistance = 240;
		this.grid_startx = 568;
		this.ground_y = 192;
		this.x = 0;
		this.y = 0;
		this.timePassed = 0; // Miliseconds
	}

	update(delta) {

		// Move world
		if (this.x > -this.grid_startx) {
			this.timePassed += delta;
			this.x = -easeInOutQuint(this.timePassed / 1000, 0, this.grid_startx, 10);
		}

		// Move sky (parallax)
		if (this.sky_x > -this.skyDistance) {
			this.timePassed += delta;
			this.sky_x = -easeInOutQuint(this.timePassed / 1000, 0, this.skyDistance, 10);
		}
	}

	draw(CanvasHelper, AssetLoader) {
		CanvasHelper.drawAndScale(AssetLoader.images.sky, this.sky_x, 0);
		CanvasHelper.drawAndScale(AssetLoader.images.ground, this.x, this.ground_y);
	};

	restart() {
    	this.sky_x = 0;
    	this.x = 0;
    	this.timePassed = 0;
	}
}

export default new World();