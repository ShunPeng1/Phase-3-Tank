import UiContainer from "../../ultilities/ui/UiContainer";
import UiImageButton from "../../ultilities/ui/UiImageButton";

class GameUi extends UiContainer {
    private playUi : UiContainer;
    private pauseUi : UiContainer;
    private settingUi : UiContainer;
    
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);
        this.setSize(scene.scale.width, scene.scale.height);        
        scene.add.existing(this);


        // this.playUi = new UiContainer(scene, 0, 0);
        // this.add(this.playUi, "Center");
        

        const pauseButton = new UiImageButton(scene, 100, 100, 'icon-small-white-outline-pause');
        pauseButton.setScale(0.5);

        pauseButton.on(UiImageButton.BUTTON_DOWN_EVENT, () => {
            console.log('pause button down');
        });
        pauseButton.on(UiImageButton.BUTTON_UP_EVENT, () => {
            console.log('pause button up');
        });
        pauseButton.on(UiImageButton.HOVER_EVENT, () => {
            console.log('pause button hover');
        });
        pauseButton.on(UiImageButton.REST_EVENT, () => {
            console.log('pause button rest');
        });

        
        //this.playUi.add(pauseButton,"TopLeft", -100, -100);
    }
}



export default GameUi;