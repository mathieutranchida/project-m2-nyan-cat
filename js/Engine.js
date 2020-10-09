// The engine class will only be instantiated once. It contains all the logic
// of the game relating to the interactions between the player and the
// enemy and also relating to how our enemies are created and evolve over time
class Engine {
  // The constructor has one parameter. It will refer to the DOM node that we will be adding everything to.
  // You need to provide the DOM node when you create an instance of the class
  constructor(theRoot) {
    // We need the DOM element every time we create a new enemy so we
    // store a reference to it in a property of the instance.
    this.root = theRoot;
    // We create our hamburger.
    // Please refer to Player.js for more information about what happens when you create a player
    this.player = new Player(this.root);
    // Initially, we have no enemies in the game. The enemies property refers to an array
    // that contains instances of the Enemy class
    this.enemies = [];
    this.startTime = new Date().getTime();
    // We add the background image to the game
    addBackground(this.root);
  }

  timeSpeedIncrease = (timeDiff) => {
    console.log(timeDiff);
    const increase = Math.ceil(timeDiff / 10000);
    console.log(increase);
    return increase;
  };

  // The gameLoop will run every few milliseconds. It does several things
  //  - Updates the enemy positions
  //  - Detects a collision between the player and any enemy
  //  - Removes enemies that are too low from the enemies array
  gameLoop = () => {
    let gameTime = new Date().getTime() - this.startTime;
    console.log(gameTime, this.startTime);
    // This code is to see how much time, in milliseconds, has elapsed since the last
    // time this method was called.
    // (new Date).getTime() evaluates to the number of milliseconds since January 1st, 1970 at midnight.
    if (this.lastFrame === undefined) {
      this.lastFrame = new Date().getTime();
    }

    let timeDiff = new Date().getTime() - this.lastFrame;

    this.lastFrame = new Date().getTime();
    // We use the number of milliseconds since the last call to gameLoop to update the enemy positions.
    // Furthermore, if any enemy is below the bottom of our game, its destroyed property will be set. (See Enemy.js)
    this.enemies.forEach((enemy) => {
      enemy.update(timeDiff, this.timeSpeedIncrease(gameTime));
      // console.log(this.timeSpeedIncrease(gameTime));
    });

    // We remove all the destroyed enemies from the array referred to by \`this.enemies\`.
    // We use filter to accomplish this.
    // Remember: this.enemies only contains instances of the Enemy class.
    this.enemies = this.enemies.filter((enemy) => {
      return !enemy.destroyed;
    });

    // We need to perform the addition of enemies until we have enough enemies.
    while (this.enemies.length < MAX_ENEMIES) {
      // We find the next available spot and, using this spot, we create an enemy.
      // We add this enemy to the enemies array
      const spot = nextEnemySpot(this.enemies);
      this.enemies.push(new Enemy(this.root, spot));
    }

    // We check if the player is dead. If he is, we alert the user
    // and return from the method (Why is the return statement important?)
    // Does not work if we call it gameLoop outside this loop
    if (this.isPlayerDead(this.onclickReset)) {
      return;
    }

    // If the player is not dead, then we put a setTimeout to run the gameLoop in 20 milliseconds
    setTimeout(this.gameLoop, 20);
  };

  // Create a Restart Button
  showRestart = () => {
    const onclickReset = this.onclickReset;
    let mainDiv = document.getElementById("app");
    let gameTime = new Date().getTime() - this.startTime;
    const restartButton = document.createElement("button");
    restartButton.innerText = `Game Over score: ${gameTime} RESTART`;
    restartButton.style.display = "block";
    restartButton.style.font = "bold 17px Impact";
    restartButton.style.zIndex = "10000";
    restartButton.style.position = "absolute";
    restartButton.style.top = "300px";
    restartButton.style.left = "115px";
    restartButton.style.padding = "20px";
    restartButton.style.width = "150px";
    mainDiv.appendChild(restartButton);
    restartButton.onclick = function () {
      onclickReset(restartButton);
    };
  };

  onclickReset = (givenRestartButton) => {
    console.log("before: ", this.startTime);
    this.startTime = new Date().getTime();
    console.log("after: ", this.startTime);
    this.gameLoop();
    givenRestartButton.style.display = "none";
  };

  // This method is not implemented correctly, which is why
  // the burger never dies. In your exercises you will fix this method.
  isPlayerDead = () => {
    let dead = false;
    this.enemies.forEach((enemy) => {
      let enemyLeft = enemy.x;
      let enemyRight = enemy.x + ENEMY_WIDTH;
      let enemyTop = enemy.y;
      let enemyBottom = enemy.y + ENEMY_HEIGHT;
      let playerLeft = this.player.x;
      let playerRight = this.player.x + PLAYER_WIDTH;
      let playerTop = GAME_HEIGHT - PLAYER_HEIGHT - 10;
      let playerBottom = GAME_HEIGHT - 10;
      if (
        enemyBottom > playerTop &&
        enemyTop < playerBottom &&
        enemyRight > playerLeft &&
        enemyLeft < playerRight
      ) {
        dead = true;
        this.showRestart();
      }
    });
    return dead;
  };
}
