import { Scene } from "./scene";

export class HomeScene extends Scene {

  constructor(options = { key: "HomeScene" }) {
    super(options);
  }

  init() {
    super.init();
  }

  preload() {

  }

  create() {
    this.background = this.add.sprite(0,0, "backyard").setOrigin(0, 0);
    this.background.setInteractive();
    this.welcomeText = this.add.text(this.gameWidthMiddle, this.gameHeightMiddle, "😄 Virtual Pet", {
      font: "40px Arial",
      fill: "#FFFFFF"
    });
    this.welcomeText.setOrigin(0.5, 0.5);
    this.welcomeText.depth = 1;
    this.textBackground = this.add.graphics();
    this.textBackground.fillStyle(0x000000, 0.7);
    this.textBackground.fillRect(
      (this.gameWidthMiddle - this.welcomeText.width / 2) - 10, 
      (this.gameHeightMiddle - this.welcomeText.height / 2) - 10,
      this.welcomeText.width + 20,
      this.welcomeText.height + 20
   );
    this.background.on("pointerdown", () => {
      this.scene.start("MainScene");
    }, this);
  }

}
