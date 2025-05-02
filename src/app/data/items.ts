import loadedItems from "public/data/items.json";
import { EvioliteItem } from "./items/EvioliteItem";
import { LumberAxeItem } from "./items/LumberAxeItem";
import { StatBoostItem } from "./items/StatBoostItem";
import { StatLockItem } from "./items/StatLockItem";
import { TypeBoostingItem } from "./items/TypeBoostingItem";
import { TypeChangingItem } from "./items/TypeChangingItem";
import { LoadedItem } from "./loading/items";
import { Item } from "./types/Item";

const itemSubclasses = [EvioliteItem, LumberAxeItem, StatBoostItem, StatLockItem, TypeBoostingItem, TypeChangingItem];

function loadItem(item: LoadedItem): Item {
    for (const subclass of itemSubclasses) {
        if (subclass.itemIds.includes(item.key)) {
            return new subclass(item);
        }
    }
    return new Item(item);
}

export const items: Record<string, Item> = Object.fromEntries(
    Object.entries(loadedItems).map(([id, item]) => [id, loadItem(item)])
);

export const nullItem: Item = new Item({
    key: "",
    name: "",
    description: "",
    pocket: 0,
    flags: [],
});
