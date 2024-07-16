import { use } from "matter";
import UiContainer from "./UiContainer";
import IUiClickable from "./types/IUiClickable";
import IUiHoverable from "./types/IUiHoverable";

class UiImageButton extends UiContainer implements IUiClickable, IUiHoverable, Phaser.GameObjects.Components.Tint, Phaser.GameObjects.Components.Alpha, Phaser.GameObjects.Components.Visible {
    protected image: Phaser.GameObjects.Image; 
    protected hitArea: Phaser.GameObjects.Zone;
    public isClicked: boolean;
    public isHovered: boolean;
    
    public static readonly BUTTON_DOWN_EVENT: string = 'buttondown';
    public static readonly BUTTON_UP_EVENT: string = 'buttonup';
    public static readonly BUTTON_HOVER_EVENT: string = 'hover';
    public static readonly BUTTON_REST_EVENT: string = 'rest';

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture, frame?: string | number | undefined) {
        super(scene, x, y);
        this.isClicked = false;
        this.isHovered = false;

        this.image = new Phaser.GameObjects.Image(scene, 0, 0, texture, frame);
        this.add(this.image);
        
        this.hitArea = new Phaser.GameObjects.Zone(scene, 0, 0, this.image.width, this.image.height);
        this.hitArea.setScrollFactor(0,0);
        this.add(this.hitArea);
        
        this.setInteractive();
    }

    public clearTint(): this {
        this.image.clearTint();
        return this;
    }

    public setTint(topLeft?: number, topRight?: number, bottomLeft?: number, bottomRight?: number): this {
        this.image.setTint(topLeft, topRight, bottomLeft, bottomRight);
        return this;
    }

    public setTintFill(topLeft?: number, topRight?: number, bottomLeft?: number, bottomRight?: number): this {
        this.image.setTintFill(topLeft, topRight, bottomLeft, bottomRight);
        return this;
    }


    public setInteractive(): this {
        this.hitArea.setInteractive({
            useHandCursor: true
        });

       
        this.hitArea.on('pointerdown',this.enterPressDownState, this);
        this.hitArea.on('pointerup', this.enterPressUpState, this);
        this.hitArea.on('pointerover',this.enterHoverState, this);
        this.hitArea.on('pointerout', this.enterRestState, this);
        
        super.setInteractive();
        return this;
    }

    public disableInteractive(): this {
        this.hitArea.off('pointerdown', this.enterPressDownState, this);
        this.hitArea.off('pointerup', this.enterPressUpState, this);
        this.hitArea.off('pointerover', this.enterHoverState, this);
        this.hitArea.off('pointerout', this.enterRestState, this);

        this.hitArea.disableInteractive();

        super.disableInteractive();
        return this;
    }


    public enterPressDownState(): void {
        this.isClicked = true;

        this.emit(UiImageButton.BUTTON_DOWN_EVENT);
    }

    public enterPressUpState(): void {
        if (!this.isClicked) return;

        this.isClicked = false;
        this.emit(UiImageButton.BUTTON_UP_EVENT);
    }

    public enterHoverState(): void {
        this.isHovered = true;
        
        this.emit(UiImageButton.BUTTON_HOVER_EVENT);
    }

    public enterRestState(): void {
        if (!this.isHovered) return;

        this.isHovered = false;

        this.emit(UiImageButton.BUTTON_REST_EVENT);
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

export default UiImageButton;