import { GameObjects } from "phaser";

class BootScene extends Phaser.Scene {
    private loadingBar: Phaser.GameObjects.Graphics;
    private progressBar: Phaser.GameObjects.Graphics;

    constructor() {
        super({
        key: 'BootScene'
        });
    }

    preload(): void {
        // set the background, create the loading and progress bar
        this.cameras.main.setBackgroundColor(0x000000);
        this.createLoadingGraphics();

        // pass value to change the loading bar fill
        this.load.on(
            'progress',
            (value: number) => {
                this.progressBar.clear();
                this.progressBar.fillStyle(0x88e453, 1);
                this.progressBar.fillRect(
                this.cameras.main.width / 4,
                this.cameras.main.height / 2 - 16,
                (this.cameras.main.width / 2) * value,
                16
                );
            },
            this
        );

        // delete bar graphics, when loading complete
        this.load.on(
        'complete',
        () => {
            this.progressBar.destroy();
            this.loadingBar.destroy();
        },
        this
        );

        // load our package
        this.load.pack('preload', './assets/pack.json', 'preload');


        //
        const graphics = new GameObjects.Graphics(this,{ fillStyle: { color: 0x000000 } });

        graphics.fillRect(0, 0, this.scale.width, this.scale.height);

        const textureName = 'black';
        graphics.generateTexture(textureName, this.scale.width, this.scale.height);

    }


    create() {
        // Create the animation
        this.anims.create({
            key: 'explosion', // The key to reference this animation
            frames: [
                { key: 'explosion-01' },
                { key: 'explosion-02' },
                { key: 'explosion-03' },
                { key: 'explosion-04' },
                { key: 'explosion-05' },
                { key: 'explosion-06' },
                { key: 'explosion-07' },
                { key: 'explosion-08' }
            ],
            frameRate: 12, // Number of frames per second
            repeat: 0 // Set to -1 for infinite loop, 0 for no loop
        });

        this.anims.create({
            key: 'flash-a', // The key to reference this animation
            frames: [
                { key: 'flash-a-01' },
                { key: 'flash-a-02' },
                { key: 'flash-a-03' }
            ],
            frameRate: 12, // Number of frames per second
            repeat: 0 // Set to -1 for infinite loop, 0 for no loop
        });
    }

    update(): void {
        this.scene.start('MenuScene');
    }

    private createLoadingGraphics(): void {
        this.loadingBar = this.add.graphics();
        this.loadingBar.fillStyle(0xffffff, 1);
        this.loadingBar.fillRect(
        this.cameras.main.width / 4 - 2,
        this.cameras.main.height / 2 - 18,
        this.cameras.main.width / 2 + 4,
        20
        );
        this.progressBar = this.add.graphics();
    }
}


export default BootScene;