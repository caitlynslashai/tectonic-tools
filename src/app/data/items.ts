import loadedItems from "public/data/items.json";
import { Item } from "./types/Item";

export const items: Record<string, Item> = Object.fromEntries(
    Object.entries(loadedItems).map(([id, item]) => [id, new Item(item)])
);

export const nullItem: Item = new Item({
    key: "",
    name: "",
    description: "",
    pocket: 0,
    flags: [],
});
