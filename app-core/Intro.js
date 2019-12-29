import { easeInOutQuint } from './Utilities.js'

class Intro {

	constructor() {
		this.sky_x = 0;
		this.ground_x = 0;
		this.ground_y = 192;
		this.skyDistance = 240;
		this.timePassed = 0; // Milliseconds
	}

	update(delta) {
		if (this.sky_x > -this.skyDistance) {
			this.timePassed += delta;
			this.sky_x = -easeInOutQuint(this.timePassed / 1000, 0, this.skyDistance, 10);
		}
	}

	draw(World, CanvasHelper, AssetLoader) {
		CanvasHelper.drawAndScale(AssetLoader.images.sky, this.sky_x, 0);
		CanvasHelper.drawAndScale(AssetLoader.images.ground, this.ground_x, this.ground_y);
	};

	restart() {
    	this.sky_x = 0;
    	this.ground_x = 0;
    	this.timePassed = 0;
	}
}

export default new Intro();