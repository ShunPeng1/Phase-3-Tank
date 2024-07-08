import Bullet from './bullet';


class Player extends Phaser.GameObjects.Image {
    body: Phaser.Physics.Arcade.Body;

    // variables
    private health: number;
    private lastShoot: number;
    private speed: number;
    private angularSpeed: number;

    // children
    private movementIndicator : Phaser.GameObjects.Image;
    private barrel: Phaser.GameObjects.Image;
    private lifeBar: Phaser.GameObjects.Graphics;

    // game objects
    private bullets: Phaser.GameObjects.Group;
    
    private barrelContainer: Phaser.GameObjects.Container;
    private tankContainer: Phaser.GameObjects.Container;

    // input
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private wasdKeys: { up: Phaser.Input.Keyboard.Key, down: Phaser.Input.Keyboard.Key, left: Phaser.Input.Keyboard.Key, right: Phaser.Input.Keyboard.Key };
    private rotateKeyLeft: Phaser.Input.Keyboard.Key;
    private rotateKeyRight: Phaser.Input.Keyboard.Key;
    private shootingKey: Phaser.Input.Keyboard.Key;

    public getBullets(): Phaser.GameObjects.Group {
        return this.bullets;
    }

    constructor(aParams: IImageConstructor) {
        super(aParams.scene, aParams.x, aParams.y, aParams.texture, aParams.frame);

        this.initImage();
        this.scene.add.existing(this);
    }

    

    private initImage() {
        // variables
        this.health = 1;
        this.lastShoot = 0;
        this.speed = 300;
        this.angularSpeed = 0.03;

        // image
        this.setOrigin(0.5, 0.5);
        this.setDepth(0);
        this.angle = 180;
    

        this.barrel = this.scene.add.image(this.x, this.y, 'barrelBlue');
        this.barrel.setOrigin(0.5, 1);
        this.barrel.setDepth(1);
        this.barrel.angle = 180;

        //this.barrelContainer = this.scene.add.container(this.x, this.y, [this.barrel]);
        //this.barrelContainer.setDepth(1);
        

        this.lifeBar = this.scene.add.graphics();
        this.redrawLifebar();

        // game objects
        this.bullets = this.scene.add.group({
            /*classType: Bullet,*/
            active: true,
            maxSize: 10,
            runChildUpdate: true
        });

        // input
        // this.cursors = this.scene.input.keyboard!.createCursorKeys();
        // this.rotateKeyLeft = this.scene.input.keyboard!.addKey(
        //     Phaser.Input.Keyboard.KeyCodes.A
        // );
        // this.rotateKeyRight = this.scene.input.keyboard!.addKey(
        //     Phaser.Input.Keyboard.KeyCodes.D
        // );
        // this.shootingKey = this.scene.input.keyboard!.addKey(
        //     Phaser.Input.Keyboard.KeyCodes.SPACE
        // );
        this.cursors = this.scene.input.keyboard!.createCursorKeys();
        this.wasdKeys = {
            up: this.scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            down: this.scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            left: this.scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            right: this.scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.D),
        };

        this.scene.input.on('pointermove', this.handleBarrelRotation, this);
        this.scene.input.on('pointerdown', this.handleShooting, this);

        // Moving indicator
        this.movementIndicator = this.scene.add.image(0, -50, 'lineArrow');
        this.movementIndicator.setOrigin(0, 0.5);
        this.movementIndicator.setScale(0.025);
        this.movementIndicator.setDepth(0);
        this.movementIndicator.setRotation(-Math.PI / 2);


        this.tankContainer = this.scene.add.container(this.x, this.y, [this.movementIndicator]);
        
        // physics
        this.scene.physics.world.enable(this);
    }

    update(): void {
        if (this.active) {
            this.barrel.x = this.x;
            this.barrel.y = this.y;
            this.lifeBar.x = this.x;
            this.lifeBar.y = this.y;
            this.handleInput();
            //this.handleShooting();
        } else {
            this.destroy();
        }
    }

    destroy() {
        this.barrel.destroy();
        this.lifeBar.destroy();

        this.scene.input.off('pointermove', this.handleBarrelRotation);
        this.scene.input.off('pointerdown', this.handleShooting);
    
        // Call the parent destroy method or additional cleanup if necessary
        super.destroy();
    }

    private handleInput() {
        // move tank forward
        // small corrections with (- MATH.PI / 2) to align tank correctly
        if (this.cursors.up.isDown || this.wasdKeys.up.isDown) {
            this.scene.physics.velocityFromRotation(
            this.rotation - Math.PI / 2,
            this.speed,
            this.body.velocity
            );
        } else if (this.cursors.down.isDown || this.wasdKeys.down.isDown) {
            this.scene.physics.velocityFromRotation(
            this.rotation - Math.PI / 2,
            -this.speed,
            this.body.velocity
            );  
        } else {
            this.body.setVelocity(0, 0);
        }

        // rotate tank
        if (this.cursors.left.isDown || this.wasdKeys.left.isDown) {
            this.rotation -= this.angularSpeed;
        } else if (this.cursors.right.isDown || this.wasdKeys.right.isDown) {
            this.rotation += this.angularSpeed;
        }


        // Tank Container update
        this.tankContainer.setPosition(this.x, this.y);
        this.tankContainer.setRotation(this.rotation);
    }

    private handleBarrelRotation = (pointer: Phaser.Input.Pointer) => {
        const worldPoint = pointer.positionToCamera(this.scene.cameras.main) as Phaser.Math.Vector2;
        this.barrel.rotation = Phaser.Math.Angle.Between(this.barrel.x, this.barrel.y, worldPoint.x, worldPoint.y) + Math.PI / 2;
    };
    
    
    private handleShooting(pointer: Phaser.Input.Pointer): void {
        if (!pointer.leftButtonDown()){
            return;
        }
        
        if (this.scene.time.now > this.lastShoot) {
        this.scene.cameras.main.shake(20, 0.005);
        this.scene.tweens.add({
            targets: this,
            props: { alpha: 0.8 },
            delay: 0,
            duration: 5,
            ease: 'Power1',
            easeParams: null,
            hold: 0,
            repeat: 0,
            repeatDelay: 0,
            yoyo: true,
            paused: false
        });

        if (this.bullets.getLength() < 10) {
            this.bullets.add(
            new Bullet({
                scene: this.scene,
                rotation: this.barrel.rotation,
                x: this.barrel.x,
                y: this.barrel.y,
                texture: 'bulletBlue'
            })
            );

            this.lastShoot = this.scene.time.now + 80;
        }
        }
    }

    private redrawLifebar(): void {
        this.lifeBar.clear();
        this.lifeBar.fillStyle(0xe66a28, 1);
        this.lifeBar.fillRect(
        -this.width / 2,
        this.height / 2,
        this.width * this.health,
        15
        );
        this.lifeBar.lineStyle(2, 0xffffff);
        this.lifeBar.strokeRect(-this.width / 2, this.height / 2, this.width, 15);
        this.lifeBar.setDepth(1);
    }

    public updateHealth(): void {
        if (this.health > 0) {
            this.health -= 0.025;
            this.redrawLifebar();
        } else {
            this.health = 0;
            this.active = false;
            this.scene.scene.start('MenuScene');
        }
    }
}

export default Player;