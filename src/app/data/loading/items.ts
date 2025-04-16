import { KVPair, LoadedData } from "./loadData";

export interface LoadedItem extends LoadedData {
    name: string;
    pocket: number;
    description: string;
    flags: string[];
}

export function parseItems(pairs: KVPair[]): LoadedItem {
    const obj: LoadedItem = {
        key: "",
        name: "",
        pocket: 0, // Note, seems like pocket 5 is all the held items
        description: "",
        flags: [],
    };
    pairs.forEach((pair) => {
        switch (pair.key) {
            case "Bracketvalue":
                obj.key = pair.value;
                break;
            case "Name":
                obj.name = pair.value;
                break;
            case "Pocket":
                obj.pocket = parseInt(pair.value);
                break;
            case "Description":
                obj.description = pair.value;
                break;
            case "Flags":
                obj.flags = pair.value.split(",");
                break;
        }
    });

    return obj;
}

export function filterToHeldItems(allItems: Map<string, LoadedItem>): Map<string, LoadedItem> {
    const items: Map<string, LoadedItem> = new Map();
    allItems.forEach((item) => {
        if (item.pocket == 5) {
            items.set(item.key, item);
        }
    });

    return items;
}
