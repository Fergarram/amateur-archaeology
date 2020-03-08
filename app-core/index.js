import UserInterface from './UserInterface.js';
import AssetLoader from './AssetLoader.js';
import CanvasHelper from './CanvasHelper.js';
import Grid from './Grid.js';
import World from './World.js';
import Player from './Player.js';
import Treasures from './Treasures.js';
import Game from './Game.js';

class AppCore {

	init() {
		window.onload = () => {

			UserInterface.init();

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
				Grid.randomizeLine(3);

				// Initialing world
				Grid.world = World;
				Grid.treasures = Treasures;
				Treasures.world = World;
				Treasures.grid = Grid;
				Player.assets = AssetLoader;
				Player.world = World;
				Player.game = Game;
				Player.grid = Grid;
				Player.treasures = Treasures;
				Game.ui = UserInterface;

				// Debugging...
				window.DEBUG = false;
				window.Grid = Grid;
				window.World = World;
				window.Player = Player;
				window.AssetLoader = AssetLoader;
				window.Treasures = Treasures;
				window.Game = Game;

				AssetLoader.playSound('start');
				setTimeout(() => {
					UserInterface.show();
				}, 5000);

				// Start the main loop
				CanvasHelper.loop(this.update, this.draw);
			});
		};
	}

	update(delta) {
		World.update(delta);
		Player.update(delta);
		Treasures.update(delta);
		Game.update(delta);
	}

	draw() {
		World.draw(CanvasHelper);
		Grid.draw(CanvasHelper);
		Treasures.draw(CanvasHelper);
		Player.draw(CanvasHelper);
	}

	keyboardEventHandler(event) {
		event.preventDefault();

		if (UserInterface.isActive && !Player.canMove) {
			Player.canMove = true;
			Game.started = true;
			UserInterface.hideDialog();
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