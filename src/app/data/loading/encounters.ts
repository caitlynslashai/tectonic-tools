import { LoadedData } from "./loadData";

interface LoadedEncounter {
    weight: number;
    pokemon: string;
    minLevel: number; // exact level for static encounters
    maxLevel?: number;
}

interface LoadedEncounterTable {
    type: string;
    encounterRate?: number;
    encounters: LoadedEncounter[];
}

export interface LoadedEncounterMap extends LoadedData {
    id: number; // same as key
    name: string;
    tables: LoadedEncounterTable[];
}

// taking pains to deep copy at every step to avoid reference issues
export function parseEncounters(file: string): Record<string, LoadedEncounterMap> {
    let currentMap: LoadedEncounterMap = {
        key: "",
        id: 0,
        name: "",
        tables: [],
    };
    let currentTable: LoadedEncounterTable = {
        type: "",
        encounters: [],
    };
    const map: Record<string, LoadedEncounterMap> = {};

    file.split(/\r?\n/)
        .filter((line) => line.length > 0)
        .forEach((line) => {
            if (line.startsWith("#")) {
                return;
            }

            // new map - first add current table to current map, then finalize current map
            if (line.startsWith("[")) {
                if (currentMap.key !== "") {
                    if (currentTable.type !== "") {
                        currentMap.tables.push({
                            type: currentTable.type,
                            encounterRate: currentTable.encounterRate,
                            encounters: currentTable.encounters.map((enc) => ({ ...enc })),
                        });
                    }
                    map[currentMap.key] = {
                        key: currentMap.key,
                        id: currentMap.id,
                        name: currentMap.name,
                        tables: currentMap.tables.map((table) => ({
                            type: table.type,
                            encounterRate: table.encounterRate,
                            encounters: table.encounters.map((enc) => ({ ...enc })),
                        })),
                    };
                }

                currentTable = {
                    type: "",
                    encounters: [],
                };
                currentMap = {
                    key: "",
                    id: 0,
                    name: "",
                    tables: [],
                };

                const key = line.split("]")[0].slice(1);
                const name = line.split("#")[1].trim();
                currentMap.key = key;
                currentMap.id = parseInt(key);
                currentMap.name = name;
                return;
            }

            if (line.startsWith(" ")) {
                const encounterTerms = line.split(",");
                currentTable.encounters.push({
                    weight: parseInt(encounterTerms[0].trim()),
                    pokemon: encounterTerms[1],
                    minLevel: parseInt(encounterTerms[2]),
                    ...(encounterTerms.length > 3 && { maxLevel: parseInt(encounterTerms[3]) }),
                });
                return;
            }

            // new table
            if (currentTable.type !== "") {
                currentMap.tables.push({
                    type: currentTable.type,
                    encounterRate: currentTable.encounterRate,
                    encounters: currentTable.encounters.map((enc) => ({ ...enc })),
                });
                currentTable = {
                    type: "",
                    encounters: [],
                };
            }
            const tableTerms = line.split(",");
            currentTable.type = tableTerms[0];
            if (tableTerms.length > 1) {
                currentTable.encounterRate = parseInt(tableTerms[1]);
            }
        });

    if (currentTable.type !== "") {
        currentMap.tables.push({
            type: currentTable.type,
            encounterRate: currentTable.encounterRate,
            encounters: currentTable.encounters.map((enc) => ({ ...enc })),
        });
    }

    if (currentMap.key !== "") {
        map[currentMap.key] = {
            key: currentMap.key,
            id: currentMap.id,
            name: currentMap.name,
            tables: currentMap.tables.map((table) => ({
                type: table.type,
                encounterRate: table.encounterRate,
                encounters: table.encounters.map((enc) => ({ ...enc })),
            })),
        };
    }

    return map;
}
