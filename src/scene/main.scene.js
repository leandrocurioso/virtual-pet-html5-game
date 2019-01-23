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
    this.decayRate = {
      health: -5,
      fun: -2
    };
    this.uiBlocked = false;
    this.isCalled = false;
  }

  createButtons() {
    this.appleButton  = this.add.sprite(72, 517, "apple");
    this.appleButton.stats = { health: 20, fun: 0 };
    this.appleButton.setInteractive();
    this.appleButton.on("pointerdown", this.pickItem, this.appleButton);
    this.candyButton = this.add.sprite(144, 517, "candy");
    this.candyButton.stats = { health: -10, fun: 10 };
    this.candyButton.setInteractive();
    this.candyButton.on("pointerdown", this.pickItem);
    this.toyButton = this.add.sprite(216, 517, "toy");
    this.toyButton.stats = { health: 0, fun: 15 };
    this.toyButton.setInteractive();
    this.toyButton.on("pointerdown", this.pickItem);
    this.rotateButton  = this.add.sprite(288, 517, "rotate");
    this.rotateButton.stats = { health: 0, fun: 20 };
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
    const rotateTween = this.scene.tweens.add({
      targets: this.scene.pet,
      duration: 600,
      angle: 360,
      paused: false,
      callbackScope: this,
      onComplete: (tween, sprites) => {
        this.scene.updateStats(this.stats);
        this.scene.setUiReady();
      }
    });
  }

  setUiReady() {
    this.selectedItem = null;
    Phaser.Actions.Call(this.buttons, (srpite) => {
      srpite.alpha = 1;
    }, this)
    this.uiBlocked = false;
  }

  placeItem(pointer, x, y) {
    if (!this.selectedItem || this.selectedItem.texture.key === "rotate") return;

    if (this.uiBlocked) return;
    const newItem = this.add.sprite(x, y, this.selectedItem.texture.key);

    this.uiBlocked = true;

    const petTween = this.tweens.add({
      targets: this.pet,
      duration: 500,
      x: newItem.x,
      y: newItem.y,
      paused: false,
      callbackScope: this,
      onComplete: (tween, sprites) => {
        newItem.destroy();
        this.eatingSound.play();

        this.pet.on("animationcomplete", () => {
          this.pet.setFrame(0);
          this.setUiReady();
        }, this);

        this.pet.play("funnyfaces");
        this.updateStats(this.selectedItem.stats);
      }
    });
  }  

  refreshHud() {
    this.healthText.setText(`Health: ${this.stats.health}`);
    this.funText.setText(`Fun: ${this.stats.fun}`);
  }

  gameOver() {
    if (!this.isCalled) {
      this.isCalled = true;
      this.uiBlocked = true;
      this.deathSound.play();
      this.pet.setFrame(4);
  
      this.time.addEvent({
        delay: 2000,
        repeat: 0,
        callbackScope: this,
        callback: () => {
          this.backgroundSound.stop();
          this.scene.start("HomeScene");
        }
      });
    }
  }

  updateStats(statDiff) {
    let isGameOver = false;
    for(let stat in statDiff) {
      if (statDiff.hasOwnProperty(stat)) {
        this.stats[stat] += statDiff[stat];
        if (this.stats[stat] < 0) {
          isGameOver = true;
          this.stats[stat] = 0;
        }
      }
    }
    this.refreshHud();
    if (isGameOver) this.gameOver();
  }

  createHud() {
    this.healthText = this.add.text(20, 20, `Health: ${this.stats.health}`, {
      font: "20px Arial",
      fill: "#FFFFFF"
    });

    this.funText = this.add.text(this.gameWidth - 100, 20, `Fun: ${this.stats.fun}`, {
      font: "20px Arial",
      fill: "#FFFFFF"
    });
  }

  create() {
    this.eatingSound = this.sound.add("eating");
    this.deathSound = this.sound.add("death");
    this.backgroundSound = this.sound.add("background", {
      loop: true
    });
    this.background = this.add.sprite(0,0, "backyard").setOrigin(0, 0);
    this.background.setInteractive();
    this.background.on("pointerdown", this.placeItem, this);
    this.pet  = this.add.sprite(100, 200, "pet", 0);
    this.pet.setInteractive();
    this.input.setDraggable(this.pet);
    this.input.on('drag', (pointer, gameObject, dragx, dragY) => {
      gameObject.x = dragx;
      gameObject.y = dragY;
    })
    this.backgroundSound.play();
    this.createButtons();
    this.createHud();
    this.timedEventStats = this.time.addEvent({
      delay: 1500,
      repeat: -1,
      callbackScope: this,
      callback: () => {
        this.updateStats({
          health: this.decayRate.health,
          fun: this.decayRate.fun
        });
      }
    });
  }

  update() {}

}
