// This class is not used in the project yet.
class Text {
  // The constructor has three parameters. Here is an example of how you would create
  // an instance of this class
  constructor(root) {
    // We create a DOM element, set its CSS attributes then append it to the parent DOM element. We also
    // set the \`domElement\` property of the instance to the newly created DOM element so we can update it later
    this.div = document.createElement("div");

    this.div.style.position = "absolute";
    this.div.style.left = "15px";
    this.div.style.top = "10px";
    this.div.style.color = "white";
    this.div.style.font = "bold 25px Impact";
    this.div.style.zIndex = 150000;

    root.appendChild(this.div);
  }

  // This method is used to update the text displayed in the DOM element
  update = (score) => {
    this.div.innerHTML = `Score: ${score}`;
  };
}

// let score = new Text(`Score: ${gameTime}`, "100px", "100px");
