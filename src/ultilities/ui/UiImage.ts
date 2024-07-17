import UiContainer from "./UiContainer";
import IUiHoverable from "./types/IUiHoverable";

class UiImage extends UiContainer implements IUiHoverable, Phaser.GameObjects.Components.Tint, Phaser.GameObjects.Components.Alpha, Phaser.GameObjects.Components.Visible {
    protected image: Phaser.GameObjects.Image; 
    public isHovered: boolean;
    
    public static readonly BUTTON_HOVER_EVENT: string = 'hover';
    public static readonly BUTTON_REST_EVENT: string = 'rest';

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture, frame?: string | number | undefined) {
        super(scene, x, y);

        this.isHovered = false;

        this.image = new Phaser.GameObjects.Image(scene, 0, 0, texture, frame);
        this.add(this.image);

        this.setSize(this.image.width, this.image.height);
    
    }

    public clearTint(): this {
        this.image.clearTint();
        return this;
    }

    public setSize(width: number, height: number): this {
        this.image.setSize(width, height);
        super.setSize(width, height);
        return this;
    }

    public setTint(topLeft?: number, topRight?: number, bottomLeft?: number, bottomRight?: number): this {
        this.image.setTint(topLeft, topRight, bottomLeft, bottomRight);
        for (let i = 0; i < this.list.length; i++) {
            let obj = this.list[i];
            if ('setTint' in obj && typeof obj.setTint === 'function')
            {
                obj.setTint(topLeft, topRight, bottomLeft, bottomRight);  
            }
        }
        

        return this;
    }

    public setTintFill(topLeft?: number, topRight?: number, bottomLeft?: number, bottomRight?: number): this {
        this.image.setTintFill(topLeft, topRight, bottomLeft, bottomRight);
        return this;
    }

    public setInteractive(hitArea?: Phaser.Types.Input.InputConfiguration | any, callback?: Phaser.Types.Input.HitAreaCallback, dropZone?: boolean): this {
        this.hitArea.setInteractive(hitArea, callback, dropZone);

        // Only listen to hover events
        this.hitArea.on('pointerover', this.enterHoverState, this);
        this.hitArea.on('pointerout', this.enterRestState, this);
        
        super.setInteractive();
        return this;
    }

    public disableInteractive(): this {
        // Only remove hover event listeners
        this.hitArea.off('pointerover', this.enterHoverState, this);
        this.hitArea.off('pointerout', this.enterRestState, this);

        this.hitArea.disableInteractive();

        super.disableInteractive();
        return this;
    }

    public enterHoverState(): void {
        this.isHovered = true;
        
        this.emit(UiImage.BUTTON_HOVER_EVENT);
    }

    public enterRestState(): void {
        if (!this.isHovered) return;

        this.isHovered = false;

        this.emit(UiImage.BUTTON_REST_EVENT);
    }

    // Ignore 
    tintTopLeft: number;
    tintTopRight: number;
    tintBottomLeft: number;
    tintBottomRight: number;
    tintFill: boolean;
    tint: number;
    isTinted: boolean;
    alphaTopLeft: number;
    alphaTopRight: number;
    alphaBottomLeft: number;
    alphaBottomRight: number;
}

export default UiImage;