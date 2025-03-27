import { moves } from "./moves";
import { Pokemon } from "./types/Pokemon";

export const pokemon: Record<string, Pokemon> = {
    testpokemon: {
        id: "testpokemon",
        name: "Test Pokemon",
        type1: "Normal",
        type2: "Normal",
        stats: {
            hp: 100,
            attack: 100,
            defense: 100,
            speed: 100,
            spatk: 100,
            spdef: 100,
        },
        moves: [moves["testmove"]],
    },
};

export const nullPokemon: Pokemon = {
    id: "",
    name: "",
    type1: "Normal",
    type2: "Normal",
    stats: {
        hp: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        spatk: 0,
        spdef: 0,
    },
    moves: [],
};
