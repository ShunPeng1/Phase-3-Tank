


class TireTrack extends Phaser.GameObjects.GameObject {
    private emitter: Phaser.GameObjects.Particles.ParticleEmitter;
    private follow: Phaser.GameObjects.Components.Transform;

    constructor(scene: Phaser.Scene, x: number, y: number, follow: Phaser.GameObjects.Components.Transform, frequency: number, lifespan: number  = 1000) {
        super(scene, "tireTrack");

        // Set the follow object
        this.follow = follow;

        // Smoke emitter configuration for white to grey smoke
        // Smoke emitter configuration
        this.emitter = new Phaser.GameObjects.Particles.ParticleEmitter(scene, x, y, "tireTrack",{
            lifespan: lifespan,
            //x: { min: -5, max: 5 },
            //y: { min: -5, max: 5 },
            //angle: { min: -110, max: -70 },
            //scale: { start: 0.15, end: 0, ease: 'Back.in' },
            alpha: { start: 1, end: 0 },
            //speed: 140,
            follow: follow,
            frequency: frequency,
            
            
            //blendMode: 'MULTIPLY'
            
        });

        this.emitter.onParticleEmit((particle: Phaser.GameObjects.Particles.Particle) => {
            particle.angle = Phaser.Math.RadToDeg(follow.rotation);
        });

        this.scene.add.existing(this.emitter);

    }

    public setDepth(depth: number) {
        this.emitter.setDepth(depth);
    }

    public start() {
        this.emitter.start();
    }

    public stop() {
        this.emitter.stop();
    }

    destroy(fromScene?: boolean): void {
        this.emitter.stop(); // Stop emitting new particles
    
        let checkParticles = () => {
            // Check if there are no more alive particles
            if (this.emitter.getAliveParticleCount() === 0) {
                super.destroy(fromScene);
                this.emitter.destroy();
            } else {
                // If there are still alive particles, check again after a short delay
                this.scene.time.delayedCall(100, checkParticles);
            }
        };
    
        // Start the check
        checkParticles();
    }
}

export default TireTrack;