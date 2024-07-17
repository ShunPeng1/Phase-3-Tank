import UiContainer from "../../ultilities/ui/UiContainer";
import UiImage from "../../ultilities/ui/UiImage";
import UiImageButton from "../../ultilities/ui/UiImageButton";
import UiImageSlider from "../../ultilities/ui/UiImageSlider";

class MusicBarUi extends UiContainer {
    private slider: UiImageSlider;
    private musicButton: UiImageButton;
    private onTexture: string;
    private offTexture: string;

    constructor(scene: Phaser.Scene, x: number, y: number, onTexture: string, offTexture: string) {
        super(scene, x, y);
        scene.add.existing(this);

        // Store the textures for later use
        this.onTexture = onTexture;
        this.offTexture = offTexture;

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
            this.musicButton.setTexture(newValue === 0 ? this.offTexture : this.onTexture);
        });

        const musicButton = new UiImageButton(this.scene, 0, 0, onTexture);
        musicButton.setScale(0.7);
        this.add(musicButton, "Center", -550, 0);
        this.musicButton = musicButton; // Store the button for later use
    }
}

export default MusicBarUi;