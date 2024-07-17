import { GameObjects } from "phaser";
import PauseController from "../../ultilities/pause/PauseGroup";
import TweenUtilities from "../../ultilities/TweenUtilities";
import UiContainer from "../../ultilities/ui/UiContainer";
import UiImageButton from "../../ultilities/ui/UiImageButton";
import UiImage from "../../ultilities/ui/UiImage";

class MenuUi extends GameObjects.Graphics {
    
    private menuUi : UiContainer;
    private settingUi : UiContainer;

    // Black background to cover the game when the pause menu is shown
    private blackBackground : UiImage;
    private static readonly BLACK_BACKGROUND_ENABLE_EVENT = "blackBackgroundEnable";
    private static readonly BLACK_BACKGROUND_DISABLE_EVENT = "blackBackgroundDisable";


    
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

        playButton.on(UiImageButton.BUTTON_UP_EVENT, () => { this.scene.scene.start('GameScene'); });

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
        TweenUtilities.applyTintTweens(settingsButton, UiImageButton.BUTTON_DOWN_EVENT, [UiImageButton.BUTTON_UP_EVENT, UiImageButton.BUTTON_REST_EVENT], 0xffffff, 0xb8b8b8, 200);
    }

    private showSettingsUi() {
        this.settingUi.setVisible(true);
        this.menuUi.setVisible(false);


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

        TweenUtilities.applyAlphaTweens(this.blackBackground, [MenuUi.BLACK_BACKGROUND_ENABLE_EVENT], [MenuUi.BLACK_BACKGROUND_DISABLE_EVENT], 0, 0.4, 200);
    }



}



export default MenuUi;