class UserInterface {

    constructor() {
        this.screen = null;
        this.topBarEl = null;
        this.timeBarEl = null;
        this.scoreEl = null;
        this.levelEl = null;
        this.levelNoEl = null;
        this.levelPrefixEl = null;
        this.dialogEl = null;
        this.dialogPointsEl = null;
        this.dialogPointsNoEl = null;
        this.dialogSuffixEl = null;
        this.controlsEl = null;
        this.gameOverEl = null;
        this.gameOverTextEl = null;
        this.isActive = false;
        this.ad = null;
        this.willExit = false;
    }

    init() {

        //
        // Top bar
        //

        this.topBarEl = document.createElement('div');
        this.topBarEl.id = "topbar";
        this.topBarEl.style.display = 'none';
        this.topBarEl.style.background = "url(assets/topbar.png)";
        this.topBarEl.style.zIndex = 9999;
        this.topBarEl.style.width = '240px';
        this.topBarEl.style.height = '44px';
        this.topBarEl.style.position = 'absolute';
        this.topBarEl.style.backgroundRepeat = 'no-repeat';

        this.timeBarEl = document.createElement('div');
        this.timeBarEl.id = "timebar";
        this.timeBarEl.style.position = 'absolute';
        this.timeBarEl.style.left = '12px';
        this.timeBarEl.style.top = '12px';
        this.timeBarEl.style.width = '84px';
        this.timeBarEl.style.height = '20px';
        this.timeBarEl.style.backgroundColor = '#FFFFFF';

        this.scoreEl = document.createElement('div');
        this.scoreEl.id = 'score';
        this.scoreEl.innerText = '0 / 500';
        this.scoreEl.style.width = '126px';
        this.scoreEl.style.position = 'relative';
        this.scoreEl.style.textAlign = 'right';
        this.scoreEl.style.left = `106px`;
        this.scoreEl.style.top = `12px`;
        this.scoreEl.style.letterSpacing = `2px`;
        this.scoreEl.style.fontSize = `17.5px`;
        this.scoreEl.style.color = "#FFFFFF";
        this.scoreEl.style.fontFamily = "AADigits";

        this.levelEl = document.createElement('div');
        this.levelEl.id = 'level-bar'
        this.levelEl.style.position = 'relative';
        this.levelEl.style.width = '228px';
        this.levelEl.style.height = '25px';
        this.levelEl.style.letterSpacing = `2px`;
        this.levelEl.style.fontSize = `17.5px`;
        this.levelEl.style.color = "#FFFFFF";
        this.levelEl.style.backgroundColor = "#000000";
        this.levelEl.style.fontFamily = "AADigits";
        this.levelEl.style.textAlign = 'center';
        this.levelEl.style.marginTop = '-10px';
        this.levelEl.style.paddingTop = '4px';
        this.levelEl.style.marginLeft = '6px';
        this.levelEl.style.display = 'flex';
        this.levelEl.style.justifyContent = 'center';
        this.levelEl.style.lineHeight = '20px';

        this.levelPrefixEl = document.createElement('img');
        this.levelPrefixEl.id = "level-prefix";
        this.levelPrefixEl.src = 'assets/level_prefix.png';
        this.levelPrefixEl.style.paddingRight = '8px';
        this.levelPrefixEl.style.height = '18px';

        this.levelNoEl = document.createElement('span');
        this.levelNoEl.id = 'level-number';
        this.levelNoEl.innerText = '1';

        this.levelEl.appendChild(this.levelPrefixEl);
        this.levelEl.appendChild(this.levelNoEl);

        this.topBarEl.appendChild(this.timeBarEl);
        this.topBarEl.appendChild(this.scoreEl);
        this.topBarEl.appendChild(this.levelEl);

        //
        // Dialog
        //

        this.dialogEl = document.createElement('div');
        this.dialogEl.id = "dialog";
        this.dialogEl.style.display = 'none';
        this.dialogEl.style.position = 'absolute';
        this.dialogEl.style.zIndex = 9999;
        this.dialogEl.style.width = '172px';
        this.dialogEl.style.height = '192px';
        this.dialogEl.style.marginLeft = '34px';
        this.dialogEl.style.marginTop = '50px';
        this.dialogEl.style.backgroundImage = 'url(assets/dialog_back.png)';
        this.dialogEl.style.backgroundRepeat = 'no-repeat';

        this.dialogPointsEl = document.createElement('div');
        this.dialogPointsEl.style.width = `100%`;
        this.dialogPointsEl.style.letterSpacing = `2px`;
        this.dialogPointsEl.style.fontSize = `17.5px`;
        this.dialogPointsEl.style.color = "#FFFFFF";
        this.dialogPointsEl.style.fontFamily = "AADigits";
        this.dialogPointsEl.style.marginTop = '70px';
        this.dialogPointsEl.style.textAlign = 'center';
        this.dialogPointsEl.style.display = 'flex';
        this.dialogPointsEl.style.justifyContent = 'center';
        this.dialogPointsEl.style.lineHeight = '20px';

        this.dialogPointsNoEl = document.createElement('span');
        this.dialogPointsNoEl.id = 'dialog-points';
        this.dialogPointsNoEl.innerText = '500';

        this.dialogSuffixEl = document.createElement('img');
        this.dialogSuffixEl.id = "dialog-sufix";
        this.dialogSuffixEl.src = 'assets/points_suffix.png';
        this.dialogSuffixEl.style.paddingLeft = '6px';

        this.dialogPointsEl.appendChild(this.dialogPointsNoEl);
        this.dialogPointsEl.appendChild(this.dialogSuffixEl);
        this.dialogEl.appendChild(this.dialogPointsEl);
        

        //
        // Controls
        //

        this.controlsEl = document.createElement('img');
        this.controlsEl.id = 'controls';
        this.controlsEl.src = 'assets/controls.png';
        this.controlsEl.style.display = 'none';
        this.controlsEl.style.position = 'absolute';
        this.controlsEl.style.zIndex = 9999;
        this.controlsEl.style.marginTop = '252px';


        //
        // Game Over Screen
        //

        this.gameOverEl = document.createElement('div');
        this.gameOverEl.style.width = '240px';
        this.gameOverEl.style.height = '320px';
        this.gameOverEl.style.position = 'absolute';
        this.gameOverEl.style.backgroundColor = '#000000';
        this.gameOverEl.style.display = 'none';
        this.gameOverEl.style.justifyContent = 'center';
        this.gameOverEl.style.alignItems = 'center';
        this.gameOverTextEl = document.createElement('img');
        this.gameOverTextEl.src = 'assets/game_over.png';
        this.gameOverTextEl.style.transition = 'opacity ease 2s';
        this.gameOverTextEl.style.opacity = '0.0';
        this.gameOverEl.appendChild(this.gameOverTextEl);

        //
        // Appending to DOM
        //

        this.screen = document.getElementById('screen');
        this.screen.appendChild(this.gameOverEl);
        this.screen.appendChild(this.topBarEl);
        this.screen.appendChild(this.dialogEl);
        this.screen.appendChild(this.controlsEl);
    }

    showGameOver() {
        this.topBarEl.style.visibility = 'hidden';
        document.getElementById('MainCanvas').style.visibility = 'hidden';
        this.topBarEl.style.visibility = 'hidden';
        this.gameOverEl.style.display = 'flex';
        setTimeout(() => this.gameOverTextEl.style.opacity = '1.0', 500);
        setTimeout(() => {
            if (confirm("Try again?")) {
                this.showAd();
			} else {
                this.willExit = true;
                this.showAd();
            }
        }, 3000);
    }

    showAd() {
        if (this.ad) {
            this.ad.call('display');
        } else {
            this.redirectUser();
        }
    }

    redirectUser() {
        if (this.willExit) {
            window.close();
        } else {
            location.reload();
        }
    }

    prepareAd() {
        if (window.getKaiAd) {
            window.getKaiAd({
                publisher: '98ce6faa-00cf-4756-b191-f7019c715e51',
                app: 'Amateur Archaeology',
                test: process.env.NODE_ENV === 'development' ? 1 : 0,
                slot: 'Game Over Screen',
                onerror: err => console.error('Got error when trying to fetch ad:', err),
                onready: ad => {
                    this.ad = ad;
                    this.ad.on('close', () => this.redirectUser());
                }
            });
        }
    }

    updateScore(score, goal) {
        this.scoreEl.innerText = `${score} / ${goal}`;
        if (!this.isActive) {
            this.dialogPointsNoEl.innerText = goal;
        }
    }

    updateLevel(level) {
        this.levelNoEl.innerText = level;
        this.levelEl.style.display = 'flex';
    }

    updateTime(remainingTime, maxTime) {
        // The reason behind this crazy formula is that I want 
        // it to unfill by scaled pixes (2 real pixels) at a time.
        if (remainingTime >= 0) {
            this.timeBarEl.style.width = `${Math.round((remainingTime * 42) / maxTime) * 2}px`;
        }
    }

    hideDialog() {
        this.dialogEl.style.display = 'none';
        this.controlsEl.style.display = 'none';
        this.levelEl.style.display = 'none';
    }

    show() {
        this.topBarEl.style.removeProperty('display');
        this.dialogEl.style.removeProperty('display');
        this.controlsEl.style.removeProperty('display');

        this.isActive = true;
    }
}

export default new UserInterface();