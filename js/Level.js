class Level {
  constructor(root) {
    this.root = root;

    this.displayLevel = 1;

    this.div = document.createElement("div");

    this.div.style.position = "absolute";
    this.div.style.left = "15px";
    this.div.style.top = "35px";
    this.div.style.color = "white";
    this.div.style.font = "bold 25px Impact";
    this.div.style.zIndex = 150000;

    root.appendChild(this.div);
  }

  update = (level) => {
    this.div.innerHTML = `Level: ${level}`;
  };
}
