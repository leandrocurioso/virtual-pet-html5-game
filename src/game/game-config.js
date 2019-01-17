import Phaser from "phaser";
import { MainScene } from "../scene/main.scene";

export default {
    width: 360,
    height: 640,
    type: Phaser.AUTO,
    title: "Virtual Pet",
    parent: "game",
    scene: [
      MainScene
    ],
    pixelArt: false,
    backgroundColor: "#FFFFFF"
};;
