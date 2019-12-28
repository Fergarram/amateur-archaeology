class App {
	init() {
		window.onload = () => {
			document.addEventListener("keydown", event => {
			    event.preventDefault();
			    console.log('Key: ' + event.key);
			    console.log('Key: ' + event.key);
			});

			const screen = document.getElementById('screen');

			const img = new Image();
			img.src = 'assets/idle.png';

			const canvas = document.createElement('canvas');
			canvas.id = "MainCanvas";
			canvas.width = 240;
			canvas.height = 320;
			canvas.style.zIndex = 8;
			canvas.style.position = "absolute";
			screen.appendChild(canvas);

			const ctx = canvas.getContext("2d");

			img.onload = () => {
			    ctx.drawImage(img, 0, 0);
			}
		};
	}
}
const app = new App();
export default app;