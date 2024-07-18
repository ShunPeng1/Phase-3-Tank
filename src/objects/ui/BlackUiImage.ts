import TweenUtilities from "../../ultilities/TweenUtilities";
import UiImage from "../../ultilities/ui/UiImage";

class BlackUiImage extends UiImage {
    public static readonly BLACK_UI_IMAGE_ENABLE_EVENT = "enable";
    public static readonly BLACK_UI_IMAGE_DISABLE_EVENT = "disable";

    private isEnabled: boolean = false;
    private from : number;
    private to : number;
    private duration : number;

    constructor(scene: Phaser.Scene, from: number, to : number, duration: number) {
        super(scene, 0, 0, 'black');
        this.setDisplaySize(scene.scale.width, scene.scale.height);

        this.setSize(scene.scale.width, scene.scale.height);
        this.setPosition(scene.scale.width / 2, scene.scale.height / 2);
        
        this.setAlpha(from);

        this.from = from;
        this.to = to;
        this.duration = duration;

        this.setInteractive();
    }

    
    public setInteractive(): this {

        TweenUtilities.applyAlphaTweens(this, [BlackUiImage.BLACK_UI_IMAGE_ENABLE_EVENT], [BlackUiImage.BLACK_UI_IMAGE_DISABLE_EVENT], this.from, this.to, this.duration);
        
        return this;
    }

    public disableInteractive(): this {
        
        this.off(BlackUiImage.BLACK_UI_IMAGE_ENABLE_EVENT);
        this.off(BlackUiImage.BLACK_UI_IMAGE_DISABLE_EVENT);
        return this;
    }
}

export default BlackUiImage;