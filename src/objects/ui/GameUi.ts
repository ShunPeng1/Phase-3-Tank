import { GameObjects } from "phaser";
import PauseController from "../../ultilities/pause/PauseGroup";
import TweenUtilities from "../../ultilities/TweenUtilities";
import UiContainer from "../../ultilities/ui/UiContainer";
import UiImageButton from "../../ultilities/ui/UiImageButton";
import UiImage from "../../ultilities/ui/UiImage";

class GameUi extends GameObjects.Graphics {
    private pauseController : PauseController;
    
    private playUi : UiContainer;
    private pauseUi : UiContainer;
    private settingUi : UiContainer;
    private loseUi : UiContainer;
    private winUi : UiContainer;

    // Black background to cover the game when the pause menu is shown
    private blackBackground : UiImage;
    private static readonly BLACK_BACKGROUND_ENABLE_EVENT = "blackBackgroundEnable";
    private static readonly BLACK_BACKGROUND_DISABLE_EVENT = "blackBackgroundDisable";


    
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene);
           
        scene.add.existing(this);

        this.createPlayUi();
       
        this.createPauseUi();

        this.createBlackBackground(scene);

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


        // Set up the home button
        const homeButton = new UiImageButton(this.scene, 0, 0, 'icon-button-large-red-square');
        homeButton.setScale(0.8);
        panel.add(homeButton, "BottomLeft", -150, -100);

        const homeIcon = this.scene.add.image(0, 0, 'icon-small-white-outline-home');
        homeIcon.setScale(1.2);
        homeButton.add(homeIcon, "Center");

        homeButton.on(UiImageButton.BUTTON_UP_EVENT, () => {this.scene.scene.start('MenuScene')});
        TweenUtilities.applyTintTweens(homeButton, UiImageButton.BUTTON_DOWN_EVENT, [UiImageButton.BUTTON_UP_EVENT, UiImageButton.BUTTON_REST_EVENT], 0xffffff, 0xb8b8b8, 200);
        
        // Set up the settings button
        const settingButton = new UiImageButton(this.scene, 0, 0, 'icon-button-large-blue-square');
        settingButton.setScale(0.8);
        panel.add(settingButton, "BottomCenter", 0, -100); // Swapped position to BottomLeft

        const settingIcon = this.scene.add.image(0, 0, 'icon-small-white-outline-menu');
        settingIcon.setScale(1.2);
        settingButton.add(settingIcon, "Center");

        settingButton.on(UiImageButton.BUTTON_UP_EVENT, this.showSettingUi, this);
        TweenUtilities.applyTintTweens(settingButton, UiImageButton.BUTTON_DOWN_EVENT, [UiImageButton.BUTTON_UP_EVENT, UiImageButton.BUTTON_REST_EVENT], 0xffffff, 0xb8b8b8, 200);


        // Set up the resume button
        const resumeButton = new UiImageButton(this.scene, 0, 0, 'icon-button-large-green-square');
        resumeButton.setScale(0.8);
        panel.add(resumeButton, "BottomRight", -150, -100); // Swapped position to BottomRight

        const resumeIcon = this.scene.add.image(0, 0, 'icon-small-white-outline-arrow');
        resumeIcon.setScale(1.2);
        resumeButton.add(resumeIcon, "Center");

        resumeButton.on(UiImageButton.BUTTON_UP_EVENT, this.hidePauseUi, this);
        TweenUtilities.applyTintTweens(resumeButton, UiImageButton.BUTTON_DOWN_EVENT, [UiImageButton.BUTTON_UP_EVENT, UiImageButton.BUTTON_REST_EVENT], 0xffffff, 0xb8b8b8, 200);

        this.pauseUi.setVisible(false);
    }

    
    private createBlackBackground(scene: Phaser.Scene) {
        const graphics = new GameObjects.Graphics(scene,{ fillStyle: { color: 0x000000 } });

        graphics.fillRect(0, 0, scene.scale.width, scene.scale.height);

        const textureName = 'blackBackground';
        graphics.generateTexture(textureName, scene.scale.width, scene.scale.height);


        this.blackBackground = new UiImage(scene, 0, 0, textureName);
        this.blackBackground.setSize(scene.scale.width, scene.scale.height);
        this.blackBackground.setPosition(scene.scale.width / 2, scene.scale.height / 2);
        this.blackBackground.setDepth(999);
        this.blackBackground.setAlpha(0);

        TweenUtilities.applyAlphaTweens(this.blackBackground, [GameUi.BLACK_BACKGROUND_ENABLE_EVENT], [GameUi.BLACK_BACKGROUND_DISABLE_EVENT], 0, 0.4, 200);
    }

    private showPauseUi() {
        // Ensure the pause UI and the black background are initially invisible
        this.pauseUi.setVisible(true);
        this.playUi.setVisible(false);


        
        this.pauseController.setObjectFromScene(this.scene);
        this.pauseController.pause();

        this.blackBackground.emit(GameUi.BLACK_BACKGROUND_ENABLE_EVENT);
    }

    private hidePauseUi() {
        this.pauseUi.setVisible(false);
        this.playUi.setVisible(true);

        this.pauseController.resume();

        this.blackBackground.emit(GameUi.BLACK_BACKGROUND_DISABLE_EVENT);
    }

    private showSettingUi() {
        this.settingUi.setVisible(true);
        this.pauseUi.setVisible(true);
    }

    private showLoseUi() {
        this.loseUi.setVisible(true);
        this.playUi.setVisible(false);
    }

    private showWinUi() {
        this.winUi.setVisible(true);
        this.playUi.setVisible(false);
    }

}



export default GameUi;