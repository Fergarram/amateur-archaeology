import UserInterface from './UserInterface.js';
import AssetLoader from './AssetLoader.js';
import CanvasHelper from './CanvasHelper.js';
import TransitionHelper from './TransitionHelper.js';
import Grid from './Grid.js';
import World from './World.js';
import Player from './Player.js';
import EntityHelper from './EntityHelper.js';
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
				TransitionHelper.init(CanvasHelper.gl);

				// Initialize keyboard event handler
				document.addEventListener('keydown', this.keyboardEventHandler);

				// Randomize the grid
				Grid.reset();

				// Initialing world
				Grid.world = World;
				Grid.entities = EntityHelper;
				EntityHelper.world = World;
				EntityHelper.grid = Grid;
				EntityHelper.assets = AssetLoader;
				EntityHelper.player = Player;
				Player.assets = AssetLoader;
				Player.world = World;
				Player.game = Game;
				Player.grid = Grid;
				Player.entities = EntityHelper;
				Game.ui = UserInterface;
				Game.player = Player;
				Game.grid = Grid;
				Game.entities = EntityHelper;
				Game.assets = AssetLoader;
				Game.transition = TransitionHelper;

				// Preapare the ad
				UserInterface.prepareAd();

				if (process.env.NODE_ENV === 'development') {
					window.Grid = Grid;
					window.World = World;
					window.Player = Player;
					window.AssetLoader = AssetLoader;
					window.CanvasHelper = CanvasHelper;
					window.EntityHelper = EntityHelper;
					window.Game = Game;
					window.UserInterface = UserInterface;
					window.TransitionHelper = TransitionHelper;
				}

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
		EntityHelper.update(delta);
		Game.update(delta);
	}

	draw() {
		World.draw(CanvasHelper);
		Grid.draw(CanvasHelper);
		EntityHelper.draw(CanvasHelper);
		Player.draw(CanvasHelper);
	}

	keyboardEventHandler(event) {
		event.preventDefault();

		if (UserInterface.isActive && !Player.canMove && !Game.started) {
			Player.canMove = true;
			Game.started = true;
			UserInterface.hideDialog();
			return;
		}

		if (!Game.freeze) {
			Player.onKeyDown(event.key);
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

const App = new AppCore();
App.init();