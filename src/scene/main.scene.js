import { Scene } from "./scene";

export class MainScene extends Scene {

  constructor(options = { key: "MainScene" }) {
    super(options);
  }

  init() {
    super.init();
    this.stats = {
      health: 100,
      fun: 100
    };
    this.uiBlocked = false;
  }

  preload() {
    // Graphic
    this.load.image("apple", "./assets/image/apple.png");
    this.load.image("backyard", "./assets/image/backyard.png");
    this.load.image("candy", "./assets/image/candy.png");
    this.load.image("rotate", "./assets/image/rotate.png");
    this.load.image("toy", "./assets/image/rubber_duck.png");

    this.load.spritesheet("pet", "./assets/image/pet.png", {
      frameWidth: 97,
      frameHeight: 83,
      margin: 1,
      spacing: 1
    });
  }

  createButtons() {
    this.appleButton  = this.add.sprite(72, 517, "apple");
    this.appleButton.setData("stats", { health: 20, fun: 0 });
    this.appleButton.setInteractive();
    this.appleButton.on("pointerdown", this.pickItem, this.appleButton);
    this.candyButton  = this.add.sprite(144, 517, "candy");
    this.candyButton.setData("stats", { health: -10, fun: 10 });
    this.candyButton.setInteractive();
    this.candyButton.on("pointerdown", this.pickItem);
    this.candyButton.setData("stats", { health: 0, fun: 15 });
    this.toyButton  = this.add.sprite(216, 517, "toy");
    this.toyButton.setInteractive();
    this.toyButton.on("pointerdown", this.pickItem);
    this.rotateButton  = this.add.sprite(288, 517, "rotate");
    this.rotateButton.setInteractive();
    this.rotateButton.on("pointerdown", this.rotatePet);
    this.buttons = [
      this.appleButton,
      this.candyButton,
      this.toyButton,
      this.rotateButton
    ];
    this.setUiReady();
  }

  pickItem() {
    if (this.scene.uiBlocked) return;
    this.scene.setUiReady();
    this.scene.selectedItem = this;
    this.alpha = 0.5;
  }

  rotatePet() {
    if (this.scene.uiBlocked) return;
    this.scene.setUiReady();
    this.scene.uiBlocked = true;
    this.scene.selectedItem = this;
    this.alpha = 0.5;
    const scene = this.scene;
    setTimeout(() => {
      scene.setUiReady();
    }, 2000)
  }

  setUiReady() {
    this.selectedItem = null;
    Phaser.Actions.Call(this.buttons, (srpite) => {
      srpite.alpha = 1;
    }, this)
    this.uiBlocked = false;
  }

  create() {
    this.background = this.add.sprite(0,0, "backyard").setOrigin(0, 0);
    this.background.setInteractive();
    this.pet  = this.add.sprite(100, 200, "pet", 0);
    this.pet.setInteractive();
    this.input.setDraggable(this.pet);
    this.input.on('drag', (pointer, gameObject, dragx, dragY) => {
      gameObject.x = dragx;
      gameObject.y = dragY;
    })
    this.createButtons();
  }

  update() {}

}
