import { pokemon } from "../pokemon";
import { trainerTypes } from "../trainerTypes";
import { Pokemon, StylePoints } from "./Pokemon";

export interface TrainerPokemon {
    pokemon: Pokemon;
    sp: StylePoints;
    level: number;
    nickname?: string;
}

interface LoadedTrainerPokemon {
    id: string;
    level: number;
    sp: StylePoints;
    nickname: string | null;
}

interface LoadedTrainer {
    class: string;
    name: string;
    hashName: string | null; // for masked villains
    version: number;
    extends: number | null;
    pokemon: LoadedTrainerPokemon[];
}

export class Trainer {
    class: string;
    name: string;
    hashName?: string; // for masked villains
    version: number;
    extends?: number;
    pokemon: TrainerPokemon[];
    constructor(loadedTrainer: LoadedTrainer) {
        const trainerMons = loadedTrainer.pokemon.map((mon) => {
            return { ...mon, pokemon: pokemon[mon.id], nickname: mon.nickname || undefined };
        });
        this.class = loadedTrainer.class;
        this.name = loadedTrainer.name;
        this.hashName = loadedTrainer.hashName || undefined;
        this.version = loadedTrainer.version;
        this.extends = loadedTrainer.extends === null ? undefined : loadedTrainer.extends;
        this.pokemon = trainerMons;
    }

    public key(): string {
        return this.class + this.name + this.version;
    }

    public displayName(): string {
        return (
            // this fallback shouldn't be necessary once trainers.txt and trainertypes.txt are in sync
            // but it doesn't hurt, and makes staggered development easier
            (trainerTypes[this.class]?.name || this.class) +
            " " +
            this.name +
            (this.class.includes("MASKEDVILLAIN") && this.hashName ? " (" + this.hashName + ")" : "") +
            (this.extends !== undefined ? " (Cursed)" : "")
        );
    }
}
