import { GameObjects } from "phaser";
import PauseController from "../../ultilities/pause/PauseController";
import TweenUtilities from "../../ultilities/TweenUtilities";
import UiContainer from "../../ultilities/ui/UiContainer";
import UiImageButton from "../../ultilities/ui/UiImageButton";
import UiImage from "../../ultilities/ui/UiImage";
import BlackUiImage from "./BlackUiImage";
import AudioController from "../../ultilities/audio/AudioController";
import MusicBarUi from "./MusicSliderUi";

class MenuUi extends GameObjects.Graphics {
    private audioController: AudioController;


    private menuUi : UiContainer;
    private settingUi : UiContainer;

    private blackSceneTransition: BlackUiImage;

    private playButton: UiImageButton;
    private settingsButton: UiImageButton;

    
    public static readonly SETTINGS_UI_SHOW_EVENT = 'settingsUiShow';
    public static readonly SETTINGS_UI_HIDE_EVENT = 'settingsUiHide';

    constructor(scene: Phaser.Scene) {
        super(scene);
           
        scene.add.existing(this);

        this.audioController = this.scene.data.get(AudioController.AUDIO_CONTROLLER_KEY) as AudioController;

        this.createPlayUi();
        this.createSettingUi();

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

        
        this.playButton = playButton;
        this.settingsButton = settingsButton;

        
        playButton.on(UiImageButton.BUTTON_UP_EVENT, () => {
            this.scene.time.delayedCall(400, () => this.scene.scene.start('GameScene'));
            this.blackSceneTransition.emit(BlackUiImage.BLACK_UI_IMAGE_DISABLE_EVENT);
        });
        TweenUtilities.applyTintTweens(playButton, UiImageButton.BUTTON_DOWN_EVENT, [UiImageButton.BUTTON_UP_EVENT, UiImageButton.BUTTON_REST_EVENT], 0xffffff, 0xb8b8b8, 200);
        TweenUtilities.applyScaleTweens(playButton, UiImageButton.BUTTON_HOVER_EVENT, UiImageButton.BUTTON_REST_EVENT, playButton.scaleX, playButton.scaleY, 1.1, 100);
        playButton.on(UiImageButton.BUTTON_UP_EVENT, () => {
            this.audioController.playSound('button-down');
        });

        settingsButton.on(UiImageButton.BUTTON_UP_EVENT, this.showSettingsUi, this);
        TweenUtilities.applyTintTweens(settingsButton, UiImageButton.BUTTON_DOWN_EVENT, [UiImageButton.BUTTON_UP_EVENT, UiImageButton.BUTTON_REST_EVENT], 0xffffff, 0xb8b8b8, 200);
        TweenUtilities.applyScaleTweens(settingsButton, UiImageButton.BUTTON_HOVER_EVENT, UiImageButton.BUTTON_REST_EVENT, settingsButton.scaleX, settingsButton.scaleY, 1.1, 100);
        settingsButton.on(UiImageButton.BUTTON_UP_EVENT, () => {
            this.audioController.playSound('button-down');
        });
    
    }

    
    private createSettingUi() {
        this.settingUi = new UiContainer(this.scene, 0, 0);
        this.settingUi.setSize(this.scene.scale.width, this.scene.scale.height);
        this.settingUi.setPosition(this.scene.scale.width/2, this.scene.scale.height*3/2);
        this.settingUi.setDepth(1000);
        

        const panel = new UiImage(this.scene, 0, 0, 'box-white-outline-rounded');
        panel.setScale(0.5);
        this.settingUi.add(panel, "Center");

        const settingText = this.scene.add.text(0, 0, 'SETTINGS', { fontFamily: 'bold Arial', fontSize: 120, color: '#ffffff' });
        panel.add(settingText, "TopCenter", 0, -200);

        // Set up the home button
        const escapeButton = new UiImageButton(this.scene, 0, 0, 'icon-button-large-red-square');
        escapeButton.setScale(0.8);
        panel.add(escapeButton, "BottomCenter", 0, -100);

        const escapeIcon = this.scene.add.image(0, 0, 'icon-small-white-outline-x');
        escapeIcon.setScale(1.2);
        escapeButton.add(escapeIcon, "Center");

        escapeButton.on(UiImageButton.BUTTON_UP_EVENT,this.hideSettingUi, this);
        TweenUtilities.applyTintTweens(escapeButton, UiImageButton.BUTTON_DOWN_EVENT, [UiImageButton.BUTTON_UP_EVENT, UiImageButton.BUTTON_REST_EVENT], 0xffffff, 0xb8b8b8, 200);
        TweenUtilities.applyScaleTweens(escapeButton, UiImageButton.BUTTON_HOVER_EVENT, UiImageButton.BUTTON_REST_EVENT, escapeButton.scaleX, escapeButton.scaleY, 1.1, 100);
        escapeButton.on(UiImageButton.BUTTON_DOWN_EVENT, () => {
            this.audioController.playSound('button-down');
        });


        
        let musicBarUi = new MusicBarUi(this.scene, 0, 0, 'icon-large-music-blank', 'icon-large-music-off-blank', true);
        panel.add(musicBarUi, "BottomCenter", 0, -700);

        let soundBarUi = new MusicBarUi(this.scene, 0, 0, 'icon-large-audio-blank', 'icon-large-audio-off-blank', false);
        panel.add(soundBarUi, "BottomCenter", 0, -1000);


        TweenUtilities.applyPositionTweens(this.settingUi, MenuUi.SETTINGS_UI_SHOW_EVENT, MenuUi.SETTINGS_UI_HIDE_EVENT, this.scene.scale.width/2, this.scene.scale.height*3/2, 0, -this.scene.scale.height, 300);

    }

    private showSettingsUi() {

        this.settingUi.emit(MenuUi.SETTINGS_UI_SHOW_EVENT);

        this.playButton.off(UiImageButton.BUTTON_UP_EVENT);
        this.playButton.off(UiImageButton.BUTTON_HOVER_EVENT);
        this.playButton.off(UiImageButton.BUTTON_DOWN_EVENT);
        this.playButton.setInteractive(false);

        this.settingsButton.off(UiImageButton.BUTTON_UP_EVENT);
        this.settingsButton.off(UiImageButton.BUTTON_HOVER_EVENT);
        this.settingsButton.off(UiImageButton.BUTTON_DOWN_EVENT);
        this.settingsButton.setInteractive(false);


    }
    
    private hideSettingUi() {
        this.menuUi.setInteractive();

        this.settingUi.emit(MenuUi.SETTINGS_UI_HIDE_EVENT);

        
        this.playButton.on(UiImageButton.BUTTON_UP_EVENT, () => {
            this.scene.time.delayedCall(400, () => this.scene.scene.start('GameScene'));
            this.blackSceneTransition.emit(BlackUiImage.BLACK_UI_IMAGE_DISABLE_EVENT);
        });
        TweenUtilities.applyTintTweens(this.playButton, UiImageButton.BUTTON_DOWN_EVENT, [UiImageButton.BUTTON_UP_EVENT, UiImageButton.BUTTON_REST_EVENT], 0xffffff, 0xb8b8b8, 200);
        TweenUtilities.applyScaleTweens(this.playButton, UiImageButton.BUTTON_HOVER_EVENT, UiImageButton.BUTTON_REST_EVENT, this.playButton.scaleX, this.playButton.scaleY, 1.1, 100);
        this.playButton.on(UiImageButton.BUTTON_UP_EVENT, () => {
            this.audioController.playSound('button-down');
        });

        this.settingsButton.on(UiImageButton.BUTTON_UP_EVENT, this.showSettingsUi, this);
        TweenUtilities.applyTintTweens(this.settingsButton, UiImageButton.BUTTON_DOWN_EVENT, [UiImageButton.BUTTON_UP_EVENT, UiImageButton.BUTTON_REST_EVENT], 0xffffff, 0xb8b8b8, 200);
        TweenUtilities.applyScaleTweens(this.settingsButton, UiImageButton.BUTTON_HOVER_EVENT, UiImageButton.BUTTON_REST_EVENT, this.settingsButton.scaleX, this.settingsButton.scaleY, 1.1, 100);
        this.settingsButton.on(UiImageButton.BUTTON_UP_EVENT, () => {
            this.audioController.playSound('button-down');
        });
    }

    
    private createBlackBackground(scene: Phaser.Scene) {
        this.blackSceneTransition = new BlackUiImage(scene, 1, 0, 400);
        this.blackSceneTransition.setDepth(2000);

        this.blackSceneTransition.emit(BlackUiImage.BLACK_UI_IMAGE_ENABLE_EVENT);
    }



}



export default MenuUi;