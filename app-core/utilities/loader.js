class AssetLoader {
	constructor() {
		this.eventTarget = document.createElement('div'); // Workaround for KaiOS issue.
		this.images = {};
		this.imageFiles = {
			dig: 'assets/dig.png',
			dirt: 'assets/dirt.png',
			fire: 'assets/fire.png',
			idle: 'assets/idle.png',
			move: 'assets/move.png',
			scorpion: 'assets/scorpion.png',
			sky: 'assets/sky.png',
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
			this.eventTarget.addEventListener('allimagesloaded', () => resolve());
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
			    	this.eventTarget.dispatchEvent(new Event('allimagesloaded'));
			    }
			}
		}
	}	
}

const loader = new AssetLoader();
export default loader;