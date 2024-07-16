import UiContainer from "./UiContainer";
import IUiClickable from "./types/IUiClickable";
import IUiHoverable from "./types/IUiHoverable";

class UiImageButton extends UiContainer implements IUiClickable, IUiHoverable {
    protected image: Phaser.GameObjects.Image; 
    public isClicked: boolean;
    public isHovered: boolean;
    

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture, frame?: string | number | undefined) {
        super(scene, x, y);
        this.isClicked = false;
        this.isHovered = false;

        this.image = new Phaser.GameObjects.Image(scene, 0, 0, texture, frame);
        this.add(this.image);
        

        this.setInteractive();
    }

    public setInteractive(hitArea?: Phaser.Types.Input.InputConfiguration | any, callback?: Phaser.Types.Input.HitAreaCallback, dropZone?: boolean): this {
        //super.setInteractive(hitArea, callback, dropZone);
        
        this.image.setInteractive(hitArea, callback, dropZone);
        this.image.on('pointerdown', this.enterPressDownState, this);
        this.image.on('pointerup', this.enterPressUpState, this);
        this.image.on('pointerover', this.enterHoverState, this);
        this.image.on('pointerout', this.enterRestState, this);
        
        return this;
    }

    public disableInteractive(): this {
        this.image.off('pointerdown', this.enterPressDownState, this);
        this.image.off('pointerup', this.enterPressUpState, this);
        this.image.off('pointerover', this.enterHoverState, this);
        this.image.off('pointerout', this.enterRestState, this);

        super.disableInteractive();
        return this;
    }


    public enterPressDownState(): void {
        this.isClicked = true;

        this.image.emit('buttondown');
    }

    public enterPressUpState(): void {
        if (!this.isClicked) return;

        this.isClicked = false;
        this.image.emit('buttonup');
    }

    public enterHoverState(): void {
        this.isHovered = true;
        
        this.image.emit('hover');
    }

    public enterRestState(): void {
        if (!this.isHovered) return;

        this.isHovered = false;

        this.image.emit('rest');
    }
}

export default UiImageButton;