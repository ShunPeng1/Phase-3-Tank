import { use } from "matter";
import UiContainer from "./UiContainer";
import IUiClickable from "./types/IUiClickable";
import IUiHoverable from "./types/IUiHoverable";
import UiImage from "./UiImage";

class UiImageButton extends UiImage implements IUiClickable {
    public isClicked: boolean;
    
    public static readonly BUTTON_DOWN_EVENT: string = 'buttondown';
    public static readonly BUTTON_UP_EVENT: string = 'buttonup';
    public static readonly BUTTON_HOVER_EVENT: string = 'hover';
    public static readonly BUTTON_REST_EVENT: string = 'rest';

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture, frame?: string | number | undefined) {
        super(scene, x, y, texture, frame);
        
        this.isClicked = false;

        this.setInteractive();
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

    public enterRestState(): void {
        if (!this.isHovered) return;

        this.isHovered = false;

        if (this.isClicked){
            this.isClicked = false;
        }

        this.emit(UiImage.BUTTON_REST_EVENT);
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

}

export default UiImageButton;