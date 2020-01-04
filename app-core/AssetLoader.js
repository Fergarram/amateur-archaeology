class AssetLoader {
	constructor() {
		this.images = {};
		this.imageFiles = {
			dig_right: 'assets/dig.png',
			idle_right: 'assets/idle.png',
			move_right: 'assets/move.png',
			move_left: 'assets/move_left.png',
			idle_left: 'assets/idle_left.png',
			dirt: 'assets/dirt.png',
			fire: 'assets/fire.png',
			scorpion: 'assets/scorpion.png',
			sky: 'assets/sky.png',
			ground: 'assets/ground.png',
			treasure0: 'assets/treasure0.png',
			treasure1: 'assets/treasure1.png',
			treasure2: 'assets/treasure2.png',
			treasure3: 'assets/treasure3.png',
			treasure4: 'assets/treasure4.png',
			treasure5: 'assets/treasure5.png',
			treasure6: 'assets/treasure6.png'
		};
		this.soundsFiles = {};
	}

	load() {
		this.loadImages();
		// this.loadSounds();

		let imagesLoaded = new Promise((resolve, reject) => {
			document.addEventListener('allimagesloaded', () => resolve());
		});
		let soundsLoaded = Promise.resolve('NONE'); // TEMP

		return Promise.all([imagesLoaded, soundsLoaded]);
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