// data loading code adapted from https://github.com/Cincidial/techo

import { LoadedAbility, parseAbilities } from "./abilities";
import { filterToHeldItems, LoadedItem, parseItems } from "./items";
import { LoadedMove, parseMoves } from "./moves";
import { addAllTribesAndEvolutions, LoadedPokemon, parsePokemon } from "./pokemon";
import { LoadedTribe, parseTribes } from "./tribes";
import { buildTypeChart, TypeChart } from "./typeChart";
import { LoadedType, parsePokemonTypes } from "./types";

async function fileFetch(path: string) {
    const baseUrl = "https://raw.githubusercontent.com/xeuorux/Pokemon-Tectonic/refs/heads/main/";
    const fullPath = baseUrl + path;
    const response = await fetch(fullPath);

    if (!response.ok) {
        throw new Error(`Fetching ${fullPath} status: ${response.status}`);
    }

    return await response.text();
}

type ParserFunction<T extends LoadedData> = (pairs: KVPair[]) => T;

export interface LoadedData {
    key: string;
}

export interface KVPair {
    key: string;
    value: string;
}

function standardFilesParser<T extends LoadedData>(files: string[], dataParser: ParserFunction<T>): Map<string, T> {
    const map = new Map();

    files.forEach((file) => {
        const pairs: KVPair[] = [];

        file.split(/\r?\n/).forEach((line) => {
            if (line.startsWith("#-")) {
                if (pairs.length !== 0) {
                    const value = dataParser(pairs);
                    map.set(value.key, value);
                }

                pairs.length = 0;
            } else if (!line.includes("#") && line.length > 0) {
                if (line.startsWith("[")) {
                    const value = line.substring(1, line.length - 1);
                    pairs.push({ key: "Bracketvalue", value: value });
                } else {
                    const split = line.split("=");
                    const key = split[0].trim();
                    const value = split[1].trim();

                    pairs.push({ key: key, value: value });
                }
            }
        });

        if (pairs.length !== 0) {
            const value = dataParser(pairs);
            map.set(value.key, value);

            pairs.length = 0;
        }
    });

    return map;
}

interface AllData {
    types: Map<string, LoadedType>;
    tribes: Map<string, LoadedTribe>;
    abilities: Map<string, LoadedAbility>;
    moves: Map<string, LoadedMove>;
    items: Map<string, LoadedItem>;
    heldItems: Map<string, LoadedItem>;
    pokemon: Map<string, LoadedPokemon>;
    typeChart: TypeChart;
    version: string;
}

// memoise
let allData: AllData | undefined = undefined;

export async function loadData(): Promise<AllData> {
    if (allData !== undefined) {
        return allData;
    }
    const tectonicFiles: string[] = [];
    await Promise.all([
        fileFetch("PBS/types.txt"),
        fileFetch("PBS/tribes.txt"),
        fileFetch("PBS/abilities.txt"),
        fileFetch("PBS/abilities_new.txt"),
        fileFetch("PBS/moves.txt"),
        fileFetch("PBS/moves_new.txt"),
        fileFetch("PBS/items.txt"),
        fileFetch("PBS/pokemon.txt"),
        fileFetch("release_version.txt"),
    ])
        .then((values) => tectonicFiles.push(...values))
        .catch((error) => console.error(error));

    const types = standardFilesParser([tectonicFiles[0]], parsePokemonTypes);
    const tribes = parseTribes(tectonicFiles[1]);
    const abilities = standardFilesParser([tectonicFiles[2], tectonicFiles[3]], parseAbilities);
    const moves = standardFilesParser([tectonicFiles[4], tectonicFiles[5]], parseMoves);
    const items = standardFilesParser([tectonicFiles[6]], parseItems);
    const heldItems = filterToHeldItems(items);
    const pokemon = addAllTribesAndEvolutions(standardFilesParser([tectonicFiles[7]], parsePokemon));
    const typeChart = buildTypeChart(types);
    const version = tectonicFiles[8];

    const newData: AllData = { types, tribes, abilities, moves, items, heldItems, pokemon, typeChart, version };
    allData = newData;
    return newData;
}
