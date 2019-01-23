import { Scene } from "./scene";

export class BootScene extends Scene {

  constructor(options = { key: "BootScene" }) {
    super(options);
  }

  init() {
    super.init();
  }

  preload() {
    this.load.image("logo", "./assets/image/rubber_duck.png");
  }

  create() {
    this.scene.start("LoadingScene");
  }

}
