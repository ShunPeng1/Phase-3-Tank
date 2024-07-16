import UiContainer from "./UiContainer";
import IUiClickable from "./types/IUiClickable";
import IUiHoverable from "./types/IUiHoverable";

class UiImageButton extends UiContainer implements IUiClickable, IUiHoverable {
    protected image: Phaser.GameObjects.Image; 
    public isClicked: boolean;
    public isHovered: boolean;
    
    public static readonly BUTTON_DOWN_EVENT: string = 'buttondown';
    public static readonly BUTTON_UP_EVENT: string = 'buttonup';
    public static readonly HOVER_EVENT: string = 'hover';
    public static readonly REST_EVENT: string = 'rest';

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture, frame?: string | number | undefined) {
        super(scene, x, y);
        this.isClicked = false;
        this.isHovered = false;

        this.image = new Phaser.GameObjects.Image(scene, 0, 0, texture, frame);
        this.add(this.image);
        

        this.setInteractive();
    }

    public setInteractive(): this {
        const hitArea = new Phaser.Geom.Rectangle(0, 0, this.image.width, this.image.height);
        const hitAreaCallback = Phaser.Geom.Rectangle.Contains;

        this.on('pointerdown', this.enterPressDownState, this);
        this.on('pointerup', this.enterPressUpState, this);
        this.on('pointerover', this.enterHoverState, this);
        this.on('pointerout', this.enterRestState, this);
        
        super.setInteractive(hitArea, hitAreaCallback);
        return this;
    }

    public disableInteractive(): this {
        this.off('pointerdown', this.enterPressDownState, this);
        this.off('pointerup', this.enterPressUpState, this);
        this.off('pointerover', this.enterHoverState, this);
        this.off('pointerout', this.enterRestState, this);

        super.disableInteractive();
        return this;
    }


    public enterPressDownState(): void {
        this.isClicked = true;

        this.emit('buttondown');
    }

    public enterPressUpState(): void {
        if (!this.isClicked) return;

        this.isClicked = false;
        this.emit('buttonup');
    }

    public enterHoverState(): void {
        this.isHovered = true;
        
        this.emit('hover');
    }

    public enterRestState(): void {
        if (!this.isHovered) return;

        this.isHovered = false;

        this.emit('rest');
    }
}

export default UiImageButton;