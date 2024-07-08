import UiImage from "./UiImage";
import IUiClickable from "./types/IUiClickable";
import IUiHoverable from "./types/IUiHoverable";

class UiImageButton extends UiImage implements IUiClickable, IUiHoverable {
    public isClicked: boolean;
    public isHovered: boolean;
    private onActiveCallbacks: Array<() => void> = [];
    private onUnactiveCallbacks: Array<() => void> = [];
    private onHoverCallbacks: Array<() => void> = [];
    private onRestCallbacks: Array<() => void> = [];

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture, frame?: string | number | undefined) {
        super(scene, x, y, texture, frame);
        this.isClicked = false;
        this.setInteractive();
        this.on('pointerdown', () => this.enterPressDownState());
        this.on('pointerup', () => this.enterPressUpState());
        this.on('pointerover', () => this.enterHoverState());
        this.on('pointerout', () => this.enterRestState());
    }

    public enterPressDownState(): void {
        this.isClicked = true;
        this.onActiveCallbacks.forEach(callback => callback());
    }

    public enterPressUpState(): void {
        if (!this.isClicked) return;

        this.isClicked = false;
        this.onUnactiveCallbacks.forEach(callback => callback());
    }

    public enterHoverState(): void {
        this.isHovered = true;
        this.onHoverCallbacks.forEach(callback => callback());
    }

    public enterRestState(): void {
        if (!this.isHovered) return;

        this.isHovered = false;

        this.onRestCallbacks.forEach(callback => callback());
    }

    public addOnPressDownCallback(callback: () => void): void {
        this.onActiveCallbacks.push(callback);
    }

    public addOnPressUpCallback(callback: () => void): void {
        this.onUnactiveCallbacks.push(callback);
    }

    public addOnHoverCallback(callback: () => void): void {
        this.onHoverCallbacks.push(callback);
    }

    public addOnRestCallback(callback: () => void): void {
        this.onRestCallbacks.push(callback);
    }
}

export default UiImageButton;