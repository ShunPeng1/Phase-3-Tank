import PauseGroup from "../../ultilities/pause/PauseGroup";
import TweenUtilities from "../../ultilities/TweenUtilities";
import UiContainer from "../../ultilities/ui/UiContainer";
import UiImageButton from "../../ultilities/ui/UiImageButton";

class GameUi extends UiContainer {
    private playUi : UiContainer;
    private pauseUi : UiContainer;
    private settingUi : UiContainer;
    private loseUi : UiContainer;
    private winUi : UiContainer;

    private pauseGroup : PauseGroup;
    
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);
        this.setSize(scene.scale.width, scene.scale.height);        
        scene.add.existing(this);


        this.playUi = new UiContainer(scene, 0, 0);
        this.add(this.playUi, "Center");
        

        const pauseButton = new UiImageButton(scene, 100, 100, 'icon-small-white-outline-pause');
        pauseButton.setScale(0.5);


        
        pauseButton.on(UiImageButton.BUTTON_UP_EVENT, this.showPauseUi, this);
        TweenUtilities.applyTintTweens(pauseButton, UiImageButton.BUTTON_DOWN_EVENT, [UiImageButton.BUTTON_UP_EVENT, UiImageButton.BUTTON_REST_EVENT], 0xffffff, 0xb8b8b8, 200);
        

        this.playUi.add(pauseButton, "TopLeft", -50, -50);


        this.pauseGroup = new PauseGroup(scene, []);

        
    }



    private showPauseUi() {
        //this.pauseUi.setVisible(true);
        //this.playUi.setVisible(false);
        this.pauseGroup.setObjectFromScene(this.scene);
        this.pauseGroup.pause();
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