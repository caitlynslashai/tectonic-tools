import { getAbilities } from "./abilities";
import { forms, nullForm } from "./forms";
import { loadData } from "./loading/loadData";
import { moves } from "./moves";
import { Pokemon } from "./types/Pokemon";

export let pokemon: Record<string, Pokemon> | undefined = undefined;

export async function getPokemon() {
    if (pokemon !== undefined) {
        return pokemon;
    }
    pokemon = {};
    const loadedPokemon = (await loadData()).pokemon;
    const abilities = await getAbilities();
    loadedPokemon.forEach((mon) => {
        pokemon![mon.key] = new Pokemon(mon, abilities, moves);
    });

    for (const mon in forms) {
        //0th form should fall back to base form
        pokemon[mon].addForms([nullForm, ...forms[mon]]);
    }
    return pokemon;
}

export const nullPokemon: Pokemon = new Pokemon(
    {
        key: "",
        name: "",
        type1: "Normal",
        type2: "",
        dexNum: 0,
        hp: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        spAttack: 0,
        spDefense: 0,
        bst: 0,
        abilities: [],
        levelMoves: new Map(),
        lineMoves: [],
        tutorMoves: [],
        tribes: [],
        height: 0,
        weight: 0,
        // kind: "",
        // pokedex: "",
        evolutions: [],
        wildItems: [],
        firstEvolution: "",
    },
    {},
    {}
);
