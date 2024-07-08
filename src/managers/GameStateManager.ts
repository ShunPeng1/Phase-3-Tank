import { Scene } from "phaser";
import BaseStateMachine from "../ultilities/state-machines/StateMachine";
import GameState from "./game-states/GameState";
import MainMenuState from "./game-states/MainMenuState";
import PauseState from "./game-states/PauseState";
import RestartState from "./game-states/RestartState";
import MainGameState from "./game-states/MainGameState";

class GameStateManager {
    protected scene : Scene;
    protected stateMachine : BaseStateMachine;
 
    protected mainGameState: GameState;
    protected startState: GameState;
    protected restartState: RestartState;
    protected pauseState: PauseState;


    constructor(scene: Scene) {
        
        this.scene = scene;

        this.intializeStateMachine();
    }

    protected intializeStateMachine() {
        this.mainGameState = new MainGameState(this.scene, this);
        this.startState = new MainMenuState(this.scene, this);
        this.restartState = new RestartState(this.scene, this);
        this.pauseState = new PauseState(this.scene, this);

        this.stateMachine = new BaseStateMachine.Builder()
            .withInitialState(this.startState, true)
            .build();

        this.stateMachine.addOrOverwriteState(this.mainGameState);
        this.stateMachine.addOrOverwriteState(this.startState);
        this.stateMachine.addOrOverwriteState(this.restartState);
        this.stateMachine.addOrOverwriteState(this.pauseState);
    }


    public reloadGame() {
        this.stateMachine.setToEmptyState();
    }


    public loadStartUI(): void {
        this.stateMachine.setToState(this.startState, null);
    }

    public loadLoseUI(): void {
        this.stateMachine.setToState(this.restartState, null);
    }

    public loadGameUI(): void {
        this.stateMachine.setToState(this.mainGameState, null);
    }

    public loadPauseUI(): void {
        this.stateMachine.setToState(this.pauseState, null);
    }

    public loadPreviousUI(): void {
        this.stateMachine.restoreState();
    }

}

export default GameStateManager;