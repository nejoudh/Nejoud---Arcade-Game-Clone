'use strict';

// initializing game objects
var Enemy = function(initX, initY, speed) {

    this.x = initX;
    this.y = initY;
    this.sprite = 'images/enemy-bug.png';
    this.speed = speed;

};

// will generate random speed for the bugs/enemies
Enemy.prototype.Speed = function() {
    var increaseSpeed = Math.floor(Math.random() * 5 + 1);
    this.speed = 75 * increaseSpeed;
};

//updates bugs/enemies positions
Enemy.prototype.update = function(dt) {

    this.x = this.x + this.speed * dt;
    if (this.x > 500) {

        this.x = -80;
        this.Speed();
    }
    var leftXBug = this.x - 50;
    var rightXBug = this.x + 50;
    var topYBug = this.y - 50;
    var bottomYBug = this.y + 50;

    if (player.x > leftXBug && player.x < rightXBug && player.y > topYBug && player.y < bottomYBug) {
        player.resetPlayerPosition();
    }
};

//shows the enemy on screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//positioning player
var playerX = 200,
    playerY = 400;

//player class
var Player = function() {

    this.x = playerX;
    this.y = playerY;
    this.wallChecker = {
        leftWall: false,
        rightWall: false,
        bottomWall: true
    }

    this.sprite = 'images/char-princess-girl.png';
};

//updating player's position
Player.prototype.update = function() {
}

//shows the player on screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//position reset
Player.prototype.resetPlayerPosition = function() {
    this.x = playerX;
    this.y = playerY;
    this.resetCheckPosition();
}


Player.prototype.handleInput = function(tappedKeys) {

    var tapHorizontally = 100;
    var tapVertically = 90;
    this.checkPosition();

    if (tappedKeys === 'left') {
        if (this.wallChecker.leftWall) {
            return null;
        }
        this.x = this.x - tapHorizontally;
    }

        else if (tappedKeys === 'right') {
        if (this.wallChecker.rightWall) {
            return null;
        }
        this.x = this.x + tapHorizontally;
    }

        else if (tappedKeys === 'up') {
        if (this.y === 40) {
            this.resetPlayerPosition();
            return null;
        }
        this.y = this.y - tapVertically;
    }

        else if (tappedKeys === 'down') {
        if (this.wallChecker.bottomWall) {
            return null;
        }
        this.y = this.y + tapVertically;
    }

        else {
        console.log('Please use the arrows for movements');
        return null;
    }
};

//this function will check the position of each object in the game and make sue nothing goes out of the game borders or off screen
Player.prototype.checkPosition = function() {
    if (this.x === 0) {
        this.setHorizontalWallCheckerState(true, false);
    }

    else if (this.x === 400) {
        this.setHorizontalWallCheckerState(false, true);
    }

    else {
        this.setHorizontalWallCheckerState(false, false);
    }

    if (this.y === 400) {
        this.wallChecker.bottomWall = true;
    }

    else {
        this.wallChecker.bottomWall = false;
    }
};

Player.prototype.resetCheckPosition = function() {
    this.setHorizontalWallCheckerState(false, false);
    this.wallChecker.bottomWall = true;
};

Player.prototype.setHorizontalWallCheckerState = function(leftWallState, rightWallState) {
    this.wallChecker.leftWall = leftWallState;
    this.wallChecker.rightWall = rightWallState;
};



var allEnemies = [];

// Initiating all enemies
for (var i = 0; i < 3; i++) {
    var tempSpeed = Math.floor(Math.random() * 5 + 1) * 75;
    allEnemies.push(new Enemy(-60, 60 + 85 * i, tempSpeed));
};

var player = new Player();


document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    var tappedKeys = allowedKeys[e.keyCode];
    player.handleInput(tappedKeys);
});
