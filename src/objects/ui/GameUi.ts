import UiContainer from "../../ultilities/ui/UiContainer";

class GameUi extends UiContainer {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);
        
        this.setSize(scene.scale.width, scene.scale.height);        
        
        
        scene.add.existing(this);
    }
}



export default GameUi;