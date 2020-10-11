class Score {
  constructor(root) {
    this.root = root;

    this.points = 0;
  }

  increment = (gameTime) => {
    this.points = gameTime;
  };
}
