import loadedPokemon from "public/data/pokemon.json";
import { forms, nullForm } from "./forms";
import { blankStats, Evolution, Pokemon, Stats } from "./types/Pokemon";

interface LoadedEvolution {
    target: string;
    method: string;
    param: string;
}

export interface LoadedPokemon {
    id: string;
    name: string;
    form_name: string | null;
    type1: string;
    type2: string | null;
    stats: Stats;
    abilities: string[];
    level_moves: (number | string)[][];
    line_moves: string[] | null;
    tutor_moves: string[] | null;
    tribes: string[] | null;
    height: number;
    weight: number;
    kind: string;
    pokedex: string;
    evos: LoadedEvolution[] | null;
}

export const pokemon: Record<string, Pokemon> = Object.fromEntries(
    Object.entries(loadedPokemon).map(([id, mon], i) => [id, new Pokemon(mon, i + 1)])
);

// propagate prevos
const all_evos: Record<string, Evolution> = {};
for (const index in pokemon) {
    const mon = pokemon[index];
    for (const evo of mon.evos) {
        all_evos[evo.target] = { ...evo, target: index, prevo: true };
    }
}

for (const index in pokemon) {
    if (index in all_evos) {
        pokemon[index].evos.push(all_evos[index]);
    }
}

for (const mon in forms) {
    //0th form should fall back to base form
    pokemon[mon].addForms([nullForm, ...forms[mon]]);
}

export const nullPokemon: Pokemon = new Pokemon(
    {
        id: "id",
        name: "",
        form_name: null,
        type1: "Normal",
        type2: null,
        stats: blankStats,
        abilities: [],
        level_moves: [],
        line_moves: null,
        tutor_moves: null,
        tribes: null,
        height: 0,
        weight: 0,
        kind: "",
        pokedex: "",
        evos: null,
    },
    0
);
