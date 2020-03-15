class Game {
    
    constructor() {
        this.ui = null;
        this.player = null;
        this.grid = null;
        this.transition = null;
        this.treasures = null;
        this.level = 1;
        this.maxTime = 60; // Seconds
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
        this.transition.enter(() => {
            this.player.reset();
            this.grid.reset();
            this.treasures.reset();
            this.freeze = false;
            

            // Lost
            if (this.goal > this.score) {
                // Go to dead screen.


            // Won, setup new level.
            } else if (this.score >= this.goal) {
                const extraPoints = this.score - this.goal;
                const bonusRatio = extraPoints / this.goal;
                this.maxTime = Math.floor(this.maxTime * (1 + (bonusRatio / 2)));
                this.level += 1;
                this.goal = this.goal * 1.25; // I guess level will do something here?

            }
            
            // Reset anyways
            this.remainingTime = this.maxTime;
            this.score = 0;
    
            // Show UI
            this.ui.isActive = false;
            this.ui.updateScore(this.score, this.goal);
            this.ui.updateTime(this.remainingTime, this.maxTime);
            this.transition.leave(() => {
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