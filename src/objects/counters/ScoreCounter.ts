import LocalStorageManager from "../../managers/LocalStorageManager";

class ScoreCounter extends Phaser.Events.EventEmitter{
    private score: number = 0;
    private highScore: number = 0;
    
    public static readonly SCORE_CHANGE_EVENT = 'scoreChange';
    public static readonly SCORE_COUNTER_KEY = 'scoreCounter';

    constructor(){
        super();
    
    }

    public addScore(value: number) : void{
    
        this.score += value;
        this.emit(ScoreCounter.SCORE_CHANGE_EVENT, this.score - value, this.score);
    }

    public getScore() : number{
        return this.score;
    }    
    
    public resetScore() : void {
        this.score = 0;

        this.emit(ScoreCounter.SCORE_CHANGE_EVENT, this.score, 0);
    }
    
    public setScore(score: number) : void{
        this.score = score;

        this.emit(ScoreCounter.SCORE_CHANGE_EVENT, this.score, score);
    }

    public saveHighScore() : void {
        if (this.score > this.highScore) {
            this.highScore = this.score;
            LocalStorageManager.getInstance().setItem('highScore', this.highScore.toString());
        }  
    }

    public loadHighScore() : void {
        const highScore = LocalStorageManager.getInstance().getItem('highScore');
        this.highScore = highScore ? parseInt(highScore) : 0;
    }

    public resetHighScore() : void {
        this.highScore = 0;
        LocalStorageManager.getInstance().removeItem('highScore');
    }


}

export default ScoreCounter;