import loadedItems from "public/data/items.json";
import { Item } from "./types/Item";

interface LoadedItem {
    id: string;
    name: string;
    description: string;
    flags: string[] | null;
}

function loadItem(item: LoadedItem): Item {
    const newFlags = item.flags || [];
    return { ...item, flags: newFlags };
}

export const items: Record<string, Item> = Object.fromEntries(
    Object.entries(loadedItems).map(([id, ability]) => [id, loadItem(ability)])
);

export const nullItem: Item = {
    id: "",
    name: "",
    description: "",
    flags: [],
};
