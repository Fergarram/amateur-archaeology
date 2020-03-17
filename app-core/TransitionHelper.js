class TransitionHelper {

    init(gl) {
        this.screen = document.getElementById('screen');
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'TransitionCanvas';
        this.width = 240;
        this.height = 320;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.style.zIndex = 99999999;
        this.canvas.style.position = 'absolute';
        this.screen.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.ctx.imageSmoothingEnabled = false;
        this.ctx.mozImageSmoothingEnabled = false;
        this.ctx.webkitImageSmoothingEnabled = false;
        this.speed = 75;
        this.ctx.transform(1, 0, 0, -1, 0, this.canvas.height);
        this.gl = gl;
    }

    enter(callback) {
        let count = 0;
        this.sampleSize = 4;
        this.inLoop = setInterval(() => {
            if (this.sampleSize > 40) {
                clearInterval(this.inLoop);
                callback();
                return;
            }
            count += 1;
            this.pixelate(this.sampleSize);
            this.darken(count);
            this.sampleSize += 4;
        }, this.speed);
    }

    leave(callback) {
        let count = 10;
        this.sampleSize = 40;
        this.outLoop = setInterval(() => {
            if (this.sampleSize == 0) {
                clearInterval(this.outLoop);
                this.ctx.clearRect(0, 0, this.width, this.height);
                setTimeout(callback, this.speed);
                return;
            }
            this.pixelate(this.sampleSize);
            this.darken(count);
            count -= 1;
            this.sampleSize -= 4;
        }, this.speed);
    }

    darken(count) {
        if (count == 7) {
            this.ctx.fillStyle = 'rgba(0,0,0,0.25)';
            this.ctx.fillRect(0, 0, this.width, this.height);
        }

        if (count == 8) {
            this.ctx.fillStyle = 'rgba(0,0,0,0.50)';
            this.ctx.fillRect(0, 0, this.width, this.height);
        }

        if (count == 9) {
            this.ctx.fillStyle = 'rgba(0,0,0,0.75)';
            this.ctx.fillRect(0, 0, this.width, this.height);
        }

        if (count == 10) {
            this.ctx.fillStyle = 'rgba(0,0,0,1)';
            this.ctx.fillRect(0, 0, this.width, this.height);
        }
    }
    
    pixelate(sampleSize) {
        const width = this.gl.drawingBufferWidth;
        const height = this.gl.drawingBufferHeight;
        const size = width * height * 4;
        const pixels = new Uint8Array(size);
        this.gl.readPixels(0, 0, width, height, this.gl.RGBA, this.gl.UNSIGNED_BYTE, pixels);

        for (let y = 0; y < height + sampleSize; y += sampleSize) {
            for (let x = 0; x < width + sampleSize; x += sampleSize) {
                const offset = (y * width + x) * 4;
                const color = pixels.slice(offset, offset + 4);
                this.ctx.fillStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
                this.ctx.fillRect(x - sampleSize / 2, y - sampleSize / 2, sampleSize, sampleSize);
            }
        }
    }

    clamp(value, min, max){
        return Math.min(Math.max(value, Math.min(min, max)), Math.max(min, max));
    }
}

export default new TransitionHelper();