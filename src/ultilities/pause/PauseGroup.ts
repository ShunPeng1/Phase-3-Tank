class PauseGroup {
    private scene: Phaser.Scene;
    private objects: IPausable[] = [];

    constructor(scene: Phaser.Scene, objects: IPausable[]) {
        this.scene = scene;
        this.objects = objects;
    }

    public setObjectFromScene(scene: Phaser.Scene): void {
        const pausableObjects = scene.sys.updateList.getActive().filter(
            obj => 'pause' in obj && typeof obj.pause === 'function'
        ) as unknown as IPausable[];
        this.objects = pausableObjects;    
    }

    public pause(): void {
        this.objects.forEach((object) => {
            object.pause();
        });
    }

    public resume(): void {
        this.objects.forEach((object) => {
            object.resume();
        });
    }

    


}