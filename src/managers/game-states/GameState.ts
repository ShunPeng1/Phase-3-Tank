import { Scene } from "phaser";
import GameStateManager from "../GameStateManager";
class GameState implements IState {
    protected scene: Scene;
    protected gameStateManager: GameStateManager;
    

    constructor(scene : Scene, gameStateManager: GameStateManager) {
        this.scene = scene;
        this.gameStateManager = gameStateManager;
        
    }
    public enterState(enterTransitionData: IStateTransitionData | null): void {

    }
    public exitState(exitTransitionData: IStateTransitionData | null): void {
    
    }
    public update(deltaTime: number, transitionData: IStateTransitionData | null): void {
        // Do nothing
    }
    
}

export default GameState;