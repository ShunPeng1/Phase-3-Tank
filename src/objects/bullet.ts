import AudioController from "../ultilities/audio/AudioController";


class Bullet extends Phaser.GameObjects.Image implements IPausable {
    body: Phaser.Physics.Arcade.Body;

    private bulletSpeed: number;
    private originalVelocity: Phaser.Math.Vector2;
    private explosionSprite: Phaser.GameObjects.Sprite | null; 
    
    private isDestoyed : boolean = false;

    private audioController: AudioController;

    constructor(aParams: IBulletConstructor) {
        super(aParams.scene, aParams.x, aParams.y, aParams.texture);

        this.rotation = aParams.rotation;
        this.initImage();
        this.scene.add.existing(this);


        this.audioController = this.scene.data.get(AudioController.AUDIO_CONTROLLER_KEY) as AudioController;
        let randomSounds = ['gun-1-1','gun-1-2','gun-1-3','gun-1-4','gun-1-5']
        this.audioController.playSound(randomSounds[Math.floor(Math.random() * randomSounds.length)], true, new Phaser.Math.Vector2(this.x, this.y));
    
    }

    public pause(): void {
        // Store the current velocity before pausing
        this.originalVelocity = new Phaser.Math.Vector2(this.body.velocity.x, this.body.velocity.y);
        // Set the bullet's velocity to 0 to pause it
        this.body.setVelocity(0, 0);

        if (this.explosionSprite) {
            this.explosionSprite.anims.pause();
        }
    }

    public resume(): void {
        // Reapply the original velocity to resume movement
        if (this.originalVelocity) {
            this.body.setVelocity(this.originalVelocity.x, this.originalVelocity.y);
        }

        if (this.explosionSprite && this.explosionSprite.anims.isPaused) {
            this.explosionSprite.anims.resume();
        }
    }


    private initImage(): void {
        // variables
        this.bulletSpeed = 1000;

        // image
        this.setOrigin(0.5, 0.5);
        this.setDepth(0.5);

        // physics
        this.scene.physics.world.enable(this);
        this.scene.physics.velocityFromRotation(
            this.rotation - Math.PI / 2,
            this.bulletSpeed,
            this.body.velocity
        );
    }

    public explode(): void {
        if (this.isDestoyed) return; 

        this.isDestoyed = true;

        this.explosionSprite = this.scene.add.sprite(this.x, this.y, 'explosion-01').play('explosion');
        this.explosionSprite.setScale(0.5)
        this.explosionSprite.on('animationcomplete', () => {
            this.explosionSprite?.destroy();
            this.explosionSprite = null; // Ensure reference is cleared after destruction
        
            
            this.destroy();
        });

        // For Pause do pause the explosion sprite
        this.setVisible(false); 
        this.body.enable = false;

        let randomSounds = ['small-explosion-01','small-explosion-02','small-explosion-03','small-explosion-04','small-explosion-05','small-explosion-06','small-explosion-07','small-explosion-08','small-explosion-09','small-explosion-10','small-explosion-11','small-explosion-12','small-explosion-13','small-explosion-14','small-explosion-15']
        this.audioController.playSound(randomSounds[Math.floor(Math.random() * randomSounds.length)], true, new Phaser.Math.Vector2(this.x, this.y));
    
    }
}


export default Bullet;