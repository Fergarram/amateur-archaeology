import AssetLoader from './AssetLoader.js';
import CanvasHelper from './CanvasHelper.js'
import Grid from './Grid.js';
import World from './World.js'

class AppCore {

	init() {
		window.onload = () => {
			AssetLoader.load().then(() => {

				// Initialize canvas helper
				CanvasHelper.init();
				CanvasHelper.showFPS = true;

				// Initialize keyboard event handler
				document.addEventListener('keydown', this.keyboardEventHandler);

				// Randomize the grid
				Grid.addBlock(0, 0, 'dirt');

				// Start the main loop
				CanvasHelper.loop(this.update, this.draw);
			});
		};
	}

	update(delta) {
		World.update(delta)
		Grid.update(delta);
	}

	draw() {
		World.draw(CanvasHelper, AssetLoader);
		Grid.draw(World, CanvasHelper, AssetLoader);
	}

	keyboardEventHandler(event) {
		event.preventDefault();
	    console.log('Key: ' + event.key);

	    if (event.key === 'Backspace') {
		    World.restart(); 	
	    }
	}
}

export default new AppCore();