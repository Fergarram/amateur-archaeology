import AssetLoader from './AssetLoader.js';
import CanvasHelper from './CanvasHelper.js';
import Grid from './Grid.js';
import World from './World.js';
import Player from './Player.js';

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
				Grid.addBlock(1, 0, 'dirt');
				Grid.addBlock(2, 0, 'dirt');
				Grid.addBlock(3, 0, 'air');
				Grid.addBlock(4, 0, 'dirt');
				Grid.addBlock(5, 0, 'dirt');
				Grid.addBlock(6, 0, 'dirt');
				Grid.addBlock(3, 1, 'dirt');


				// Start the main loop
				CanvasHelper.loop(this.update, this.draw);
			});
		};
	}

	update(delta) {
		World.update(delta)
		Grid.update(delta);
		Player.update(delta);
	}

	draw() {
		World.draw(CanvasHelper, AssetLoader);
		Grid.draw(World, CanvasHelper, AssetLoader);
		Player.draw(World, CanvasHelper, AssetLoader)
	}

	keyboardEventHandler(event) {
		event.preventDefault();
	    console.log('Key: ' + event.key);

	    if (event.key === 'Backspace') {
		    location.reload();
	    }

	    Player.onKeyDown(event.key);
	}
}

export default new AppCore();