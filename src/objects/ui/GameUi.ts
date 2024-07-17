import { GameObjects } from "phaser";
import PauseController from "../../ultilities/pause/PauseController";
import TweenUtilities from "../../ultilities/TweenUtilities";
import UiContainer from "../../ultilities/ui/UiContainer";
import UiImageButton from "../../ultilities/ui/UiImageButton";
import UiImage from "../../ultilities/ui/UiImage";
import BlackUiImage from "./BlackUiImage";
import UiImageSlider from "../../ultilities/ui/UiImageSlider";
import MusicBarUi from "./MusicSliderUi";

class GameUi extends GameObjects.Graphics {
    private pauseController : PauseController;
    
    private playUi : UiContainer;
    private pauseUi : UiContainer;
    //private settingUi : UiContainer;
    //private loseUi : UiContainer;
    //private winUi : UiContainer;

    // Black background to cover the game when the pause menu is shown
    private blackBackground : BlackUiImage;
    private blackSceneTransition : BlackUiImage;
    
    
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene);
           
        scene.add.existing(this);

        this.createPlayUi();
       
        this.createPauseUi();

        this.blackBackground = new BlackUiImage(scene, 0, 0.4, 200);
        this.blackBackground.setDepth(999);

        this.blackSceneTransition = new BlackUiImage(scene, 1, 0, 700);
        this.blackSceneTransition.setDepth(2000);

        this.pauseController = new PauseController(scene, []);        

        this.initializeSceneLoad();
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

        // Set up the settings button
        const settingButton = new UiImageButton(this.scene, 0, 0, 'icon-button-large-blue-square');
        settingButton.setScale(0.8);
        panel.add(settingButton, "BottomCenter", 0, -100); // Swapped position to BottomLeft

        const settingIcon = this.scene.add.image(0, 0, 'icon-small-white-outline-return');
        settingIcon.setScale(1.2);
        settingButton.add(settingIcon, "Center");

        settingButton.on(UiImageButton.BUTTON_UP_EVENT, () => {
            this.scene.time.delayedCall(700, () => this.scene.scene.start('GameScene'));
            this.blackSceneTransition.emit(BlackUiImage.BLACK_UI_IMAGE_DISABLE_EVENT);
        });
        TweenUtilities.applyTintTweens(settingButton, UiImageButton.BUTTON_DOWN_EVENT, [UiImageButton.BUTTON_UP_EVENT, UiImageButton.BUTTON_REST_EVENT], 0xffffff, 0xb8b8b8, 200);
        TweenUtilities.applyScaleTweens(settingButton, UiImageButton.BUTTON_HOVER_EVENT, UiImageButton.BUTTON_REST_EVENT, settingButton.scaleX, settingButton.scaleY, 1.1, 100);

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


        let musicBarUi = new MusicBarUi(this.scene, 0, 0, 'icon-large-music-blank', 'icon-large-music-off-blank');
        panel.add(musicBarUi, "BottomCenter", 0, -700);

        let soundBarUi = new MusicBarUi(this.scene, 0, 0, 'icon-large-audio-blank', 'icon-large-audio-off-blank');
        panel.add(soundBarUi, "BottomCenter", 0, -1000);



    }

    private initializeSceneLoad() {
        this.playUi.setVisible(true);
        this.pauseUi.setVisible(false);
        // this.settingUi.setVisible(false);
        // this.loseUi.setVisible(false);
        // this.winUi.setVisible(false);

        this.blackSceneTransition.emit(BlackUiImage.BLACK_UI_IMAGE_ENABLE_EVENT);
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

    private showSettingUi() {
        //this.settingUi.setVisible(true);
        this.pauseUi.setVisible(true);
    }

    private showLoseUi() {
        //this.loseUi.setVisible(true);
        this.playUi.setVisible(false);
    }

    private showWinUi() {
        //this.winUi.setVisible(true);
        this.playUi.setVisible(false);
    }

}



export default GameUi;