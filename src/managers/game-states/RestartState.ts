import { Scene } from "phaser";
import GameState from "./GameState";
import GameStateManager from "../GameStateManager";
class RestartState extends GameState {

    constructor(scene: Scene, gameStateManager: GameStateManager) {
        super(scene, gameStateManager);
    }

    public enterState(enterTransitionData: IStateTransitionData | null): void {
        
    }
}


export default RestartState;