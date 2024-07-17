import { GameObjects } from "phaser";
import PauseGroup from "../../ultilities/pause/PauseGroup";
import TweenUtilities from "../../ultilities/TweenUtilities";
import UiContainer from "../../ultilities/ui/UiContainer";
import UiImageButton from "../../ultilities/ui/UiImageButton";
import UiImage from "../../ultilities/ui/UiImage";

class GameUi extends GameObjects.Graphics {
    private playUi : UiContainer;
    private pauseUi : UiContainer;
    private settingUi : UiContainer;
    private loseUi : UiContainer;
    private winUi : UiContainer;

    private pauseGroup : PauseGroup;
    
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene);
           
        scene.add.existing(this);

        this.createPlayUi();
       
        this.createPauseUi();


        this.pauseGroup = new PauseGroup(scene, []);        
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


    private showPauseUi() {
        this.pauseUi.setVisible(true);
        this.playUi.setVisible(false);
        this.pauseGroup.setObjectFromScene(this.scene);
        this.pauseGroup.pause();
    }

    private hidePauseUi() {
        this.pauseUi.setVisible(false);
        this.playUi.setVisible(true);
        this.pauseGroup.resume();
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