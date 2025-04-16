import loadedTypes from "public/data/types.json";

import { LoadedType } from "./loading/types";
import { Item } from "./types/Item";
import { PokemonType } from "./types/PokemonType";

function loadItem(item: LoadedType): PokemonType {
    return { ...item, id: item.key };
}

export const types: Record<string, PokemonType> = Object.fromEntries(
    Object.entries(loadedTypes).map(([id, ability]) => [id, loadItem(ability)])
);

export const nullItem: Item = {
    id: "",
    name: "",
    description: "",
    flags: [],
};
