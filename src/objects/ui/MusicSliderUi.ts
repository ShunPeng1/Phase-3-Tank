import AudioController from "../../ultilities/audio/AudioController";
import TweenUtilities from "../../ultilities/TweenUtilities";
import UiContainer from "../../ultilities/ui/UiContainer";
import UiImage from "../../ultilities/ui/UiImage";
import UiImageButton from "../../ultilities/ui/UiImageButton";
import UiImageSlider from "../../ultilities/ui/UiImageSlider";

class MusicBarUi extends UiContainer {
    private slider: UiImageSlider;
    private musicButton: UiImageButton;
    private onTexture: string;
    private offTexture: string;
    private isMusicOrSound: boolean;
    private audioController: AudioController;

    

    constructor(scene: Phaser.Scene, x: number, y: number, onTexture: string, offTexture: string, isMusicOrSound: boolean) {
        super(scene, x, y);
        scene.add.existing(this);

        // Store the textures for later use
        this.onTexture = onTexture;
        this.offTexture = offTexture;
        this.isMusicOrSound = isMusicOrSound;

        let audioController = this.scene.data.get(AudioController.AUDIO_CONTROLLER_KEY) as AudioController;
        this.audioController = audioController;
        
        const musicSlider = new UiImageSlider(this.scene, 0, 0, 'slim-slider-frame', new Phaser.Math.Vector2(-600, 0), new Phaser.Math.Vector2(600, 0), new UiImage(this.scene, 0, 0, 'slim-slider-red-button'), 3);
        musicSlider.setScale(0.7);
        this.add(musicSlider, "Center", 100, 0);
        this.slider = musicSlider;

        const musicSliderBackground = new UiImage(this.scene, 0, 0, 'slim-slider-background');
        musicSlider.add(musicSliderBackground, "Center");
        musicSlider.sendToBack(musicSliderBackground);

        musicSlider.on(UiImageSlider.VALUE_CHANGED_EVENT, (oldValue: number, newValue: number) => {
            console.log("Music volume changed to", newValue);
            // Change the button texture based on the slider value
            if (this.isMusicOrSound) {
                audioController.adjustMusicVolume(newValue);
            }
            else{
                audioController.adjustSoundVolume(newValue);
            }

            this.musicButton.setTexture(newValue === 0 ? this.offTexture : this.onTexture);
        });

        const musicButton = new UiImageButton(this.scene, 0, 0, onTexture);
        musicButton.setScale(0.7);
        this.add(musicButton, "Center", -550, 0);
        this.musicButton = musicButton; // Store the button for later use

        musicButton.on(UiImageButton.BUTTON_UP_EVENT, () => {
            // Toggle the music on and off
            
            
            if (this.isMusicOrSound) {
                let volume = audioController.getMusicVolume();
                audioController.adjustMusicVolume(volume === 0 ? 1 : 0);    
                musicButton.setTexture(volume === 0 ? this.offTexture : this.onTexture);
                this.slider.setValue(audioController.getMusicVolume());
            }
            else{
                let volume = audioController.getSoundVolume();
                audioController.adjustSoundVolume(volume === 0 ? 1 : 0);
                musicButton.setTexture(volume === 0 ? this.offTexture : this.onTexture);
                this.slider.setValue(audioController.getSoundVolume());
            }
        });

        TweenUtilities.applyTintTweens(musicButton, UiImageButton.BUTTON_DOWN_EVENT, [UiImageButton.BUTTON_UP_EVENT, UiImageButton.BUTTON_REST_EVENT], 0xffffff, 0xb8b8b8, 200);
        TweenUtilities.applyScaleTweens(musicButton, UiImageButton.BUTTON_HOVER_EVENT, UiImageButton.BUTTON_REST_EVENT, musicButton.scaleX, musicButton.scaleY, 1.1, 100);



        // Set the initial state of the music button
        if (this.isMusicOrSound) {
            musicButton.setTexture(audioController.getMusicVolume() === 0 ? this.offTexture : this.onTexture);
            this.slider.setValue(audioController.getMusicVolume());
        }
        else{
            musicButton.setTexture(audioController.getSoundVolume() === 0 ? this.offTexture : this.onTexture);
            this.slider.setValue(audioController.getSoundVolume());
        
        }


    }
}

export default MusicBarUi;