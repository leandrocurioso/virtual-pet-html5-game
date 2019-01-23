import { Scene } from "./scene";

export class LoadingScene extends Scene {

  constructor(options = { key: "LoadingScene" }) {
    super(options);
  }

  init() {
    super.init();
  }

  preload() {

    this.logo = this.add.sprite(this.gameWidthMiddle, this.gameHeightMiddle - 50, "logo");

    const progressBarBgWidth = 150;
    const progressBarBgHeight = 30;
    this.progressBarBg = this.add.graphics();
    this.progressBarBg.setPosition(this.gameWidthMiddle - progressBarBgWidth / 2, this.gameHeightMiddle - progressBarBgHeight / 2);
    this.progressBarBg.fillStyle(0xF5F5F5, 1);
    this.progressBarBg.fillRect(0, 0, progressBarBgWidth, progressBarBgHeight);

    this.progressBar = this.add.graphics();
    this.progressBar.setPosition(this.gameWidthMiddle - progressBarBgWidth / 2, this.gameHeightMiddle - progressBarBgHeight / 2);

    this.load.on("progress", percentage => {
      this.progressBar.clear();
      this.progressBar.fillStyle((0x9AD98D), 1);
      this.progressBar.fillRect(0, 0, percentage * progressBarBgWidth, progressBarBgHeight);
    }, this);

    // Audio
    this.load.audio("eating", [ "./assets/audio/eating.mp3" ]);
    this.load.audio("background", [ "./assets/audio/background.mp3" ]);
    this.load.audio("death", [ "./assets/audio/death.mp3" ]);

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

  create() {
    this.anims.create({
      key: "funnyfaces",
      frames: this.anims.generateFrameNames("pet", {
        frames: [1, 2, 3]
      }),
      frameRate: 7,
      yoyo: true,
      repeat: 0
    });
    this.scene.start("HomeScene");
  }

}
