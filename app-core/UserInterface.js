class UserInterface {

    constructor() {
        this.screen = null;
        this.topBarEl = null;
        this.timeBarEl = null;
        this.scoreEl = null;
        this.dialogEl = null;
        this.dialogPointsEl = null;
        this.dialogSuffixEl = null;
        this.controlsEl = null;
        this.isActive = false;
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

        this.topBarEl.appendChild(this.timeBarEl);
        this.topBarEl.appendChild(this.scoreEl);

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
        this.dialogEl.style.marginTop = '56px';
        this.dialogEl.style.backgroundColor = '#000000';
        this.dialogEl.style.backgroundImage = 'url(assets/dialog_back.png)';
        this.dialogEl.style.backgroundRepeat = 'no-repeat';
        this.dialogEl.style.border = '2px solid #b8c4d4';

        this.dialogPointsEl = document.createElement('div');
        this.dialogPointsEl.innerHTML = '<span id="dialog-points">500</span>';
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

        this.dialogSuffixEl = document.createElement('img');
        this.dialogSuffixEl.id = "dialog-sufix";
        this.dialogSuffixEl.src = 'assets/points_suffix.png';
        this.dialogSuffixEl.style.paddingLeft = '6px';

        this.dialogPointsEl.appendChild(this.dialogSuffixEl);
        this.dialogEl.appendChild(this.dialogPointsEl);
        

        //
        // Controls
        //

        this.controlsEl = document.createElement('img');
        this.controlsEl.id = 'controls';
        this.controlsEl.src = 'assets/instructions.png';
        this.controlsEl.style.display = 'none';
        this.controlsEl.style.position = 'absolute';
        this.controlsEl.style.zIndex = 9999;
        this.controlsEl.style.marginLeft = '30px';
        this.controlsEl.style.marginTop = '264px';

        //
        // Appending to DOM
        //

        this.screen = document.getElementById('screen');
        this.screen.appendChild(this.topBarEl);
        this.screen.appendChild(this.dialogEl);
        this.screen.appendChild(this.controlsEl);
    }

    updateScore(score, goal) {
        this.scoreEl.innerText = `${score} / ${goal}`;
        if (!this.isActive) {
            document.getElementById('dialog-points').innerText = `${goal}`;
        }
    }

    updateTime(remainingTime, maxTime) {
        // The reason behind this crazy formula is that I want 
        // it to unfill by scaled pixes (2 real pixels) at a time.
        if (remainingTime >= 0) {
            this.timeBarEl.style.width = `${Math.round((remainingTime * 42) / maxTime) * 2}px`;
        }
    }

    hideDialog() {
        if (this.dialogEl) {
            this.dialogEl.style.display = 'none';
        }
    }

    show() {
        this.topBarEl.style.removeProperty('display');
        this.dialogEl.style.removeProperty('display');

        this.controlsEl.style.removeProperty('display');
        setTimeout(() => {
            this.controlsEl.style.display = 'none';
        }, 5000);

        this.isActive = true;
    }
}

export default new UserInterface();