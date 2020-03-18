import { Howler } from './libs/howler.js';

class AssetLoader {
	constructor() {
		this.images = {};
		this.sounds = {};
		this.imageFiles = {
			dig_right: 'assets/dig.png',
			idle_right: 'assets/idle.png',
			move_right: 'assets/move.png',
			dig_left: 'assets/dig_left.png',
			move_left: 'assets/move_left.png',
			idle_left: 'assets/idle_left.png',
			dirt: 'assets/dirt.png',
			fire: 'assets/fire.png',
			scorpion: 'assets/scorpion.png',
			sky: 'assets/sky.png',
			dithering: 'assets/dithering.png',
			ground: 'assets/ground.png',
			treasure0: 'assets/treasure0.png',
			treasure1: 'assets/treasure1.png',
			treasure2: 'assets/treasure2.png',
			treasure3: 'assets/treasure3.png',
			treasure4: 'assets/treasure4.png',
			treasure5: 'assets/treasure5.png',
			treasure6: 'assets/treasure6.png',
			title: 'assets/title.png',
			topbar: 'assets/topbar.png',
			dialog_back: 'assets/dialog_back.png',
			points_suffix: 'assets/points_suffix.png',
			level_prefix: 'assets/level_prefix.png',
			controls: 'assets/controls.png'
		};
		this.soundFiles = {
			start: 'assets/snd_start.wav',
			dig: 'assets/snd_dig.wav',
			good: 'assets/snd_good.wav',
			hurt: 'assets/snd_hurt.wav',
			step: 'assets/snd_step.wav'
		};
	}

	load() {
		const digitFont = new FontFace('AADigits', 'url(assets/aadigits.ttf)');

		digitFont.load().then((loadedFont) => {
			document.fonts.add(loadedFont);
		});

		let imagesLoaded = new Promise((resolve, reject) => {
			document.addEventListener('allimagesloaded', () => resolve());
		});

		let soundsLoaded = new Promise((resolve, reject) => {
			document.addEventListener('allsoundsloaded', () => resolve());
		});

		this.loadImages();
		this.loadSounds();

		return Promise.all([imagesLoaded, soundsLoaded]);
	}

	playSound(name) {
		this.sounds[name].play();
	}

	loadSounds() {
		const noSounds = Object.keys(this.soundFiles).length;
		let loadedSoundsCount = 0;

		for (const name in this.soundFiles) {
			this.sounds[name] = new Howl({ src: [this.soundFiles[name]] });
			this.sounds[name].once('load', () => {
				loadedSoundsCount += 1;
			    if (loadedSoundsCount === noSounds) {
			    	// Finished loading all of them!
			    	document.dispatchEvent(new Event('allsoundsloaded'));
			    }
			});
		}
	}

	loadImages() {
		const noImages = Object.keys(this.imageFiles).length;
		let loadedImageCount = 0;

		for (const image in this.imageFiles) {
			this.images[image] = new Image();
			this.images[image].src = this.imageFiles[image];
			this.images[image].onload = () => {
			    loadedImageCount += 1;
			    if (loadedImageCount === noImages) {
			    	// Finished loading all of them!
			    	document.dispatchEvent(new Event('allimagesloaded'));
			    }
			}
		}
	}
}

export default new AssetLoader();