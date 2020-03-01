import { easeInOutQuint } from './Utilities.js'

class World {

	constructor() {
		this.sky_x = 0;
		this.skyDistance = 240;
		this.ground_length = 568;
		this.ground_y = 192;
		this.x = 0;
		this.y = 0;
		this.timePassed = 0; // Milliseconds
		this.titleAlpha = 1;
	}

	update(delta) {

		// Move world
		if (this.x > -this.ground_length) {
			this.timePassed += delta;
			this.x = -easeInOutQuint(this.timePassed / 1000, 0, this.ground_length, 10);
		}

		// Move sky (parallax)
		if (this.sky_x > -this.skyDistance) {
			this.timePassed += delta;
			this.sky_x = -easeInOutQuint(this.timePassed / 1000, 0, this.skyDistance, 10);
		}

		// Update title alpha
		if (this.titleAlpha > 0) {
			this.titleAlpha = 1 - easeInOutQuint(this.timePassed / 1000, 0, 1, 10);
		}
	}

	draw(CanvasHelper) {

		// Sky
		CanvasHelper.drawImage('sky', this.sky_x, this.y);
		CanvasHelper.drawImage('dithering', 0, this.y);

		// Title
		if (this.titleAlpha > 0) {
			CanvasHelper.drawImageAlpha('title', 4, this.y + 14, this.titleAlpha);
		}

		// Decorative tiles
		CanvasHelper.drawImage('ground', this.x, this.y + this.ground_y);
		CanvasHelper.drawImage('dirt', this.x + 800, this.y + this.ground_y);
	}
}

export default new World();