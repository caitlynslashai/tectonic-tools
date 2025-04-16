import loadedPokemon from "public/data/pokemon.json";
import { forms, nullForm } from "./forms";
import { Evolution, Pokemon } from "./types/Pokemon";

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
        key: "",
        name: "",
        formName: "",
        type1: "NORMAL",
        type2: "",
        abilities: [],
        levelMoves: {},
        lineMoves: [],
        tutorMoves: [],
        tribes: [],
        height: 0,
        weight: 0,
        kind: "",
        pokedex: "",
        evolutions: [],
        dexNum: 0,
        hp: 0,
        attack: 0,
        spAttack: 0,
        speed: 0,
        defense: 0,
        spDefense: 0,
        bst: 0,
        wildItems: [],
        firstEvolution: "",
    },
    0
);
