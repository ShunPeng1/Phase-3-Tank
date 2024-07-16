import { Scene } from "phaser";

import IUi from "./types/IUi";

class UiContainer extends Phaser.GameObjects.Container implements IUi {

    constructor(scene: Scene, x: number, y: number) {
        super(scene, x, y);
        this.scene.add.existing(this);

        this.setScrollFactor(0,0);
    }

    public add(gameObject: Phaser.GameObjects.GameObject | Phaser.GameObjects.GameObject[], align: AlignOptions = "Center", offsetX : number = 0, offsetY : number = 0): this {
    
        if (Array.isArray(gameObject)) {
            gameObject.forEach((element) => {
                this.add(element, align, offsetX, offsetY);
            });
            return this;
        }

        // Apply alignment based on the align parameter
        switch (align) {
            case "TopLeft":
                Phaser.Display.Align.In.TopLeft(gameObject, this, offsetX, offsetY);
                break;
            case "TopCenter":
                Phaser.Display.Align.In.TopCenter(gameObject, this, offsetX, offsetY);
                break;
            case "TopRight":
                Phaser.Display.Align.In.TopRight(gameObject, this, offsetX, offsetY);
                break;
            case "LeftCenter":
                Phaser.Display.Align.In.LeftCenter(gameObject, this, offsetX, offsetY);
                break;
            case "Center":
                Phaser.Display.Align.In.Center(gameObject, this, offsetX, offsetY);
                break;
            case "RightCenter":
                Phaser.Display.Align.In.RightCenter(gameObject, this, offsetX, offsetY);
                break;
            case "BottomLeft":
                Phaser.Display.Align.In.BottomLeft(gameObject, this, offsetX, offsetY);
                break;
            case "BottomCenter":
                Phaser.Display.Align.In.BottomCenter(gameObject, this, offsetX, offsetY);
                break;
            case "BottomRight":
                Phaser.Display.Align.In.BottomRight(gameObject, this, offsetX, offsetY);
                break;
            default:
                // Default to center if no valid alignment is provided
                Phaser.Display.Align.In.Center(gameObject, this);
        }

        super.add(gameObject);
        return this;
    }

    


}



export default UiContainer;