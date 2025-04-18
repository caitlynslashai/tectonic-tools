import { LoadedTrainer } from "../loading/trainers";
import { pokemon } from "../pokemon";
import { trainerTypes } from "../trainerTypes";
import { defaultStylePoints, Pokemon, StylePoints } from "./Pokemon";

export interface TrainerPokemon {
    pokemon: Pokemon;
    sp: StylePoints;
    level: number;
    nickname?: string;
}

export class Trainer {
    id: string;
    class: string;
    name: string;
    hashName?: string; // for masked villains
    version: number;
    extends?: number;
    pokemon: TrainerPokemon[];
    constructor(loadedTrainer: LoadedTrainer) {
        const trainerMons: TrainerPokemon[] = loadedTrainer.pokemon.map((mon) => {
            return {
                ...mon,
                pokemon: pokemon[mon.id],
                nickname: mon.name,
                sp:
                    mon.sp.length === 0
                        ? defaultStylePoints
                        : { hp: mon.sp[0], attacks: mon.sp[1], defense: mon.sp[2], speed: mon.sp[3], spdef: mon.sp[5] },
            };
        });
        this.id = loadedTrainer.key;
        this.class = loadedTrainer.class;
        this.name = loadedTrainer.name;
        this.hashName = loadedTrainer.nameForHashing;
        this.version = loadedTrainer.version || 0;
        this.extends = loadedTrainer.extendsVersion;
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
