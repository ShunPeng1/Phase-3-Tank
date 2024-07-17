import IUiClickable from "./types/IUiClickable";
import UiContainer from "./UiContainer";
import UiImage from "./UiImage";

class UiImageSlider extends UiImage implements IUiClickable {
    isClicked: boolean;

    private knob: UiContainer;
    private mustKnobDrag: boolean;

    private start:  Phaser.Math.Vector2;
    private end:  Phaser.Math.Vector2;
    private currentPosition:  Phaser.Math.Vector2;
    private currentValue: number;
    
    public static readonly BUTTON_DOWN_EVENT: string = 'buttondown';
    public static readonly BUTTON_UP_EVENT: string = 'buttonup';
    public static readonly VALUE_CHANGED_EVENT: string = 'valuechanged';

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture, minPosition: Phaser.Math.Vector2, maxPosition:  Phaser.Math.Vector2, knob : UiContainer, mustKnobDrag : boolean = false , frame?: string | number) {
        super(scene, x, y, texture, frame);
        this.start = minPosition;
        this.end = maxPosition;
        this.currentPosition = new Phaser.Math.Vector2(x, y);
        this.currentValue = 0;

        this.knob = knob;
        this.mustKnobDrag = mustKnobDrag;

        this.add(this.knob);
        this.bringToTop(this.knob);

        this.setValue(0);

        this.setInteractive();
    }

    public getValue(): number {
        return this.currentValue;
    }

    public setValue(value: number): void {
        // Assuming value is a normalized scalar [0, 1] representing the slider's position from start to end
        const clampedValue = Phaser.Math.Clamp(value, 0, 1);
        const newPosition = this.start.lerp(this.end, clampedValue);
        this.knob.setPosition(newPosition.x, newPosition.y);
        this.updateValue(newPosition);
    }

    private updateValue(position: Phaser.Math.Vector2): void {
        // Calculate the new value based on the knob's position
        const totalDistance = this.start.distance(this.end);
        const currentDistance = this.start.distance(position);
        const newValue = currentDistance / totalDistance;
        if (newValue !== this.currentValue) {
            this.emit(UiImageSlider.VALUE_CHANGED_EVENT, this.currentValue, newValue);
            this.currentValue = newValue;
        }
    }
    
    public setInteractive(hitArea?: Phaser.Types.Input.InputConfiguration | any, callback?: Phaser.Types.Input.HitAreaCallback, dropZone?: boolean): this {
        // this.hitArea.setInteractive({
        //     useHandCursor: true
        // });

        if (this.knob) { // Ensure this.knob is not null
            this.knob.setInteractive({
                useHandCursor: true,
                draggable: true,
            });

            this.knob.getHitArea().on('drag', this.dragKnob, this);
        } else {
            console.error("Knob is not initialized.");
        }


       
        this.hitArea.on('pointerdown',this.enterPressDownState, this);
        this.hitArea.on('pointerup', this.enterPressUpState, this);
        this.hitArea.on('pointerover',this.enterHoverState, this);
        this.hitArea.on('pointerout', this.enterRestState, this);
        
        return this;
    }

    public disableInteractive(): this {
        this.scene.input.setDraggable(this.knob, false);

        this.knob.off('drag', this.dragKnob, this);

        this.hitArea.off('pointerdown', this.enterPressDownState, this);
        this.hitArea.off('pointerup', this.enterPressUpState, this);
        this.hitArea.off('pointerover', this.enterHoverState, this);
        this.hitArea.off('pointerout', this.enterRestState, this);

        this.hitArea.disableInteractive();

        super.disableInteractive();
        return this;
    }

    private dragKnob(pointer: Phaser.Input.Pointer, dragX: number, dragY: number): void {
        let newPosition = new Phaser.Math.Vector2(Phaser.Math.Clamp(dragX, this.start.x, this.end.x), Phaser.Math.Clamp(dragY, this.start.y, this.end.y));
        this.knob.setPosition(newPosition.x, newPosition.y);
        this.updateValue(newPosition);
    }

    public enterRestState(): void {
        if (!this.isHovered) return;

        this.isHovered = false;

        if (this.isClicked){
            this.isClicked = false;
        }

        this.emit(UiImageSlider.BUTTON_REST_EVENT);
    }


    public enterPressDownState(): void {
        this.isClicked = true;

        this.emit(UiImageSlider.BUTTON_DOWN_EVENT);
    }

    public enterPressUpState(): void {
        if (!this.isClicked) return;

        this.isClicked = false;
        this.emit(UiImageSlider.BUTTON_UP_EVENT);
    }
} 


export default UiImageSlider;