import { abilities, nullAbility } from "./abilities";
import { items, nullItem } from "./items";
import { moves, nullMove } from "./moves";
import { nullPokemon, pokemon } from "./pokemon";
import { Ability } from "./types/Ability";
import { Item } from "./types/Item";
import { Move } from "./types/Move";
import { Pokemon } from "./types/Pokemon";
import { version, VersionMap, versionMaps } from "./versions";

export interface CardData {
    pokemon: Pokemon;
    moves: Move[];
    ability: Ability;
    item: Item;
    form: number;
}

export interface SavedCardData {
    pokemon: keyof typeof pokemon;
    moves: Array<keyof typeof moves>;
    ability: keyof typeof abilities;
    item: keyof typeof items;
    form: number;
}

const encodeChunk = (data: SavedCardData): string => {
    const indices = versionMaps[version].indices;
    const indexList = [
        indices.pokemon[data.pokemon],
        indices.ability[data.ability],
        indices.item[data.item],
        data.form,
        indices.move[data.moves[0]],
        indices.move[data.moves[1]],
        indices.move[data.moves[2]],
        indices.move[data.moves[3]],
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

    return {
        pokemon: keys.pokemon[indexList[0]],
        ability: keys.ability[indexList[1]],
        item: keys.item[indexList[2]],
        form: indexList[3],
        moves: [keys.move[indexList[4]], keys.move[indexList[5]], keys.move[indexList[6]], keys.move[indexList[7]]],
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
            item: items[card.item] || nullItem,
            form: card.form,
            moves: card.moves.map((m) => moves[m] || nullMove),
        }));
    return loadedCards;
}
