import TweenUtilities from "../../ultilities/TweenUtilities";
import UiContainer from "../../ultilities/ui/UiContainer";
import UiImageButton from "../../ultilities/ui/UiImageButton";

class GameUi extends UiContainer {
    private playUi : UiContainer;
    private pauseUi : UiContainer;
    private settingUi : UiContainer;
    private loseUi : UiContainer;
    private winUi : UiContainer;
    
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);
        this.setSize(scene.scale.width, scene.scale.height);        
        scene.add.existing(this);


        this.playUi = new UiContainer(scene, 0, 0);
        this.add(this.playUi, "Center");
        

        const pauseButton = new UiImageButton(scene, 100, 100, 'icon-small-white-outline-pause');
        pauseButton.setScale(0.5);


        
        pauseButton.on(UiImageButton.BUTTON_UP_EVENT, this.showPauseUi);
        TweenUtilities.applyAlphaTweens(pauseButton, UiImageButton.BUTTON_DOWN_EVENT, [UiImageButton.BUTTON_UP_EVENT, UiImageButton.BUTTON_REST_EVENT], 1, 0.7, 200);
        



        
        this.playUi.add(pauseButton, "TopLeft", -50, -50);
    }



    private showPauseUi() {
        this.pauseUi.setVisible(true);
        this.playUi.setVisible(false);
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