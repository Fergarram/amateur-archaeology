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
			treasure6: 'assets/treasure6.png'
		};
		this.soundFiles = {
			dig: 'assets/snd_dig.wav',
			good: 'assets/snd_good.wav',
			hurt: 'assets/snd_hurt.wav',
			step: 'assets/snd_step.wav'
		};
		this.globalVolume = 0.8;
	}

	playSound(name) {
		this.sounds[name].currentTime = 0;
		this.sounds[name].volume = 1 * this.globalVolume;
		this.sounds[name].play();
	}

	turnVolumeUp() {
		if (this.globalVolume < 1)
			this.globalVolume += 0.1;
	}

	turnVolumeDown() {
		if (this.globalVolume > 0)
			this.globalVolume -= 0.1;
	}

	load() {
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

	loadSounds() {
		const noSounds = Object.keys(this.soundFiles).length;
		let loadedSoundsCount = 0;

		for (const sound in this.soundFiles) {
			this.sounds[sound] = new Audio(this.soundFiles[sound]);
			setTimeout(() => {
				this.sounds[sound].currentTime = 0;
				loadedSoundsCount += 1;
			    if (loadedSoundsCount === noSounds) {
			    	// Finished loading all of them!
			    	document.dispatchEvent(new Event('allsoundsloaded'));
			    }
			}, 100) // WARNING: This asumes short sounds!
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