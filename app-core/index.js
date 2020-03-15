import UserInterface from './UserInterface.js';
import AssetLoader from './AssetLoader.js';
import CanvasHelper from './CanvasHelper.js';
import TransitionHelper from './TransitionHelper.js';
import Grid from './Grid.js';
import World from './World.js';
import Player from './Player.js';
import Treasures from './Treasures.js';
import Game from './Game.js';

class AppCore {

	init() {
		window.onload = () => {

			if (navigator.userAgent.includes('KAIOS')) {
				navigator.requestWakeLock('screen');
			}

			UserInterface.init();

			AssetLoader.load().then(() => {

				// Initialize canvas helper
				CanvasHelper.init(AssetLoader);
				TransitionHelper.init();

				// Initialize keyboard event handler
				document.addEventListener('keydown', this.keyboardEventHandler);

				// Randomize the grid
				Grid.reset();

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
				Game.player = Player;
				Game.grid = Grid;
				Game.treasures = Treasures;
				Game.transition = TransitionHelper;

				// Debugging...
				window.DEBUG = false;
				window.Grid = Grid;
				window.World = World;
				window.Player = Player;
				window.AssetLoader = AssetLoader;
				window.Treasures = Treasures;
				window.Game = Game;
				window.UserInterface = UserInterface;
				window.TransitionHelper = TransitionHelper;

				AssetLoader.playSound('start');
				setTimeout(() => {
					UserInterface.updateScore(Game.score, Game.goal);
					UserInterface.show();
				}, 5000);

				// Start the main loop
				CanvasHelper.loop(this.update, this.draw);
			});
		};
	}

	update(delta) {
		if (Game.freeze) {
			return;
		}
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
			return;
		}

		if (!Game.freeze) {
			Player.onKeyDown(event.key);
		}

		if (event.key === '*' || event.key === 'Control') {
	    	window.DEBUG = !window.DEBUG;
	    }

		if (window.DEBUG) {
		    console.log('Key: ' + event.key);
		}

	    if (event.key === 'Backspace') {
			if (confirm("Are you sure you want to quit the game?")) {
				window.close();
			}
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