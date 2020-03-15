class Game {
    
    constructor() {
        this.ui = null;
        this.player = null;
        this.grid = null;
        this.transition = null;
        this.treasures = null;
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

    endLevel() {
        this.transition.moveIn(() => {
            this.player.reset();
            this.grid.reset();
            this.treasures.reset();
            this.freeze = false;
            // Reset time and score...
            // this.level += 1;
            // this.goal = ...;
            // this.maxTime = ...
            this.remainingTime = this.maxTime;
            this.score = 0;
    
            // Show UI
            this.ui.isActive = false;
            this.ui.updateScore(this.score, this.goal);
            this.ui.updateTime(this.remainingTime, this.maxTime);
            this.transition.moveOut(() => {
                this.ui.show();
            });
        });
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
                    setTimeout(() => this.endLevel(), 1000);
                }

                this.ui.updateTime(this.remainingTime, this.maxTime);
            }
        }
    }
}

export default new Game();