import AssetLoader from './utilities/loader.js';

class App {
	init() {
		window.onload = () => {
			AssetLoader.load().then(() => {

				document.addEventListener('keydown', event => {
				    event.preventDefault();
				    console.log('Key: ' + event.key);
				});

				const screen = document.getElementById('screen');

				const canvas = document.createElement('canvas');
				canvas.id = 'MainCanvas';
				canvas.style.backgroundColor = 'black';
				canvas.width = 240;
				canvas.height = 320;
				canvas.style.zIndex = 8;
				canvas.style.position = 'absolute';
				screen.appendChild(canvas);

				const ctx = canvas.getContext('2d');
				ctx.mozImageSmoothingEnabled = false;
				ctx.webkitImageSmoothingEnabled = false;

			    ctx.drawImage(AssetLoader.images.sky, 
			    			  0, 0, 
			    			  AssetLoader.images.sky.width*2,
			    			  AssetLoader.images.sky.height*2);

			});
		};
	}
}
const app = new App();
export default app;