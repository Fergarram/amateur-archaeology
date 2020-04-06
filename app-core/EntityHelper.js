import { easeLinear } from './Utilities.js';

class EntityHelper {
    constructor() {
        this.list = [];
        this.world = null;
        this.grid = null;
        this.gravity = 0.1;
        this.speed = 2;
        this.elapsedTime = 0;
        this.shouldFlip = false;
    }

    create(gx, gy, type) {
        const x = this.world.x + this.grid.global_x + gx * this.grid.size;
        const y = this.world.y + this.grid.global_y + gy * this.grid.size;

        if (type === 'foe') {
            let dice = Math.random();
            type = dice >= 0.5? 'scorpion' : 'fire';
        }

        this.list.push({
			type: type,
			grid_x: gx,
            grid_y: gy,
            x: x,
            y: y,
            dx: x,
            dy: y,
            isFalling: false,
            isMoving: false,
            dir: 'right',
            newborn: true,
            fallingTime: 0, // Milliseconds
            movingTime: 0, // Milliseconds
		});
    }

    reset() {
        this.list = [];
    }

    clean(player_y) {
        this.list = this.list.filter(t => t.grid_y >= player_y - 4);
    }

    canBurnItem(x, y) {
        if (this.list < 1) {
            return false;
        }


        for (var i = 0; i < this.list.length; i++) {
            const isBurnable = this.list[i].type.indexOf('treasure') !== -1 || this.list[i].type === 'scorpion';
            if (this.list[i].grid_x === x && this.list[i].grid_y === y && isBurnable) {
                return true;
            }
        }

        return false;
    }

    removeAtPos(x, y, callback) {
        if (this.list < 1) {
            return false;
        }

        const entitiesAtPos = [];
        for (var i = 0; i < this.list.length; i++) {
            if (this.list[i].grid_x === x && this.list[i].grid_y === y) {
                entitiesAtPos.push(this.list[i].type);
                this.list[i] = null;
			}
        }

        if (entitiesAtPos.length > 0) {
            this.list = this.list.filter(t => t !== null);
            callback(entitiesAtPos);
            return true;
        }

        return false;
    }

    update(delta) {
        if (this.list.length < 1)
            return;
            
        this.elapsedTime += delta;
        if (this.elapsedTime >= 500) {
                this.shouldFlip = !this.shouldFlip;
                this.elapsedTime = 0;
        }

		for (var i = 0; i < this.list.length; i++) {
            const blockBelow = this.grid.getBlockType(this.list[i].grid_x, this.list[i].grid_y + 1);
            this.list[i].y = this.world.y + this.grid.global_y + this.list[i].grid_y * this.grid.size;

            if (this.list[i].type === 'fire') {
                
                const blockAtRight = this.grid.getBlockType(this.list[i].grid_x + 1, this.list[i].grid_y);
                const blockAtLeft = this.grid.getBlockType(this.list[i].grid_x - 1, this.list[i].grid_y);

                if (blockAtRight === 'air' && this.list[i].dir === 'right' && !this.list[i].isFalling) {

                    if (this.list[i].newborn) {
                        this.list[i].newborn = false;
                    }

                    if (!this.list[i].isMoving) {
                        this.list[i].movingTime = 0;
                        this.list[i].dx = this.list[i].x + this.grid.size;
                    }

                    if (this.list[i].x < this.list[i].dx) {
                        this.list[i].isMoving = true;
                        this.list[i].movingTime += delta;
                        this.list[i].x += easeLinear(this.list[i].movingTime / 1000, 0, this.grid.size, this.speed);
                    }

                    if (this.list[i].x >= this.list[i].dx && this.list[i].isMoving) {
                        this.list[i].x = this.list[i].dx;
                        this.list[i].movingTime = 0;
                        this.list[i].isMoving = false;
                        this.list[i].grid_x += 1;
                        
                        if (this.canBurnItem(this.list[i].grid_x, this.list[i].grid_y)) {
                            const playSound = () => window.AssetLoader.playSound('hurt');
                            if (this.removeAtPos(this.list[i].grid_x, this.list[i].grid_y, playSound)) {
                                continue;
                            }
                        }

                        if (this.grid.getBlockType(this.list[i].grid_x + 1, this.list[i].grid_y) !== 'air') {
                            this.list[i].dir = 'left';
                        }
                    }
                }
                
                if (blockAtLeft === 'air' && (this.list[i].dir === 'left' || this.list[i].newborn) && !this.list[i].isFalling) {

                    if (this.list[i].newborn) {
                        this.list[i].newborn = false;
                        this.list[i].dir = 'left';
                    }

                    if (!this.list[i].isMoving) {
                        this.list[i].movingTime = 0;
                        this.list[i].dx = this.list[i].x - this.grid.size;
                    }

                    if (this.list[i].x > this.list[i].dx) {
                        this.list[i].isMoving = true;
                        this.list[i].movingTime += delta;
                        this.list[i].x -= easeLinear(this.list[i].movingTime / 1000, 0, this.grid.size, this.speed);
                    }

                    if (this.list[i].x <= this.list[i].dx && this.list[i].isMoving) {
                        this.list[i].x = this.list[i].dx;
                        this.list[i].movingTime = 0;
                        this.list[i].isMoving = false;
                        this.list[i].grid_x -= 1;
                        
                        if (this.canBurnItem(this.list[i].grid_x, this.list[i].grid_y)) {
                            const playSound = () => window.AssetLoader.playSound('hurt');
                            if (this.removeAtPos(this.list[i].grid_x, this.list[i].grid_y, playSound)) {
                                continue;
                            }
                        }

                        if (this.grid.getBlockType(this.list[i].grid_x - 1, this.list[i].grid_y) !== 'air') {
                            this.list[i].dir = 'right';
                        }
                    }
                }
            }

            if (blockBelow === 'air') {
                if (!this.list[i].isFalling) {
                    this.list[i].fallingTime = 0;
                    this.list[i].dy = this.list[i].y + this.grid.size;
                }

                if (this.list[i].y < this.list[i].dy) {
                    this.list[i].isFalling = true;
                    this.list[i].fallingTime += delta;
                    this.list[i].y += easeLinear(this.list[i].fallingTime / 1000, 0, this.grid.size, this.gravity);
                }

                if (this.list[i].y >= this.list[i].dy && this.list[i].isFalling) {
                    this.list[i].y = this.list[i].dy;
                    this.list[i].fallingTime = 0;
                    this.list[i].isFalling = false;
                    this.list[i].grid_y += 1;
                    if (this.list[i].type === 'fire') {
                        if (this.canBurnItem(this.list[i].grid_x, this.list[i].grid_y)) {
                            const playSound = () => window.AssetLoader.playSound('hurt');
                            if (this.removeAtPos(this.list[i].grid_x, this.list[i].grid_y, playSound)) {
                                continue;
                            }
                        }
                    }
                }
            }
        }
    }

    draw(CanvasHelper) {
        if (this.list.length < 1)
			return;

		for (var i = 0; i < this.list.length; i++) {
            if (this.list[i].type === 'scorpion' || this.list[i].type === 'fire') {
                CanvasHelper.drawImage(this.list[i].type, this.list[i].x, this.list[i].y, 1, this.shouldFlip);
            } else {
                CanvasHelper.drawImage(this.list[i].type, this.list[i].x, this.list[i].y);
            }
        }
    }
}

export default new EntityHelper();