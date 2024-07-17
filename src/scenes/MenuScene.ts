import MenuUi from "../objects/ui/MenuUi";

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
    }

    
}

export default MenuScene;