class LocalStorageManager {
    
    private static instance: LocalStorageManager;
    private inventory: { [key: string]: string};
    private subscribers: { [key: string]: Array<(from : string, to: string) => void> };

    private constructor() {
        this.inventory = {};
        this.subscribers = {}; 
        this.loadInventory();
    }

    public static getInstance(): LocalStorageManager {
        if (!LocalStorageManager.instance) {
            LocalStorageManager.instance = new LocalStorageManager();
        }
        return LocalStorageManager.instance;
    }

    public addItem(item: string, arg1: number) {
        if (this.inventory[item]) {
            let from = this.inventory[item];
            this.inventory[item] = (parseInt(this.inventory[item]) + arg1).toString();
            this.notifySubscribers(item, from);
        }
        else {
            let from = "0";
            this.inventory[item] = arg1.toString();
            this.notifySubscribers(item, from);
        }

    }

    public removeItem(item: string) {
        if (this.inventory[item]) {
            let from = this.inventory[item];
            delete this.inventory[item];
            this.notifySubscribers(item, from);
            this.saveInventory();
        }
    }

    public setItem(item: string, data: string) {
        if (this.inventory[item]) {
            let from = this.inventory[item];
            this.inventory[item] = data;
            this.notifySubscribers(item, from);
        } else {
            let from = "";
            this.inventory[item] = data;
            this.notifySubscribers(item, from);
        }
        this.saveInventory();
    }

    public getItemAsNumber(item: string) {
        return parseInt(this.inventory[item]);
    }

    public getItem(item: string) {
        return this.inventory[item];
    }

    public getInventory() {
        return this.inventory;
    }

    
    public subscribe(item: string, callback: (from: string, to : string) => void) {
        if (!this.subscribers[item]) {
            this.subscribers[item] = [];
        }
        this.subscribers[item].push(callback);
    }

    public unsubscribe(item: string, callback: (from: string, to : string) => void) {
        if (this.subscribers[item]) {
            const index = this.subscribers[item].indexOf(callback);
            if (index !== -1) {
                this.subscribers[item].splice(index, 1);
            }
        }
    }

    private notifySubscribers(item: string, from : string) {
        if (this.subscribers[item]) {
            const to = this.inventory[item] || "";
            this.subscribers[item].forEach(callback => callback(from, to));
        }
    }


    private saveInventory() {
        localStorage.setItem('inventory', JSON.stringify(this.inventory));
    }

    private loadInventory() {
        const inventory = localStorage.getItem('inventory');
        if (inventory) {
            this.inventory = JSON.parse(inventory);
        }
    }
}

export default LocalStorageManager;