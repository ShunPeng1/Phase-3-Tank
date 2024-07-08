import { Scene } from "phaser";

import IUi from "./types/IUi";
type AlignOptions = "TopLeft" | "TopCenter" | "TopRight" | "LeftCenter" | "Center" | "RightCenter" | "BottomLeft" | "BottomCenter" | "BottomRight";

class UiImage extends Phaser.GameObjects.Image implements IUi {
    public readonly container: Phaser.GameObjects.Container;

    constructor(scene: Scene, x: number, y: number, texture: string | Phaser.Textures.Texture, frame?: string | number | undefined) {
        
        super(scene, 0, 0, texture, frame);

        this.container = this.scene.add.container(x, y);
        
        this.scene = scene;
        //this.scene.add.existing(this);


        this.container.setScrollFactor(0,0);

        this.container.add(this);

        
    }

    public add(gameObject: Phaser.GameObjects.GameObject, align: AlignOptions = "Center", offsetX : number = 0, offsetY : number = 0): this {
        this.container?.add(gameObject);

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

        return this;
    }

    public remove(gameObject: Phaser.GameObjects.GameObject): this {
        this.container?.remove(gameObject);
        return this;
    }

    public setPosition(x?: number | undefined, y?: number | undefined, z?: number | undefined, w?: number | undefined): this {
        //super.setPosition(x, y, z, w);
        this.container?.setPosition(x, y, z, w);
        return this;
    
    }

    public setRotation(radians: number): this {
        //super.setRotation(radians);
        this.container?.setRotation(radians);
        return this;
    }

    public setScale(x?: number | undefined, y?: number | undefined): this {
        //super.setScale(x, y);
        this.container?.setScale(x, y);
        return this;
    }
    
    public setDepth(value: number): this {
        //super.setDepth(value);
        this.container?.setDepth(value + 0.1);
        return this;
    }

}



export default UiImage;