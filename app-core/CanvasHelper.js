class CanvasHelper {

	constructor() {
		this.screen = null;
		this.canvas = null;
		this.assets = null;
		this.ctx = null;
	}

	init(AssetLoader) {
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
		this.assets = AssetLoader;
	}

	loop(update, render) {
		let fps, delta, lastRender = Date.now() - 1;

		const animate = () => {
			delta = Date.now() - lastRender;
		    fps = parseInt(1000/delta);

			update(delta);
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			render();

			// Draw FPS
			if (window.DEBUG) {
				this.ctx.fillStyle = "white";
				this.ctx.font = "12px Arial";
				this.ctx.fillText(`DELTA: ${delta}`, 16, this.canvas.height - 16);
			}

			lastRender = Date.now();
			window.requestAnimationFrame(animate);
		};

		// Start the rendering loop
	    animate();
	}

	drawText(text, x, y, color='#FFFFFF', background="#FF0000") {
		this.ctx.save();
		this.ctx.font = "12px Arial";
		const width = this.ctx.measureText(text).width;
		this.ctx.textBaseline = 'top';
		this.ctx.fillStyle = background;
		this.ctx.fillRect(x, y, width, 12);
		this.ctx.fillStyle = color;
		this.ctx.fillText(text, x, y);
		this.ctx.restore();
	}

	drawRect(color, x, y, w, h) {
		this.ctx.save();
		this.ctx.fillStyle = color;
		this.ctx.fillRect(x, y, w, h);
		this.ctx.restore();
	}

	drawImage(imageName, x, y, s=2) {
		this.ctx.drawImage(this.assets.images[imageName], x, y,
						   this.assets.images[imageName].width*s,
						   this.assets.images[imageName].height*s);
	}

	drawImageAlpha(imageName, x, y, a, s=2) {
		this.ctx.globalAlpha = a;
		this.ctx.drawImage(this.assets.images[imageName], x, y,
			this.assets.images[imageName].width*s,
			this.assets.images[imageName].height*s);
		this.ctx.globalAlpha = 1;
	}
}

export default new CanvasHelper();