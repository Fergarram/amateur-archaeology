class TransitionHelper {

    init() {
        
        this.screen = document.getElementById('screen');
        this.mainCanvas = document.getElementById('MainCanvas');
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
        const mctx = this.mainCanvas.getContext('2d');
        const sourceBuffer32 = new Uint32Array(mctx.getImageData(0, 0, this.width, this.height).data.buffer);
        for (let y = 0; y < this.height + sampleSize; y += sampleSize) {
            for (let x = 0; x < this.width + sampleSize; x += sampleSize) {
                const pos = (x + y * this.width);
                const b = (sourceBuffer32[pos] >> 16) & 0xff;
                const g = (sourceBuffer32[pos] >> 8) & 0xff;
                const r = (sourceBuffer32[pos] >> 0) & 0xff;
                const cr = this.clamp(Math.round(r), 0, 255);
                const cg = this.clamp(Math.round(g), 0, 255);
                const cb = this.clamp(Math.round(b), 0, 255);
                this.ctx.fillStyle = `rgb(${cr}, ${cg}, ${cb})`;
                this.ctx.fillRect(x - sampleSize / 2, y - sampleSize / 2, sampleSize, sampleSize);
            }
        }
    }

    clamp(value, min, max){
        return Math.min(Math.max(value, Math.min(min, max)), Math.max(min, max));
    }
}

export default new TransitionHelper();