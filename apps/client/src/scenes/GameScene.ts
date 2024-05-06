import { EventTypes } from "@common";
import { useGameStore } from "../stores/game.store";

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('game');
    }

    increaseScore() {
        useGameStore.getState().room?.send(EventTypes.INCREASE_SCORE);
    }

    create() {
        useGameStore.subscribe(this.stateUpdate.bind(this));
        ((this.add.text(100, 100, 'Click me (Game)')).setInteractive()).on('pointerdown', this.increaseScore);
    }

    stateUpdate() {
        const newState = useGameStore.getState();
        console.log('New state:', newState);
    }
}