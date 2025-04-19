import { abilities, nullAbility } from "./abilities";
import { items, nullItem } from "./items";
import { moves, nullMove } from "./moves";
import { nullPokemon, pokemon } from "./pokemon";
import { nullType, types } from "./types";
import { Ability } from "./types/Ability";
import { Item } from "./types/Item";
import { Move } from "./types/Move";
import { Pokemon, Stats, StylePoints } from "./types/Pokemon";
import { PokemonType } from "./types/PokemonType";
import { version, VersionMap, versionMaps } from "./versions";

export const MIN_LEVEL = 1;
export const MAX_LEVEL = 70;
export const STYLE_POINT_CAP = 50;
export const MIN_SP = 0;
export const MAX_SP = 20;
export const MIN_STEP = -12;
export const MAX_STEP = +12;

export function styleFromStat(stat: keyof Stats): keyof StylePoints {
    if (stat === "attack" || stat === "spatk") {
        return "attacks";
    }
    return stat;
}

export interface CardData {
    pokemon: Pokemon;
    moves: Move[];
    ability: Ability;
    items: Item[];
    itemTypes: PokemonType[];
    form: number;
    level: number;
    stylePoints: StylePoints;
}

export interface SavedCardData {
    pokemon: keyof typeof pokemon;
    moves: Array<keyof typeof moves>;
    ability: keyof typeof abilities;
    items: Array<keyof typeof items>;
    itemTypes: Array<keyof typeof types>;
    form: number;
    level: number;
    sp: number[];
}

const encodeChunk = (data: SavedCardData): string => {
    const indices = versionMaps[version].indices;
    const indexList = [
        indices.pokemon[data.pokemon],
        indices.ability[data.ability],
        indices.item[data.items[0]],
        indices.item[data.items[1]],
        indices.types[data.itemTypes[0]],
        indices.types[data.itemTypes[1]],
        data.form,
        indices.move[data.moves[0]],
        indices.move[data.moves[1]],
        indices.move[data.moves[2]],
        indices.move[data.moves[3]],
        data.level,
        ...data.sp,
    ].map((i) => (i === undefined ? -1 : i));

    const buffer = new ArrayBuffer(indexList.length * 2); // Each number is 16 bits (2 bytes)
    const view = new DataView(buffer);

    indexList.forEach((value, i) => {
        view.setUint16(i * 2, value); // Store each number as 16 bits
    });

    return Buffer.from(buffer).toString("base64");
};

export function encodeTeam(savedCards: SavedCardData[]) {
    const chunks = savedCards.map(encodeChunk);
    chunks.unshift(version);
    const code = chunks.join("!"); // Using ! as separator
    return code;
}

const decodeChunk = (chunk: string, version: VersionMap): SavedCardData => {
    const keys = version.keys;
    const buffer = Buffer.from(chunk, "base64");
    const view = new DataView(buffer.buffer);

    const indexList = [];
    for (let i = 0; i < buffer.byteLength; i += 2) {
        indexList.push(view.getUint16(i));
    }

    // autoincrement index instead of hardcoding to be resistant to changes
    let i = 0;

    return {
        pokemon: keys.pokemon[indexList[i++]],
        ability: keys.ability[indexList[i++]],
        items: [keys.item[indexList[i++]], keys.item[indexList[i++]]],
        itemTypes: [keys.types[indexList[i++]], keys.types[indexList[i++]]],
        form: indexList[i++],
        moves: [
            keys.move[indexList[i++]],
            keys.move[indexList[i++]],
            keys.move[indexList[i++]],
            keys.move[indexList[i++]],
        ],
        level: indexList[i++] || MAX_LEVEL,
        sp:
            indexList.length > i++
                ? [indexList[i], indexList[i++], indexList[i++], indexList[i++], indexList[i++]]
                : [10, 10, 10, 10, 10],
    };
};

export function decodeTeam(teamCode: string): CardData[] {
    const chunks = teamCode.split("!");
    const version = chunks[0];
    const dataChunks = chunks.slice(1);

    const loadedCards = dataChunks
        .map((c) => decodeChunk(c, versionMaps[version]))
        .map((card) => ({
            pokemon: pokemon[card.pokemon] || nullPokemon,
            ability: abilities[card.ability] || nullAbility,
            items: card.items.map((i) => items[i] || nullItem),
            itemTypes: card.itemTypes.map((t) => types[t] || nullType),
            form: card.form,
            moves: card.moves.map((m) => moves[m] || nullMove),
            level: card.level,
            stylePoints: {
                hp: card.sp[0],
                attacks: card.sp[1],
                defense: card.sp[2],
                spdef: card.sp[3],
                speed: card.sp[4],
            },
        }));
    return loadedCards;
}
