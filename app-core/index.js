import HTMLUI from './HTMLUI.js';
import AssetLoader from './AssetLoader.js';
import CanvasHelper from './CanvasHelper.js';
import Grid from './Grid.js';
import World from './World.js';
import Player from './Player.js';

class AppCore {

	init() {
		window.onload = () => {

			HTMLUI.init();

			AssetLoader.load().then(() => {

				// Initialize canvas helper
				CanvasHelper.init(AssetLoader);

				// Initialize keyboard event handler
				document.addEventListener('keydown', this.keyboardEventHandler);

				// Randomize the grid
				Grid.addBlock(0, 0, 'dirt');
				Grid.addBlock(1, 0, 'dirt');
				Grid.addBlock(2, 0, 'dirt');
				Grid.addBlock(3, 0, 'air');
				Grid.addBlock(3, 1, 'dirt');
				Grid.addBlock(4, 0, 'dirt');
				Grid.addBlock(5, 0, 'dirt');
				Grid.addBlock(6, 0, 'dirt');
				Grid.randomizeLane(3);

				// Initialing world
				Player.assets = AssetLoader;
				Player.world = World;
				Player.grid = Grid;
				Grid.world = World;

				// Debugging...
				window.DEBUG = false;
				window.Grid = Grid;
				window.World = World;
				window.Player = Player;
				window.AssetLoader = AssetLoader;


				AssetLoader.playSound('start');
				setTimeout(() => {
					HTMLUI.show();
				}, 5000);

				// Start the main loop
				CanvasHelper.loop(this.update, this.draw);
			});
		};
	}

	update(delta) {
		World.update(delta);
		Player.update(delta);
	}

	draw() {
		World.draw(CanvasHelper);
		Grid.draw(CanvasHelper);
		Player.draw(CanvasHelper);
	}

	keyboardEventHandler(event) {
		event.preventDefault();

		if (HTMLUI.isActive && !Player.canMove) {
			Player.canMove = true;
			HTMLUI.hideDialog();
			// @TODO: Start counting, etc.
			return;
		}

	    Player.onKeyDown(event.key);

		if (event.key === '*' || event.key === 'Control') {
	    	window.DEBUG = !window.DEBUG;
	    }

		if (window.DEBUG) {
		    console.log('Key: ' + event.key);
		}

	    if (event.key === 'Backspace') {
		    location.reload();
	    }

	    if (event.key === '1') {
	    	AssetLoader.turnVolumeDown();
	    }

	    if (event.key === '3') {
	    	AssetLoader.turnVolumeUp();
	    }

	}
}

export default new AppCore();