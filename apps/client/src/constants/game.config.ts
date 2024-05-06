import Phaser from "phaser";
import GameScene from "../scenes/GameScene";

export const GAME_CONTAINER = 'game-container';

export const GameConfig: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    parent: GAME_CONTAINER,
    scale: {
      mode: Phaser.Scale.ScaleModes.RESIZE,
      width: window.innerWidth,
      height: window.innerHeight,
    },
    scene: [GameScene],
};

