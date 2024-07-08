import { Scene } from "phaser";

import IUi from "./types/IUi";

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

    public add(gameObject: Phaser.GameObjects.GameObject): this {
        this.container?.add(gameObject);
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