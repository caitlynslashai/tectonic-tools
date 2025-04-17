// data loading code adapted from https://github.com/Cincidial/techo

import { readFile, writeFile } from "fs/promises";
import path from "path";
import { parseAbilities } from "./abilities";
import { parseForms } from "./forms";
import { parseItems } from "./items";
import { parseMoves } from "./moves";
import { parsePokemon, propagatePokemonData } from "./pokemon";
import { parseTribes } from "./tribes";
import { buildTypeChart, TypeChart } from "./typeChart";
import { parsePokemonTypes } from "./types";

async function fileFetch(path: string) {
    const baseUrl = "https://raw.githubusercontent.com/xeuorux/Pokemon-Tectonic/refs/heads/main/";
    const fullPath = baseUrl + path;
    const response = await fetch(fullPath);

    if (!response.ok) {
        throw new Error(`Fetching ${fullPath} status: ${response.status}`);
    }

    return await response.text();
}

async function dataRead(filePath: string) {
    const basePath = path.join(__dirname, "../../../../public/data/");
    const fullPath = basePath + filePath;

    const fileData = await readFile(fullPath, "utf-8");
    return JSON.parse(fileData);
}

async function dataWrite<T>(filePath: string, contents: Record<string, T> | TypeChart | string) {
    const basePath = path.join(__dirname, "../../../../public/data/");
    const fullPath = basePath + filePath;

    const output = typeof contents === "string" ? contents : JSON.stringify(contents);

    await writeFile(fullPath, output);
}

type ParserFunction<T extends LoadedData> = (pairs: KVPair[]) => T;

export interface LoadedData {
    key: string;
}

export interface KVPair {
    key: string;
    value: string;
}

function standardFilesParser<T extends LoadedData>(files: string[], dataParser: ParserFunction<T>): Record<string, T> {
    const map: Record<string, T> = {};

    files.forEach((file) => {
        const pairs: KVPair[] = [];

        file.split(/\r?\n/).forEach((line) => {
            if (line.startsWith("#-")) {
                if (pairs.length !== 0) {
                    const value = dataParser(pairs);
                    map[value.key] = value;
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
            map[value.key] = value;

            pairs.length = 0;
        }
    });

    return map;
}

async function loadData(): Promise<void> {
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
        fileFetch("PBS/pokemonforms.txt"),
        fileFetch("release_version.txt"),
    ])
        .then((values) => tectonicFiles.push(...values))
        .catch((error) => console.error(error));

    const types = standardFilesParser([tectonicFiles[0]], parsePokemonTypes);
    const tribes = parseTribes(tectonicFiles[1]);
    const abilities = standardFilesParser([tectonicFiles[2], tectonicFiles[3]], parseAbilities);
    const moves = standardFilesParser([tectonicFiles[4], tectonicFiles[5]], parseMoves);
    const items = standardFilesParser([tectonicFiles[6]], parseItems);
    // const heldItems = filterToHeldItems(items);
    const pokemon = propagatePokemonData(standardFilesParser([tectonicFiles[7]], parsePokemon));
    const forms = parseForms([tectonicFiles[8]]);
    const typeChart = buildTypeChart(types);
    const version = tectonicFiles[9].trim();
    const currentVersion = { version };

    const indices = {
        pokemon: Object.fromEntries(Object.keys(pokemon).map((id, i) => [id, i])),
        ability: Object.fromEntries(Object.keys(abilities).map((id, i) => [id, i])),
        item: Object.fromEntries(Object.keys(items).map((id, i) => [id, i])),
        move: Object.fromEntries(Object.keys(moves).map((id, i) => [id, i])),
    };

    const keys = {
        pokemon: Object.keys(pokemon),
        ability: Object.keys(abilities),
        item: Object.keys(items),
        move: Object.keys(moves),
    };

    const versions = await dataRead("versions.json");
    versions[version] = { indices, keys };

    await Promise.all([
        dataWrite("types.json", types),
        dataWrite("tribes.json", tribes),
        dataWrite("abilities.json", abilities),
        dataWrite("moves.json", moves),
        dataWrite("items.json", items),
        dataWrite("pokemon.json", pokemon),
        dataWrite("forms.json", forms),
        dataWrite("typechart.json", typeChart),
        dataWrite("currentversion.json", currentVersion),
        dataWrite("versions.json", versions),
    ]);
}

loadData().catch((e) => console.error(e));
