class UiGridLayout<T extends Phaser.GameObjects.GameObject> extends Phaser.GameObjects.Container {

    private grid: T[][];
    private offsetX: number;
    private offsetY: number;
    private spacingX: number;
    private spacingY: number;

    constructor(scene: Phaser.Scene, x: number, y: number, offsetX: number, offsetY: number, spacingX: number, spacingY: number) {
        super(scene, x, y);
        
        this.scene = scene;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.spacingX = spacingX;
        this.spacingY = spacingY;
        this.grid = [];
    }

    public createGrid(minColumn: number, count: number, factoryFunction: (scene: Phaser.Scene, x: number, y: number, index: number) => T, isTranspose: boolean = false): void {
        let rowCount = Math.ceil(count / minColumn);
        let columnCount = minColumn;
    
        this.grid = [];
    
        for (let i = 0; i < rowCount; i++) {
            this.grid[i] = [];
            for (let j = 0; j < columnCount; j++) {
                let index = isTranspose ? j * rowCount + i : i * columnCount + j;
                if (index >= count) break; // Prevent creating more items than the count
    
                const posX = (isTranspose ? j : i) * (this.scaleX + this.spacingX);
                const posY = (isTranspose ? i : j) * (this.scaleY + this.spacingY);
                const gameObject = factoryFunction(this.scene, posX, posY, index);
    
                this.add(gameObject); // Add the gameObject to the container for automatic positioning and rendering.
                this.grid[i][j] = gameObject;
            }
        }
    }

    public setItem(column: number, row: number, item: T): void {
        if (!this.grid[row]) this.grid[row] = [];
        this.grid[row][column] = item;
    }

    public setPosition(x?: number, y?: number, z?: number, w?: number): this {
        super.setPosition(x, y, z, w);
        return this;
    }

    


    // Optional: Method to remove the grid or a specific button
    public removeGrid(): void {
        for (let row of this.grid) {
            for (let gameObject of row) {
                gameObject.destroy();
            }
        }
        this.grid = [];
    }

    public removeButton(column: number, row: number): void {
        if (this.grid[row] && this.grid[row][column]) {
            this.grid[row][column].destroy();
        }
    }
}

export default UiGridLayout;