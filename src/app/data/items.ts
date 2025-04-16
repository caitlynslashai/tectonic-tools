import loadedItems from "public/data/items.json";
import { LoadedItem } from "./loading/items";
import { Item } from "./types/Item";

function loadItem(item: LoadedItem): Item {
    return { ...item, id: item.key };
}

export const items: Record<string, Item> = Object.fromEntries(
    Object.entries(loadedItems).map(([id, item]) => [id, loadItem(item)])
);

export const nullItem: Item = {
    id: "",
    name: "",
    description: "",
    flags: [],
};
