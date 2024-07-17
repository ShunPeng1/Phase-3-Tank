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
        let menuUi = new MenuUi(this);

        let audioController = new AudioController(this);
    }

    
}

export default MenuScene;