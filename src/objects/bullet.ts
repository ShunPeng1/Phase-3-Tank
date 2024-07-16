

class Bullet extends Phaser.GameObjects.Image implements IPausable {
    body: Phaser.Physics.Arcade.Body;

    private bulletSpeed: number;
    private originalVelocity: Phaser.Math.Vector2;

    constructor(aParams: IBulletConstructor) {
        super(aParams.scene, aParams.x, aParams.y, aParams.texture);

        this.rotation = aParams.rotation;
        this.initImage();
        this.scene.add.existing(this);
    }

    public pause(): void {
        // Store the current velocity before pausing
        this.originalVelocity = new Phaser.Math.Vector2(this.body.velocity.x, this.body.velocity.y);
        // Set the bullet's velocity to 0 to pause it
        this.body.setVelocity(0, 0);
    }

    public resume(): void {
        // Reapply the original velocity to resume movement
        if (this.originalVelocity) {
            this.body.setVelocity(this.originalVelocity.x, this.originalVelocity.y);
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

    update(): void {}
}


export default Bullet;