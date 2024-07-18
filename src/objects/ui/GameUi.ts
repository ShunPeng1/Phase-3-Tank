import { GameObjects } from "phaser";
import PauseController from "../../ultilities/pause/PauseController";
import TweenUtilities from "../../ultilities/TweenUtilities";
import UiContainer from "../../ultilities/ui/UiContainer";
import UiImageButton from "../../ultilities/ui/UiImageButton";
import UiImage from "../../ultilities/ui/UiImage";
import BlackUiImage from "./BlackUiImage";
import UiImageSlider from "../../ultilities/ui/UiImageSlider";
import MusicBarUi from "./MusicSliderUi";
import CursorChanger from "../CursorChanger";
import EnemyCounter from "../counters/EnemyCounter";
import Enemy from "../Enemy";
import ScoreCounter from "../counters/ScoreCounter";
import AudioController from "../../ultilities/audio/AudioController";

class GameUi extends GameObjects.Graphics {
    private pauseController : PauseController;
    private audioController : AudioController;
    
    private playUi : UiContainer;
    private pauseUi : UiContainer;
    
    private overlayUi : UiContainer;
    private loseUi : UiContainer;
    private winUi : UiContainer;

    // Black background to cover the game when the pause menu is shown
    private blackBackground : BlackUiImage;
    private blackSceneTransition : BlackUiImage;
    
    
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene);
           
        scene.add.existing(this);

        this.audioController = this.scene.data.get(AudioController.AUDIO_CONTROLLER_KEY) as AudioController;

        this.createPlayUi();
       
        this.createPauseUi();
        this.createOverlayUi();
        this.createWinUi();
        this.createLoseUi();

        this.createBlackImages(scene);        

        this.initializeSceneLoad();
    }
    

    private createBlackImages(scene: Phaser.Scene) {
        this.blackBackground = new BlackUiImage(scene, 0, 0.4, 200);
        this.blackBackground.setDepth(999);

        this.blackSceneTransition = new BlackUiImage(scene, 1, 0, 700);
        this.blackSceneTransition.setDepth(2000);

        this.pauseController = new PauseController(scene, []);
    }

    private createPlayUi(){
        this.playUi = new UiContainer(this.scene, 0, 0);
        this.playUi.setSize(this.scene.scale.width, this.scene.scale.height);
        this.playUi.setPosition(this.scene.scale.width/2, this.scene.scale.height/2); 
        this.playUi.setDepth(1000);

        const pauseButton = new UiImageButton(this.scene, 100, 100, 'icon-small-white-outline-pause');
        pauseButton.setScale(0.6);

        pauseButton.on(UiImageButton.BUTTON_UP_EVENT, this.showPauseUi, this);
        TweenUtilities.applyTintTweens(pauseButton, UiImageButton.BUTTON_DOWN_EVENT, [UiImageButton.BUTTON_UP_EVENT, UiImageButton.BUTTON_REST_EVENT], 0xffffff, 0xb8b8b8, 200);
        TweenUtilities.applyScaleTweens(pauseButton, UiImageButton.BUTTON_HOVER_EVENT, UiImageButton.BUTTON_REST_EVENT, pauseButton.scaleX, pauseButton.scaleY, 1.1, 100);        
        pauseButton.on(UiImageButton.BUTTON_DOWN_EVENT, () => {
            this.audioController.playSound('button-down');
        });
       

        this.playUi.add(pauseButton, "TopLeft", -30, -30);

        console.log("playUi", this.playUi, this.playUi.displayWidth, this.playUi.displayHeight, this.playUi.width, this.playUi.height, this.playUi.scaleX, this.playUi.scaleY, this.playUi.x, this.playUi.y);
        console.log("pauseButton", pauseButton, pauseButton.displayWidth, pauseButton.displayHeight, pauseButton.width, pauseButton.height, pauseButton.scaleX, pauseButton.scaleY, pauseButton.x, pauseButton.y);
    
    }

    private createPauseUi() {
        this.pauseUi = new UiContainer(this.scene, 0, 0);
        this.pauseUi.setSize(this.scene.scale.width, this.scene.scale.height);
        this.pauseUi.setPosition(this.scene.scale.width/2, this.scene.scale.height/2);
        this.pauseUi.setDepth(1000);

        const panel = new UiImage(this.scene, 0, 0, 'box-white-outline-rounded');
        panel.setScale(0.5);
        this.pauseUi.add(panel, "Center");

        const pauseText = this.scene.add.text(0, 0, 'PAUSED', { fontFamily: 'bold Arial', fontSize: 120, color: '#ffffff' });
        panel.add(pauseText, "TopCenter", 0, -200);

        // Set up the home button
        const homeButton = new UiImageButton(this.scene, 0, 0, 'icon-button-large-red-square');
        homeButton.setScale(0.8);
        panel.add(homeButton, "BottomLeft", -150, -100);

        const homeIcon = this.scene.add.image(0, 0, 'icon-small-white-outline-home');
        homeIcon.setScale(1.2);
        homeButton.add(homeIcon, "Center");

        homeButton.on(UiImageButton.BUTTON_UP_EVENT, () => {
            this.scene.time.delayedCall(700, () => this.scene.scene.start('MenuScene'));
            this.blackSceneTransition.emit(BlackUiImage.BLACK_UI_IMAGE_DISABLE_EVENT);
        });
        TweenUtilities.applyTintTweens(homeButton, UiImageButton.BUTTON_DOWN_EVENT, [UiImageButton.BUTTON_UP_EVENT, UiImageButton.BUTTON_REST_EVENT], 0xffffff, 0xb8b8b8, 200);
        TweenUtilities.applyScaleTweens(homeButton, UiImageButton.BUTTON_HOVER_EVENT, UiImageButton.BUTTON_REST_EVENT, homeButton.scaleX, homeButton.scaleY, 1.1, 100);
        homeButton.on(UiImageButton.BUTTON_DOWN_EVENT, () => {
            this.audioController.playSound('button-down');
        });



        // Set up the settings button
        const restartButton = new UiImageButton(this.scene, 0, 0, 'icon-button-large-blue-square');
        restartButton.setScale(0.8);
        panel.add(restartButton, "BottomCenter", 0, -100); // Swapped position to BottomLeft

        const restartIcon = this.scene.add.image(0, 0, 'icon-small-white-outline-return');
        restartIcon.setScale(1.2);
        restartButton.add(restartIcon, "Center");

        restartButton.on(UiImageButton.BUTTON_UP_EVENT, () => {
            this.scene.time.delayedCall(700, () => this.scene.scene.start('GameScene'));
            this.blackSceneTransition.emit(BlackUiImage.BLACK_UI_IMAGE_DISABLE_EVENT);
        });
        TweenUtilities.applyTintTweens(restartButton, UiImageButton.BUTTON_DOWN_EVENT, [UiImageButton.BUTTON_UP_EVENT, UiImageButton.BUTTON_REST_EVENT], 0xffffff, 0xb8b8b8, 200);
        TweenUtilities.applyScaleTweens(restartButton, UiImageButton.BUTTON_HOVER_EVENT, UiImageButton.BUTTON_REST_EVENT, restartButton.scaleX, restartButton.scaleY, 1.1, 100);
        restartButton.on(UiImageButton.BUTTON_DOWN_EVENT, () => {
            this.audioController.playSound('button-down');
        });


        // Set up the resume button
        const resumeButton = new UiImageButton(this.scene, 0, 0, 'icon-button-large-green-square');
        resumeButton.setScale(0.8);
        panel.add(resumeButton, "BottomRight", -150, -100); // Swapped position to BottomRight

        const resumeIcon = this.scene.add.image(0, 0, 'icon-small-white-outline-arrow');
        resumeIcon.setScale(1.2);
        resumeButton.add(resumeIcon, "Center");

        resumeButton.on(UiImageButton.BUTTON_UP_EVENT, this.hidePauseUi, this);
        TweenUtilities.applyTintTweens(resumeButton, UiImageButton.BUTTON_DOWN_EVENT, [UiImageButton.BUTTON_UP_EVENT, UiImageButton.BUTTON_REST_EVENT], 0xffffff, 0xb8b8b8, 200);
        TweenUtilities.applyScaleTweens(resumeButton, UiImageButton.BUTTON_HOVER_EVENT, UiImageButton.BUTTON_REST_EVENT, resumeButton.scaleX, resumeButton.scaleY, 1.1, 100);
        resumeButton.on(UiImageButton.BUTTON_DOWN_EVENT, () => {
            this.audioController.playSound('button-down');
        });

        let musicBarUi = new MusicBarUi(this.scene, 0, 0, 'icon-large-music-blank', 'icon-large-music-off-blank', true);
        panel.add(musicBarUi, "BottomCenter", 0, -700);

        let soundBarUi = new MusicBarUi(this.scene, 0, 0, 'icon-large-audio-blank', 'icon-large-audio-off-blank', false);
        panel.add(soundBarUi, "BottomCenter", 0, -1000);



    }

    private createWinUi() : void {
        this.winUi = new UiContainer(this.scene, 0, 0);
        this.winUi.setSize(this.scene.scale.width, this.scene.scale.height);
        this.winUi.setPosition(this.scene.scale.width/2, this.scene.scale.height/2);
        this.winUi.setDepth(1000);

        const panel = new UiImage(this.scene, 0, 0, 'box-white-outline-rounded');
        panel.setScale(0.5);
        this.winUi.add(panel, "Center");

        const winText = this.scene.add.text(0, 0, 'VICTORY', { fontFamily: 'bold Arial', fontSize: 200, color: '#dbb337' });
        panel.add(winText, "TopCenter", 0, -200);

        let scoreCounter = this.scene.data.get(ScoreCounter.SCORE_COUNTER_KEY) as ScoreCounter;

        const scoreText = this.scene.add.text(0, 0, `Score: 0`, { fontFamily: 'bold Arial', fontSize: 140, color: '#ffffff' });
        panel.add(scoreText, "Center", 0, -200);

        scoreCounter.on(ScoreCounter.SCORE_CHANGE_EVENT, (fromScore : number, toScore : number) => {
            scoreText.setText(`Score: ${toScore}`);
        });

        const highScoreText = this.scene.add.text(0, 0, `High Score: ${scoreCounter.loadHighScore()}`, { fontFamily: 'bold Arial', fontSize: 140, color: '#ffffff' });
        panel.add(highScoreText, "Center", 0, 100);

        scoreCounter.on(ScoreCounter.HIGH_SCORE_CHANGE_EVENT, (highScore : number) => {
            highScoreText.setText(`High Score: ${highScore}`);
        });


        // Set up the home button
        const homeButton = new UiImageButton(this.scene, 0, 0, 'icon-button-large-red-square');
        homeButton.setScale(0.8);
        panel.add(homeButton, "BottomCenter", -350, -100);

        const homeIcon = this.scene.add.image(0, 0, 'icon-small-white-outline-home');
        homeIcon.setScale(1.2);
        homeButton.add(homeIcon, "Center");

        homeButton.on(UiImageButton.BUTTON_UP_EVENT, () => {
            this.scene.time.delayedCall(700, () => this.scene.scene.start('MenuScene'));
            this.blackSceneTransition.emit(BlackUiImage.BLACK_UI_IMAGE_DISABLE_EVENT);
        });
        TweenUtilities.applyTintTweens(homeButton, UiImageButton.BUTTON_DOWN_EVENT, [UiImageButton.BUTTON_UP_EVENT, UiImageButton.BUTTON_REST_EVENT], 0xffffff, 0xb8b8b8, 200);
        TweenUtilities.applyScaleTweens(homeButton, UiImageButton.BUTTON_HOVER_EVENT, UiImageButton.BUTTON_REST_EVENT, homeButton.scaleX, homeButton.scaleY, 1.1, 100);
        homeButton.on(UiImageButton.BUTTON_DOWN_EVENT, () => {
            this.audioController.playSound('button-down');
        });


        // Set up the settings button
        const restartButton = new UiImageButton(this.scene, 0, 0, 'icon-button-large-blue-square');
        restartButton.setScale(0.8);
        panel.add(restartButton, "BottomCenter", 350, -100); // Swapped position to BottomLeft

        const restartIcon = this.scene.add.image(0, 0, 'icon-small-white-outline-return');
        restartIcon.setScale(1.2);
        restartButton.add(restartIcon, "Center");

        restartButton.on(UiImageButton.BUTTON_UP_EVENT, () => {
            this.scene.time.delayedCall(700, () => this.scene.scene.start('GameScene'));
            this.blackSceneTransition.emit(BlackUiImage.BLACK_UI_IMAGE_DISABLE_EVENT);
        });
        TweenUtilities.applyTintTweens(restartButton, UiImageButton.BUTTON_DOWN_EVENT, [UiImageButton.BUTTON_UP_EVENT, UiImageButton.BUTTON_REST_EVENT], 0xffffff, 0xb8b8b8, 200);
        TweenUtilities.applyScaleTweens(restartButton, UiImageButton.BUTTON_HOVER_EVENT, UiImageButton.BUTTON_REST_EVENT, restartButton.scaleX, restartButton.scaleY, 1.1, 100);
        restartButton.on(UiImageButton.BUTTON_DOWN_EVENT, () => {
            this.audioController.playSound('button-down');
        });

        this.winUi.setVisible(false);
    }


    private createLoseUi() : void {
        this.loseUi = new UiContainer(this.scene, 0, 0);
        this.loseUi.setSize(this.scene.scale.width, this.scene.scale.height);
        this.loseUi.setPosition(this.scene.scale.width/2, this.scene.scale.height/2);
        this.loseUi.setDepth(1000);

        const panel = new UiImage(this.scene, 0, 0, 'box-white-outline-rounded');
        panel.setScale(0.5);
        this.loseUi.add(panel, "Center");

        const loseText = this.scene.add.text(0, 0, 'DEFEATED', { fontFamily: 'bold Arial', fontSize: 200, color: '#612221' });
        panel.add(loseText, "TopCenter", 0, -200);

        let scoreCounter = this.scene.data.get(ScoreCounter.SCORE_COUNTER_KEY) as ScoreCounter;

        const scoreText = this.scene.add.text(0, 0, `Score: 0`, { fontFamily: 'bold Arial', fontSize: 140, color: '#ffffff' });
        panel.add(scoreText, "Center", 0, -200);

        scoreCounter.on(ScoreCounter.SCORE_CHANGE_EVENT, (fromScore : number, toScore : number) => {
            scoreText.setText(`Score: ${toScore}`);
        });

        const highScoreText = this.scene.add.text(0, 0, `High Score: ${scoreCounter.loadHighScore()}`, { fontFamily: 'bold Arial', fontSize: 140, color: '#ffffff' });
        panel.add(highScoreText, "Center", 0, 100);

        scoreCounter.on(ScoreCounter.HIGH_SCORE_CHANGE_EVENT, (highScore : number) => {
            highScoreText.setText(`High Score: ${highScore}`);
        });


        // Set up the home button
        const homeButton = new UiImageButton(this.scene, 0, 0, 'icon-button-large-red-square');
        homeButton.setScale(0.8);
        panel.add(homeButton, "BottomCenter", -350, -100);

        const homeIcon = this.scene.add.image(0, 0, 'icon-small-white-outline-home');
        homeIcon.setScale(1.2);
        homeButton.add(homeIcon, "Center");

        homeButton.on(UiImageButton.BUTTON_UP_EVENT, () => {
            this.scene.time.delayedCall(700, () => this.scene.scene.start('MenuScene'));
            this.blackSceneTransition.emit(BlackUiImage.BLACK_UI_IMAGE_DISABLE_EVENT);
        });
        TweenUtilities.applyTintTweens(homeButton, UiImageButton.BUTTON_DOWN_EVENT, [UiImageButton.BUTTON_UP_EVENT, UiImageButton.BUTTON_REST_EVENT], 0xffffff, 0xb8b8b8, 200);
        TweenUtilities.applyScaleTweens(homeButton, UiImageButton.BUTTON_HOVER_EVENT, UiImageButton.BUTTON_REST_EVENT, homeButton.scaleX, homeButton.scaleY, 1.1, 100);
        homeButton.on(UiImageButton.BUTTON_DOWN_EVENT, () => {
            this.audioController.playSound('button-down');
        });


        // Set up the settings button
        const restartButton = new UiImageButton(this.scene, 0, 0, 'icon-button-large-blue-square');
        restartButton.setScale(0.8);
        panel.add(restartButton, "BottomCenter", 350, -100); // Swapped position to BottomLeft

        const restartIcon = this.scene.add.image(0, 0, 'icon-small-white-outline-return');
        restartIcon.setScale(1.2);
        restartButton.add(restartIcon, "Center");

        restartButton.on(UiImageButton.BUTTON_UP_EVENT, () => {
            this.scene.time.delayedCall(700, () => this.scene.scene.start('GameScene'));
            this.blackSceneTransition.emit(BlackUiImage.BLACK_UI_IMAGE_DISABLE_EVENT);
        });
        TweenUtilities.applyTintTweens(restartButton, UiImageButton.BUTTON_DOWN_EVENT, [UiImageButton.BUTTON_UP_EVENT, UiImageButton.BUTTON_REST_EVENT], 0xffffff, 0xb8b8b8, 200);
        TweenUtilities.applyScaleTweens(restartButton, UiImageButton.BUTTON_HOVER_EVENT, UiImageButton.BUTTON_REST_EVENT, restartButton.scaleX, restartButton.scaleY, 1.1, 100);
        restartButton.on(UiImageButton.BUTTON_DOWN_EVENT, () => {
            this.audioController.playSound('button-down');
        });

        let enemyCounter = this.scene.data.get(EnemyCounter.ENEMY_COUNTER_KEY) as EnemyCounter;
        enemyCounter.on(EnemyCounter.PLAYER_DIED_EVENT, () => {
            this.showLoseUi();
        });

        this.loseUi.setVisible(false);
    }


    private createOverlayUi() {
        let overlayUi = new UiContainer(this.scene, 0, 0);
        overlayUi.setSize(this.scene.scale.width, this.scene.scale.height);
        overlayUi.setPosition(this.scene.scale.width/2, this.scene.scale.height/2);
        overlayUi.setDepth(1100);
        this.overlayUi = overlayUi;
        

        const skullIcon = new UiImage(this.scene, 0, 0, 'skull');
        skullIcon.setScale(0.25);
        overlayUi.add(skullIcon, "TopCenter", -50, 80);

        const counterText = this.scene.add.text(0, 0, '0/7', { fontFamily: 'bold Arial', fontSize: 60, color: '#ffffff' });
        overlayUi.add(counterText, "TopCenter", 50, -40);

        const enemyCounter = this.scene.data.get(EnemyCounter.ENEMY_COUNTER_KEY) as EnemyCounter;
        enemyCounter.on(EnemyCounter.ENEMY_DESTROYED_EVENT, (enemies : Enemy[], maxEnemies : number) => {
            counterText.setText(`${maxEnemies - enemies.length}/${maxEnemies}`);
            this.checkWin(enemies);
        });

        
        let scoreCounter = this.scene.data.get(ScoreCounter.SCORE_COUNTER_KEY) as ScoreCounter;

        const scoreText = this.scene.add.text(0, 0, `Score: 0`, { fontFamily: 'bold Arial', fontSize: 60, color: '#ffffff' });
        overlayUi.add(scoreText, "TopRight", 130, -40);
        scoreText.setOrigin(1, 0); // Set origin to the top right

        scoreCounter.on(ScoreCounter.SCORE_CHANGE_EVENT, (fromScore : number, toScore : number) => {
            scoreText.setText(`Score: ${toScore}`);
        });

    }

    private initializeSceneLoad() {
        this.playUi.setVisible(true);
        this.pauseUi.setVisible(false);
        // this.settingUi.setVisible(false);
        // this.loseUi.setVisible(false);
        // this.winUi.setVisible(false);

        this.blackSceneTransition.emit(BlackUiImage.BLACK_UI_IMAGE_ENABLE_EVENT);

    }

    private checkWin(enemies : Enemy[]){
        if (enemies.length === 0) {
                
            let scoreCounter = this.scene.data.get(ScoreCounter.SCORE_COUNTER_KEY) as ScoreCounter;
            scoreCounter.saveHighScore();
            this.showWinUi();
        }
    }
    
    private showPauseUi() {
        // Ensure the pause UI and the black background are initially invisible
        this.pauseUi.setVisible(true);
        this.playUi.setVisible(false);

        
        this.pauseController.setObjectFromScene(this.scene);
        this.pauseController.pause();

        this.blackBackground.emit(BlackUiImage.BLACK_UI_IMAGE_ENABLE_EVENT);
    }

    private hidePauseUi() {
        this.pauseUi.setVisible(false);
        this.playUi.setVisible(true);

        this.pauseController.resume();

        this.blackBackground.emit(BlackUiImage.BLACK_UI_IMAGE_DISABLE_EVENT);
    }


    private showLoseUi() {
    
        let youDiedText = this.scene.add.text(this.scene.scale.width/2,this.scene.scale.height/2,  'YOU DIED', {
            fontFamily: '"Times New Roman", Times, serif',
            fontSize: '74px',
            color: '#612221',
            fontStyle: 'bold'
        }).setOrigin(0.5).setAlpha(0).setDepth(1000).setScrollFactor(0);
        //this.overlayUi.add(youDiedText, "Center");
        
        let blackBanner = this.scene.add.image(this.scene.scale.width/2,this.scene.scale.height/2, 'black')
        blackBanner.setDisplaySize(this.scene.scale.width, 300);
        blackBanner.setDepth(999);
        blackBanner.setAlpha(0);
        blackBanner.setScrollFactor(0);
        //this.overlayUi.add(blackBanner, "Center");
        

        this.blackBackground.emit(BlackUiImage.BLACK_UI_IMAGE_ENABLE_EVENT);
        


        this.scene.tweens.chain({
            tweens: [
                {
                    targets: [youDiedText, blackBanner],
                    alpha: { from: 0, to: 1 },
                    ease: Phaser.Math.Easing.Back.Out,
                    duration: 200,
                    hold: 2000, // Hold the full alpha for 2 seconds
                },
                {
                    targets: [ youDiedText, blackBanner],
                    alpha: { from: 1, to: 0 },
                    ease:  Phaser.Math.Easing.Linear,
                    duration: 1000,
                }
            ],

            
            onComplete: () => {
                // Once the tween is complete, make the winUi visible
                this.loseUi.setVisible(true);
                youDiedText.destroy();
                blackBanner.destroy();

                this.overlayUi.setVisible(false);
                this.pauseController.setObjectFromScene(this.scene);
                this.pauseController.pause();
            }
        });


        this.playUi.setVisible(false);
        
    }


    
    private showWinUi() {
        
        let winnerImage = new UiImage(this.scene, 0, 0, 'winner-winner-chicken-dinner');
        winnerImage.setScale(0);
        winnerImage.setDepth(1000);
        this.overlayUi.add(winnerImage, "Center");

        this.blackBackground.emit(BlackUiImage.BLACK_UI_IMAGE_ENABLE_EVENT);
    
        this.scene.tweens.chain({
            tweens: [
                {
                    targets: winnerImage,
                    scale: {from : 0, to : 1.5}, // Target scale
                    ease: Phaser.Math.Easing.Back.Out, // Easing function
                    duration: 1000, // Duration of the tween in milliseconds
                },
                {
                    delay: 1000,
                    targets: winnerImage,
                    scale: {from : 1.5, to : 0}, // Target scale
                    alpha: {from : 1, to : 0}, // Target scale
                    ease: Phaser.Math.Easing.Cubic.In, // Easing function
                    duration: 500, // Duration of the tween in milliseconds
                }
            ],

            
            onComplete: () => {
                // Once the tween is complete, make the winUi visible
                this.winUi.setVisible(true);
                winnerImage.destroy();

                this.overlayUi.setVisible(false);
                this.pauseController.setObjectFromScene(this.scene);
                this.pauseController.pause();
            }
        });


        this.playUi.setVisible(false);
        
    }


}



export default GameUi;