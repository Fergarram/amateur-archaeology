class Game {
    
    constructor() {
        this.ui = null;
        this.level = 1;
        this.maxTime = 120; // Seconds
        this.remainingTime = this.maxTime;
        this.goal = 500;
        this.score = 0;
        this.started = false;
        this.elapsedTime = 0;
        this.freeze = false;
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
        if (this.started) {
            this.elapsedTime += delta;

            if (this.elapsedTime >= 1000) {
                this.remainingTime -= 1;
                this.elapsedTime = 0;

                if (this.remainingTime === 0) {
                    this.started = false;
                    this.freeze = true;
                    // Restart game states and increment goals
                    // Or, show death screen and restart game.
                }

                this.ui.updateTime(this.remainingTime, this.maxTime);
            }
        }
    }
}

export default new Game();