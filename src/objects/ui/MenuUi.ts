import { GameObjects } from "phaser";
import PauseController from "../../ultilities/pause/PauseGroup";
import TweenUtilities from "../../ultilities/TweenUtilities";
import UiContainer from "../../ultilities/ui/UiContainer";
import UiImageButton from "../../ultilities/ui/UiImageButton";
import UiImage from "../../ultilities/ui/UiImage";
import BlackUiImage from "./BlackUiImage";

class MenuUi extends GameObjects.Graphics {
    
    private menuUi : UiContainer;
    private settingUi : UiContainer;

    private blackSceneTransition: BlackUiImage;

    
    constructor(scene: Phaser.Scene) {
        super(scene);
           
        scene.add.existing(this);

        this.createPlayUi();
       

        this.createBlackBackground(scene);
     
    }


    private createPlayUi(){
            // Main menu UI container
        this.menuUi = new UiContainer(this.scene, 0, 0);
        this.menuUi.setSize(this.scene.scale.width, this.scene.scale.height);
        this.menuUi.setPosition(this.scene.scale.width / 2, this.scene.scale.height / 2);
        this.menuUi.setDepth(1000);

        // Background image
        const background = new UiImage(this.scene, 0, 0, 'splash-art');
        background.setDisplaySize(this.scene.scale.width, this.scene.scale.height);
        this.menuUi.add(background, "Center");

        // Play button
        const playButton = new UiImageButton(this.scene, 0, 0, 'button-text-small-green-round');
        playButton.setScale(0.8);
        this.menuUi.add(playButton, "BottomLeft", -90, -400);

        const playText = this.scene.add.text(0, 0, 'PLAY', { 
            fontSize: '67px', 
            color: '#ffffff', 
            fontStyle: 'bold', 
            fontFamily: 'Arial' 
        });
        playButton.add(playText, "Center");

        playButton.on(UiImageButton.BUTTON_UP_EVENT, () => {
            this.scene.time.delayedCall(400, () => this.scene.scene.start('GameScene'));
            this.blackSceneTransition.emit(BlackUiImage.BLACK_UI_IMAGE_DISABLE_EVENT);
        });

        // Settings button
        const settingsButton = new UiImageButton(this.scene, 0, 0, 'button-text-small-blue-round');
        settingsButton.setScale(0.8);
        this.menuUi.add(settingsButton, "BottomLeft", -90, -100);

        const settingsText = this.scene.add.text(0, 0, 'SETTINGS', { 
            fontSize: '67px', 
            color: '#ffffff', 
            fontStyle: 'bold', 
            fontFamily: 'Arial' 
        });
        settingsButton.add(settingsText, "Center");

        settingsButton.on(UiImageButton.BUTTON_UP_EVENT, this.showSettingsUi, this);

        // Optionally, apply tint tweens to buttons for visual feedback
        // Assuming TweenUtilities and UiImageButton are part of your project's utilities
        TweenUtilities.applyTintTweens(playButton, UiImageButton.BUTTON_DOWN_EVENT, [UiImageButton.BUTTON_UP_EVENT, UiImageButton.BUTTON_REST_EVENT], 0xffffff, 0xb8b8b8, 200);
        TweenUtilities.applyScaleTweens(playButton, UiImageButton.BUTTON_HOVER_EVENT, UiImageButton.BUTTON_REST_EVENT, playButton.scaleX, playButton.scaleY, 1.1, 100);
        
        TweenUtilities.applyTintTweens(settingsButton, UiImageButton.BUTTON_DOWN_EVENT, [UiImageButton.BUTTON_UP_EVENT, UiImageButton.BUTTON_REST_EVENT], 0xffffff, 0xb8b8b8, 200);
        TweenUtilities.applyScaleTweens(settingsButton, UiImageButton.BUTTON_HOVER_EVENT, UiImageButton.BUTTON_REST_EVENT, settingsButton.scaleX, settingsButton.scaleY, 1.1, 100);
    }

    private showSettingsUi() {
        this.settingUi.setVisible(true);
        this.menuUi.setVisible(false);


    }

    
    private createBlackBackground(scene: Phaser.Scene) {
        this.blackSceneTransition = new BlackUiImage(scene, 1, 0, 400);
        this.blackSceneTransition.setDepth(2000);

        this.blackSceneTransition.emit(BlackUiImage.BLACK_UI_IMAGE_ENABLE_EVENT);
    }



}



export default MenuUi;