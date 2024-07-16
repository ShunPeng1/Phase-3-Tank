import { GameObjects } from "phaser";

class TweenUtilities {

    public static applyScaleTweens(gameObject: Phaser.GameObjects.GameObject & Phaser.GameObjects.Components.Transform, eventOnString : string | string[], eventOffString : string | string[], defaultScaleX : number = gameObject.scaleX, defaultScaleY : number = gameObject.scaleY, scaleDownFactor: number = 0.95, duration: number = 100): void {
        // Scale down on pointer down
        let isScaled = false;
        let scaleDownTween: Phaser.Tweens.Tween | null = null;
        let scaleUpTween: Phaser.Tweens.Tween | null = null;

        let defaultScale : Phaser.Math.Vector2;

        const setToNewScale = () => {
            if (scaleUpTween) {
                scaleUpTween.complete();
            }

            //const currentScaleX = button.container.scaleX;
            //const currentScaleY = button.container.scaleY;
            defaultScale = new Phaser.Math.Vector2(defaultScaleX, defaultScaleY)
            const endScaleX = defaultScale.x * scaleDownFactor;
            const endScaleY = defaultScale.y * scaleDownFactor;
            isScaled = true;

            scaleDownTween = gameObject.scene.tweens.add({
                targets: gameObject,
                scaleX: endScaleX ,
                scaleY: endScaleY ,
                duration: duration,
                ease: 'Linear',
                onComplete: () => {
                    gameObject.setScale(endScaleX, endScaleY);
                    scaleDownTween = null;
                }
            });
        };


        const returnToNormalScale = () => {
            if (!isScaled) return;

            if (scaleDownTween) {
                scaleDownTween.stop();
            }

            isScaled = false;

            scaleUpTween = gameObject.scene.tweens.add({
                targets: gameObject,
                scaleX: defaultScale.x,
                scaleY: defaultScale.y,
                duration: duration,
                ease: 'Linear',
                onComplete: () => {
                    gameObject.setScale(defaultScale.x, defaultScale.y);
                    scaleUpTween = null;
                }
            });
        };

        if (typeof eventOnString === 'string'){
            eventOnString = [eventOnString];
        }
        
        eventOnString.forEach((eventString) => {
            gameObject.on(eventString, setToNewScale);
        });
       
            
        if (typeof eventOffString === 'string'){
            eventOffString = [eventOffString];
        }
        
        eventOffString.forEach(eventString => {
            gameObject.on(eventString, returnToNormalScale);
        });
    }

    public static applyDisplaySizeTweens(gameObject: Phaser.GameObjects.GameObject & Phaser.GameObjects.Components.Size, eventOnString : string | string[], eventOffString : string | string[], defaultWidth : number = gameObject.displayWidth, defaultHeight : number = gameObject.displayHeight, scaleDownFactor: number = 0.95, duration: number = 100): void {
        // Scale down on pointer down
        let isScaled = false;
        let scaleDownTween: Phaser.Tweens.Tween | null = null;
        let scaleUpTween: Phaser.Tweens.Tween | null = null;

        let defaultScale : Phaser.Math.Vector2;

        const setToNewScale = () => {
            if (scaleUpTween) {
                scaleUpTween.complete();
            }
            //console.log("Set to new scale")
            //const currentScaleX = button.container.scaleX;
            //const currentScaleY = button.container.scaleY;
            defaultScale = new Phaser.Math.Vector2(defaultWidth, defaultHeight)
            const endScaleX = defaultScale.x * scaleDownFactor;
            const endScaleY = defaultScale.y * scaleDownFactor;
            isScaled = true;

            scaleDownTween = gameObject.scene.tweens.add({
                targets: gameObject,
                displayWidth: endScaleX ,
                displayHeight: endScaleY ,
                duration: duration,
                ease: 'Linear',
                onComplete: () => {
                    gameObject.setDisplaySize(endScaleX, endScaleY);
                    scaleDownTween = null;
                }
            });
        };

        const returnToNormalScale = () => {
            if (!isScaled) return;

            if (scaleDownTween) {
                scaleDownTween.stop();
            }

            isScaled = false;

            scaleUpTween = gameObject.scene.tweens.add({
                targets: gameObject,
                displayWidth: defaultScale.x,
                displayHeight: defaultScale.y,
                duration: duration,
                ease: 'Linear',
                onComplete: () => {
                    gameObject.setDisplaySize(defaultScale.x, defaultScale.y);
                    scaleUpTween = null;
                }
            });
        };

        if (typeof eventOnString === 'string'){
            eventOnString = [eventOnString];
        }
        
        eventOnString.forEach((eventString) => {
            gameObject.on(eventString, setToNewScale);
        });
       
            
        if (typeof eventOffString === 'string'){
            eventOffString = [eventOffString];
        }
        
        eventOffString.forEach(eventString => {
            gameObject.on(eventString, returnToNormalScale);
        });
    }

    public static applyTintTweens(gameObject: Phaser.GameObjects.GameObject & Phaser.GameObjects.Components.Tint, eventOnString: string | string[], eventOffString: string | string[], startTint: number = 0xffffff, endTint: number = 0x000000, duration: number = 100): void {
        let isTintChanged = false;
        let tintToTween: Phaser.Tweens.Tween | null = null;
        let tintBackTween: Phaser.Tweens.Tween | null = null;
    
        const applyTint = () => {
            if (tintBackTween) {
                tintBackTween.complete();
            }
            isTintChanged = true;
    
            tintToTween = gameObject.scene.tweens.add({
                targets: gameObject,
                tint: { from: startTint, to: endTint },
                duration: duration,
                ease: 'Linear',
                onUpdate: (tween) => {
                    let color = Phaser.Display.Color.Interpolate.ColorWithColor(Phaser.Display.Color.ValueToColor(startTint), Phaser.Display.Color.ValueToColor(endTint), 100, tintToTween!.progress * 100);
                    gameObject.setTint(color.r<<16 | color.g<<8 | color.b);
                },
                onComplete: () => {
                    gameObject.setTint(endTint);
                    tintToTween = null;
                },
                onStop: () => {
                    gameObject.setTint(endTint);
                    tintToTween = null;
                }
            });
        };
    
        const removeTint = () => {
            if (!isTintChanged) return;
    
            if (tintToTween) {
                tintToTween.stop();
            }
    
            isTintChanged = false;
    
            tintBackTween = gameObject.scene.tweens.add({
                targets: gameObject,
                tint: { from: endTint, to: startTint },
                duration: duration,
                ease: 'Linear',
                onUpdate: () => {
                    let color = Phaser.Display.Color.Interpolate.ColorWithColor(Phaser.Display.Color.ValueToColor(endTint), Phaser.Display.Color.ValueToColor(startTint), 100, tintBackTween!.progress * 100);
                    gameObject.setTint(color.r<<16 | color.g<<8 | color.b);
                },
                onComplete: () => {
                    gameObject.setTint(startTint);
                    tintBackTween = null;
                }
            });
        };
    
        if (typeof eventOnString === 'string') {
            eventOnString = [eventOnString];
        }
    
        eventOnString.forEach((eventString) => {
            gameObject.on(eventString, applyTint);
        });
    
        if (typeof eventOffString === 'string') {
            eventOffString = [eventOffString];
        }
    
        eventOffString.forEach(eventString => {
            gameObject.on(eventString, removeTint);
        });
    }

    public static applyAlphaTweens(gameObject: Phaser.GameObjects.GameObject & Phaser.GameObjects.Components.Alpha, eventOnString: string | string[], eventOffString: string | string[], startAlpha: number = 1, endAlpha: number = 0, duration: number = 100): void {
        let isAlphaChanged = false;
        let alphaToTween: Phaser.Tweens.Tween | null = null;
        let alphaBackTween: Phaser.Tweens.Tween | null = null;

        const applyAlpha = () => {
            if (alphaBackTween) {
                alphaBackTween.complete();
            }
            isAlphaChanged = true;
    
            alphaToTween = gameObject.scene.tweens.add({
                targets: gameObject,
                alpha: { from: startAlpha, to: endAlpha },
                duration: duration,
                ease: 'Linear',
                onUpdate: () => {
                    gameObject.setAlpha(gameObject.alpha);
                },
                onComplete: () => {
                    gameObject.setAlpha(endAlpha);
                    alphaToTween = null;
                }
            });
        };
    
        const removeAlpha = () => {
            if (!isAlphaChanged) return;
    
            if (alphaToTween) {
                alphaToTween.stop();
            }
    
            isAlphaChanged = false;

            alphaBackTween = gameObject.scene.tweens.add({
                targets: gameObject,
                alpha: { from: endAlpha, to: startAlpha },
                duration: duration,
                ease: 'Linear',
                onUpdate: () => {
                    gameObject.setAlpha(gameObject.alpha);
                },
                onComplete: () => {
                    gameObject.setAlpha(startAlpha);
                    alphaBackTween = null;
                }
            });
        };
    
        if (typeof eventOnString === 'string') {
            eventOnString = [eventOnString];
        }
    
        eventOnString.forEach((eventString) => {
            gameObject.on(eventString, applyAlpha);
        });
    
        if (typeof eventOffString === 'string') {
            eventOffString = [eventOffString];
        }
    
        eventOffString.forEach(eventString => {
            gameObject.on(eventString, removeAlpha);
        });
    }
}


export default TweenUtilities;