class Game {
    
    constructor() {
        this.ui = null;
        this.player = null;
        this.assets = null;
        this.grid = null;
        this.transition = null;
        this.entities = null;
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

    substractTime(time) {
        if (this.remainingTime - time <= 0) {
            this.remainingTime = 0;
        } else {
            this.remainingTime -= time;
        }
    }

    endLevel() {
        this.transition.enter(() => {
            this.player.reset();
            this.grid.reset();
            this.entities.reset();
            this.freeze = false;
            

            // Lost, go to game over screen.
            if (this.goal > this.score) {
                this.ui.showGameOver();
                this.transition.leave();
                return;

            // Won, setup new level.
            } else if (this.score >= this.goal) {
                const extraPoints = this.score - this.goal;
                const bonusRatio = extraPoints / this.goal;
                this.maxTime = Math.floor(this.maxTime * (1 + (bonusRatio / 2)));
                this.level += 1;
                const newGoal = Math.floor(this.goal * 1.5); // I guess level will do something here?
                this.goal = newGoal - (newGoal % 5); // Only multiples of 5.
            }
            
            // Reset anyways
            this.remainingTime = this.maxTime;
            this.score = 0;
    
            // Show UI
            this.ui.isActive = false;
            this.ui.updateScore(this.score, this.goal);
            this.ui.updateTime(this.remainingTime, this.maxTime);
            this.ui.updateLevel(this.level);

            // Show level again.
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
                    let ringer = null;
                    if (this.goal < this.score) {
                        ringer = setInterval(() => this.assets.playSound('good'), 180);
                    }
                    setTimeout(() => {
                        if (ringer !== null) {
                            clearInterval(ringer);
                            this.assets.playSound('start');
                        } else {
                            this.assets.playSound('loose');
                        }
                        this.endLevel();
                    }, 1500);
                }

                this.ui.updateTime(this.remainingTime, this.maxTime);
            }
        }
    }
}

export default new Game();