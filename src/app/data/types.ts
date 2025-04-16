import loadedTypes from "public/data/types.json";

import { LoadedType } from "./loading/types";
import { PokemonType } from "./types/PokemonType";

function loadType(item: LoadedType): PokemonType {
    return { ...item, id: item.key };
}

export const types: Record<string, PokemonType> = Object.fromEntries(
    Object.entries(loadedTypes).map(([id, monType]) => [id, loadType(monType)])
);

export const nullType: PokemonType = {
    id: "",
    name: "",
    index: 0,
    weaknesses: "",
    resistances: "",
    immunities: "",
    isRealType: false,
};
