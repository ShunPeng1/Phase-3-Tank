import { GameObjects } from "phaser";
import Player from "../objects/Player";
import Enemy from "../objects/Enemy";
import Obstacle from "../objects/obstacles/Obstacle";
import Bullet from "../objects/Bullet";



class GameScene extends Phaser.Scene {
    private map: Phaser.Tilemaps.Tilemap;
    private tileset: Phaser.Tilemaps.Tileset;
    private layer: Phaser.Tilemaps.TilemapLayer;

    private player: Player;
    private enemies: Phaser.GameObjects.Group;
    private obstacles: Phaser.GameObjects.Group;

    private target: Phaser.Math.Vector2;

    constructor() {
        super({
        key: 'GameScene'
        });
    }

    init(): void {}

    create(): void {
        // create tilemap from tiled JSON
        this.map = this.make.tilemap({ key: 'levelMap' });

        this.tileset = this.map.addTilesetImage('tiles')!;
        this.layer = this.map.createLayer('tileLayer', this.tileset, 0, 0)!;
        this.layer.setCollisionByProperty({ collide: true });

        this.obstacles = this.add.group({
        /*classType: Obstacle,*/
        runChildUpdate: true
        });

        this.enemies = this.add.group({
        /*classType: Enemy*/
        });
        this.convertObjects();

        // collider layer and obstacles
        this.physics.add.collider(this.player, this.layer);
        this.physics.add.collider(this.player, this.obstacles);

        console.log(this.layer)

        // collider for bullets
        this.physics.add.overlap(
            this.player.getBullets(),
            this.layer,
            this.bulletHitLayer,
            undefined,
            this
        );
        
        this.physics.add.overlap(
            this.player.getBullets(),
            this.obstacles,
            this.bulletHitObstacles,
            undefined,
            this
        );
        
        this.enemies.getChildren().forEach((enemyGameObject: Phaser.GameObjects.GameObject) => {
            let enemy = enemyGameObject as Enemy;
            
            this.physics.add.overlap(
                this.player.getBullets(),
                enemyGameObject,
                this.playerBulletHitEnemy,
                undefined,
                this
            );

            this.physics.add.overlap(
                enemy.getBullets(),
                this.player,
                this.enemyBulletHitPlayer,
                undefined
            );
        
            this.physics.add.overlap(
                enemy.getBullets(),
                this.obstacles,
                this.bulletHitObstacles,
                undefined
            );
            this.physics.add.overlap(
                enemy.getBullets(),
                this.layer,
                this.bulletHitLayer,
                undefined
            );
        }, this);

        this.cameras.main.startFollow(this.player);
    }

    update(): void {
        this.player.update();

        this.enemies.getChildren().forEach((enemyGameObject: GameObjects.GameObject) => {
            let enemy = enemyGameObject as Enemy;
            enemy.update();
            if (this.player.active && enemy.active) {
                var angle = Phaser.Math.Angle.Between(
                enemy.body.x,
                enemy.body.y,
                this.player.body.x,
                this.player.body.y
                );

                enemy.getBarrel().angle =
                (angle + Math.PI / 2) * Phaser.Math.RAD_TO_DEG;
            }
        }, this);
    }

    private convertObjects(): void {
        // find the object layer in the tilemap named 'objects'
        const objectLayer = this.map.getObjectLayer('objects');
        const objects = objectLayer ? objectLayer.objects as any[] : [];

        objects.forEach((object) => {
        if (object.type === 'player') {
            this.player = new Player({
            scene: this,
            x: object.x,
            y: object.y,
            texture: 'tankBlue'
            });
        } else if (object.type === 'enemy') {
            let enemy = new Enemy({
            scene: this,
            x: object.x,
            y: object.y,
            texture: 'tankRed'
            });

            this.enemies.add(enemy);
        } else {
            let obstacle = new Obstacle({
            scene: this,
            x: object.x,
            y: object.y - 40,
            texture: object.type
            });

            this.obstacles.add(obstacle);
        }
        });
    }

    private bulletHitLayer(bullet: Bullet | Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody, tile :  | Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody): void {
        if (bullet instanceof Bullet) {
            if (tile instanceof Phaser.Tilemaps.Tile) {
                if (tile.properties.collide) {
                    bullet.destroy();
                }
            }
        }
    }

    private bulletHitObstacles(bullet: Bullet |  Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody, obstacle: Obstacle |  Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody): void {
        if (bullet instanceof Bullet) {
            bullet.destroy();
        }
    }

    private enemyBulletHitPlayer(bullet: Bullet |  Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody, player: Player |  Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody): void {
        if (player instanceof Player) {
            bullet.destroy();
            player.updateHealth();
        }
    }

    private playerBulletHitEnemy(bullet : Bullet |  Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody, enemy: Enemy | Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody): void {
        if (enemy instanceof Enemy) {
            bullet.destroy();
            enemy.updateHealth();
        }
    }
}


export default GameScene;