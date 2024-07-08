import UiImageButton from "./UiImageButton";

class UiUtilities {

    static applyButtonScaleTweens(button: UiImageButton, scaleDownFactor: number = 0.95, duration: number = 100): void {
        // Scale down on pointer down
        let isScaled = false;
        let scaleDownTween: Phaser.Tweens.Tween | null = null;
        let scaleUpTween: Phaser.Tweens.Tween | null = null;

        let defaultScale : Phaser.Math.Vector2;

        button.addOnPressDownCallback(() => {
            if (scaleUpTween) {
                scaleUpTween.complete();
            }

            //const currentScaleX = button.container.scaleX;
            //const currentScaleY = button.container.scaleY;
            defaultScale = new Phaser.Math.Vector2(button.container.scaleX, button.container.scaleY)
            const endScaleX = defaultScale.x * scaleDownFactor;
            const endScaleY = defaultScale.y * scaleDownFactor;
            isScaled = true;

            scaleDownTween = button.scene.tweens.add({
                targets: button.container,
                scaleX: endScaleX ,
                scaleY: endScaleY ,
                duration: duration,
                ease: 'Linear',
                onComplete: () => {
                    button.container.setScale(endScaleX, endScaleY);
                    scaleDownTween = null;
                }
            });
        });

        const returnToNormalScale = () => {
            if (!isScaled) return;

            if (scaleDownTween) {
                scaleDownTween.stop();
            }

            isScaled = false;

            scaleUpTween = button.scene.tweens.add({
                targets: button.container,
                scaleX: defaultScale.x,
                scaleY: defaultScale.y,
                duration: duration,
                ease: 'Linear',
                onComplete: () => {
                    button.container.setScale(defaultScale.x, defaultScale.y);
                    scaleUpTween = null;
                }
            });
        };

        

        button.addOnPressUpCallback(returnToNormalScale);
        button.addOnRestCallback(returnToNormalScale);
    
    }
}


export default UiUtilities;