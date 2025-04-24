import loadedTrainers from "public/data/trainers.json";
import { Trainer } from "./types/Trainer";

export const trainers: Record<string, Trainer> = Object.fromEntries(
    Object.entries(loadedTrainers).map(([key, trainer]) => {
        return [key, new Trainer(trainer)];
    })
);

// propagate trainer data
for (const trainerId in trainers) {
    const key = trainers[trainerId].extendsKey();
    if (key !== undefined) {
        const extendedTrainer = trainers[key];
        if (!extendedTrainer) {
            throw new Error("Undefined extended trainer " + key + "!");
        }
        trainers[trainerId].flags = extendedTrainer.flags.concat(trainers[trainerId].flags);
        // const updatedPokemon = [...extendedTrainer.pokemon];
        // for (const pokemon of trainers[trainerId].pokemon) {
        //     const extendedPokemonIndex = extendedTrainer.pokemon.findIndex((p) => p.pokemon.id === pokemon.pokemon.id);
        //     if (extendedPokemonIndex === undefined) {
        //         updatedPokemon.push(pokemon);
        //     } else {
        //         const newPokemon = { ...extendedTrainer.pokemon[extendedPokemonIndex], ...pokemon };
        //         updatedPokemon[extendedPokemonIndex] = newPokemon;
        //     }
        // }
        // trainers[trainerId].pokemon = updatedPokemon;
    }
}

export const nullTrainer = new Trainer({
    key: "",
    class: "",
    name: "",
    policies: [],
    flags: [],
    version: 0,
    pokemon: [],
});
