import { LoadedItem } from "../loading/items";

export class Item {
    id: string;
    name: string;
    description: string;
    pocket: number;
    flags: string[];
    constructor(item: LoadedItem) {
        this.id = item.key;
        this.name = item.name;
        this.description = item.description;
        this.pocket = item.pocket;
        this.flags = item.flags;
    }

    public getImage() {
        return `/Items/${this.id}.png`;
    }
}
