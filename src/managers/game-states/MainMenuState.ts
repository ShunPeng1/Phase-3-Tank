import { Scene } from "phaser";
import GameState from "./GameState";
import GameStateManager from "../GameStateManager";

class MainMenuState extends GameState {

    constructor(scene: Scene, gameStateManager: GameStateManager) {
        super(scene, gameStateManager);
    }
}

export default MainMenuState;