class Game {
    
    constructor() {
        this.ui = null;
        this.level = 1;
        this.maxTime = 180;
        this.remainingTime = this.maxTime; // In seconds
        this.goal = 500; // Points
        this.score = 0; // Points
        this.started = false;
        this.elapsedTime = 0;
    }

    addPoints(points) {
        this.score += points;
        this.ui.updateScore(this.score, this.goal);
    }

    addTime(time) {
        if (this.remainingTime + time >= this.maxTime) {
            this.remainingTime = this.maxTime;
        } else {
            this.remainingTime += time;
        }
    }

    update(delta) {
        // delta is the amount of miliseconds that between every frame.
        if (this.started) {
            this.elapsedTime += delta;
            if (this.elapsedTime >= 1000) {
                this.remainingTime -= 1;
                this.elapsedTime = 0;
                if (this.remainingTime === 0) {
                    started = false;
                    // Check if won or lost
                }
                this.ui.updateTime(this.remainingTime, this.maxTime);
            }
        }
    }
}

export default new Game();