import MenuUi from "../objects/ui/MenuUi";
import AudioController from "../ultilities/audio/AudioController";

class MenuScene extends Phaser.Scene {

    

    constructor() {
        super({
        key: 'MenuScene'
        });
    }

    init(): void {
        
    }

    create(): void {
        
        let audioController = new AudioController(this);

        let menuUi = new MenuUi(this);

        audioController.playMusic('age-of-war-theme-song');

        //this.input.setDefaultCursor('url(assets/input/cursors/blue.cur), pointer');
        //this.input.setDefaultCursor('url(assets/cursors/red-target.cur), pointer');



    }

    
}

export default MenuScene;