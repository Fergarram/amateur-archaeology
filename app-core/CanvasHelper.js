class CanvasHelper {

	constructor() {
		this.screen = null;
		this.canvas = null;
		this.ctx = null;
		this.showFPS = false;
	}

	init() {
		this.screen = document.getElementById('screen');
		this.canvas = document.createElement('canvas');
		this.canvas.id = 'MainCanvas';
		this.canvas.style.backgroundColor = 'black';
		this.canvas.width = 240;
		this.canvas.height = 320;
		this.canvas.style.zIndex = 8;
		this.canvas.style.position = 'absolute';
		this.screen.appendChild(this.canvas);
		this.ctx = this.canvas.getContext('2d');
		this.ctx.imageSmoothingEnabled = false;
		this.ctx.mozImageSmoothingEnabled = false;
		this.ctx.webkitImageSmoothingEnabled = false;
	}

	loop(update, render) {
		let oldTimeStamp = 0;
		let fps, delta, lastRender = Date.now() - 1;

		const animate = (timeStamp) => {
			delta = Date.now() - lastRender;
		    fps = parseInt(1000/delta);

			update(delta);
			
			this.clear();
			
			render();

			// Draw FPS
			if (this.showFPS) {
				this.ctx.fillStyle = "white";
				this.ctx.font = "12px Arial";
				this.ctx.fillText(`FPS: ${fps}`, 16, this.canvas.height - 16);
			}

			lastRender = Date.now();
			window.requestAnimationFrame(animate);
		};

		// Start the rendering loop
	    animate();
	}

	drawAndScale(image, x, y) {
		this.ctx.drawImage(image, x, y, image.width*2, image.height*2);
	}

	clear() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
}

export default new CanvasHelper();