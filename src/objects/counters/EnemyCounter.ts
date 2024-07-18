import Enemy from "../Enemy";

class EnemyCounter extends Phaser.Events.EventEmitter{


    private enemies: Enemy[];
    private maxEnemies: number = 0;

    public static readonly ENEMY_DESTROYED_EVENT = 'enemyDestroyed';
    public static readonly ENEMY_COUNTER_KEY = 'enemyCounter';
    
    constructor(enemies: Enemy[]){
        super();

        this.enemies = enemies;
    }

    public addEnemy(enemy: Enemy) : void{
        this.enemies.push(enemy);

        this.maxEnemies = Math.max(this.maxEnemies, this.enemies.length);
    }

    public destroyEnemy(enemy: Enemy) : void{
        this.enemies = this.enemies.filter((e) => e !== enemy);
        enemy.destroy();

        this.emit(EnemyCounter.ENEMY_DESTROYED_EVENT, this.enemies, this.maxEnemies);
    }

    public getEnemies() : Enemy[] {
        return this.enemies;
    }

}

export default EnemyCounter;