import { items, nullItem } from "../items";
import { LoadedTrainer } from "../loading/trainers";
import { moves, nullMove } from "../moves";
import { pokemon } from "../pokemon";
import { getSignatureMoves } from "../signatures";
import { trainers } from "../trainers";
import { trainerTypes } from "../trainerTypes";
import { nullType, types } from "../types";
import { isNull } from "../util";
import { Ability } from "./Ability";
import { Item } from "./Item";
import { Move } from "./Move";
import { defaultStylePoints, Pokemon, StylePoints } from "./Pokemon";
import { PokemonType } from "./PokemonType";

export interface TrainerPokemon {
    pokemon: Pokemon;
    sp: StylePoints;
    level: number;
    nickname?: string;
    moves: Move[];
    ability: Ability;
    items: Item[];
    itemType: PokemonType;
}

export class Trainer {
    id: string;
    class: string;
    name: string;
    hashName?: string; // for masked villains
    typeLabel?: string; // overrides class name
    version: number;
    extends?: number;
    pokemon: TrainerPokemon[];
    flags: string[];
    constructor(loadedTrainer: LoadedTrainer) {
        const trainerMons: TrainerPokemon[] = loadedTrainer.pokemon.map((mon) => {
            // for some reason a mapping approach consistently returned blanks instead of nulls
            let monMoves = [
                moves[mon.moves[0]] || nullMove,
                moves[mon.moves[1]] || nullMove,
                moves[mon.moves[2]] || nullMove,
                moves[mon.moves[3]] || nullMove,
            ];
            // if no moves defined, autofill learnset
            if (monMoves.filter((m) => !isNull(m)).length === 0) {
                const newMoves = [];
                const signatureMove = pokemon[mon.id].levelMoves.find(([, move]) => move.id in getSignatureMoves());
                if (signatureMove) {
                    newMoves.push(moves[signatureMove[1].id]);
                }
                // don't auto-learn moves past level 50
                const maxLevel = Math.min(mon.level, 50);
                const movesUpToLevel = pokemon[mon.id].levelMoves
                    .filter(
                        ([level, move]) =>
                            level <= maxLevel && // get moves learnable up to current level
                            (!signatureMove || move.id !== signatureMove[1].id) && // skip signatures to avoid duplication
                            level !== 0 // skip evolution moves to avoid duplication
                    )
                    .sort((a, b) => b[0] - a[0]);
                while (newMoves.length < 4 && movesUpToLevel.length > 0) {
                    const nextMove = movesUpToLevel.shift();
                    if (nextMove) newMoves.push(nextMove[1]);
                }
                while (newMoves.length < 4) {
                    newMoves.push(nullMove);
                }
                monMoves = newMoves.reverse();
            }
            const abilityIndex = mon.abilityIndex || 0;
            const finalMon: TrainerPokemon = {
                ...mon,
                pokemon: pokemon[mon.id],
                nickname: mon.name,
                sp:
                    mon.sp.length === 0
                        ? defaultStylePoints
                        : { hp: mon.sp[0], attacks: mon.sp[1], defense: mon.sp[2], speed: mon.sp[3], spdef: mon.sp[5] },
                ability: pokemon[mon.id].abilities[abilityIndex],
                moves: monMoves,
                items: [items[mon.items[0]] || nullItem, items[mon.items[1]] || nullItem],
                itemType: nullType, // override the string from the unpack above
            };
            if (mon.itemType) {
                finalMon.itemType = types[mon.itemType] || nullType;
            }
            return finalMon;
        });
        this.id = loadedTrainer.key;
        this.class = loadedTrainer.class;
        this.name = loadedTrainer.name;
        this.hashName = loadedTrainer.nameForHashing;
        this.typeLabel = loadedTrainer.typeLabel;
        this.version = loadedTrainer.version || 0;
        this.extends = loadedTrainer.extendsVersion;
        this.pokemon = trainerMons;
        this.flags = loadedTrainer.flags;
    }

    public key(): string {
        return this.class + "," + this.name + "," + this.version;
    }

    public extendsKey(): string | undefined {
        return this.extends !== undefined
            ? this.class + "," + this.name + (this.extends > 0 ? "," + this.extends : "")
            : undefined;
    }

    public displayName(): string {
        let name =
            // the last fallback shouldn't be necessary once trainers.txt and trainertypes.txt are in sync
            // but it doesn't hurt, and makes staggered development easier
            ((this.typeLabel && trainerTypes[this.typeLabel]?.name) || trainerTypes[this.class]?.name || this.class) +
            " " +
            this.name +
            (this.class.includes("MASKEDVILLAIN") && this.hashName ? " (" + this.hashName + ")" : "");
        if (this.flags.includes("HideIdentity")) {
            name = "Mysterious Trainer (" + name + ")";
        }
        if (this.version > 0) {
            const allVersions = Object.values(trainers).filter(
                (t) => t.class === this.class && t.name === this.name && t.extends === undefined
            );
            const baseVersion = this.extends !== undefined ? this.extends : this.version;
            if (baseVersion > 0) {
                const publicVersionNumber = allVersions.findIndex((t) => t.version === baseVersion) + 1;
                name += " (" + publicVersionNumber + ")";
            }
        }
        if (this.extends !== undefined) {
            name += " (Cursed)";
        }
        return name;
    }
}
