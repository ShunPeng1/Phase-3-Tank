class PauseController {
    private scene: Phaser.Scene;
    private objects: IPausable[] = [];

    constructor(scene: Phaser.Scene, objects: IPausable[]) {
        this.scene = scene;
        this.objects = objects;
    }

    public setObjectFromScene(scene: Phaser.Scene): void {
        const pausableObjectsInUpdateList = scene.sys.updateList.getActive().filter(
            obj => 'pause' in obj && typeof obj.pause === 'function' && 'resume' in obj && typeof obj.resume === 'function'
        ) as unknown as IPausable[];

        const pauseableObjectsInDisplayList = scene.sys.displayList.list.filter(
            obj => 'pause' in obj && typeof obj.pause === 'function' && 'resume' in obj && typeof obj.resume === 'function'
        ) as unknown as IPausable[];

        this.objects =  [...pausableObjectsInUpdateList, ...pauseableObjectsInDisplayList];    
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

export default PauseController;