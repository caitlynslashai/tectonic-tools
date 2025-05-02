import { DamageMultipliers } from "@/app/damagecalc/damageCalc";
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

    // to be modified by subclasses
    // function signature will be updated as necessary to implement items
    public offensiveMultiplier(multipliers: DamageMultipliers): DamageMultipliers {
        return multipliers;
    }

    public defensiveMultiplier(multipliers: DamageMultipliers): DamageMultipliers {
        return multipliers;
    }

    static itemIds: string[] = [];
}
