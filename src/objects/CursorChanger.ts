class CursorChanger {
    private scene: Phaser.Scene;
    private defaultCursor: string;

    constructor(scene: Phaser.Scene, defaultCursor: string = 'default') {
        this.scene = scene;
        this.defaultCursor = defaultCursor;

        

    }

    public changeCursor(cursorStyle: string): void {
        //this.scene.input.setDefaultCursor('url(assets/input/cursors/blue.cur), pointer');
        this.scene.input.setDefaultCursor(cursorStyle);

    }

    public resetCursor(): void {
        this.scene.input.setDefaultCursor(this.defaultCursor);
    }
}


export default CursorChanger;