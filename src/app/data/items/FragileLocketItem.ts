import { LoadedItem } from "@/preload/loadedDataClasses";
import { Item } from "../tectonic/Item";
import { Stats } from "../tectonic/Pokemon";

// Fragile Locket: reduces all stats by 10%
export class FragileLocketItem extends Item {
    constructor(item: LoadedItem) {
        super(item);
    }

    public modifyStats(stats: Stats): Stats {
        const newStats = { ...stats };
        const statKeys: (keyof Stats)[] = ["hp", "attack", "defense", "speed", "spatk", "spdef"];
        for (const stat of statKeys) {
            newStats[stat] = Math.floor(newStats[stat] * 0.9);
        }
        return newStats;
    }

    static itemIds = ["FRAGILELOCKET"];
}
