import { LoadedData } from "./loadData";

export interface LoadedTribe extends LoadedData {
    activationCount: number;
    name: string;
    description: string;
}

export function parseTribes(file: string): Map<string, LoadedTribe> {
    const map = new Map();
    file.split(/\r?\n/)
        .filter((line) => line.length > 0)
        .forEach((line) => {
            const obj: LoadedTribe = {
                key: "",
                activationCount: 5,
                name: "",
                description: "",
            };

            const split = line.split(",");
            obj.key = split[0];
            obj.activationCount = parseInt(split[1]);
            obj.name = obj.key[0] + obj.key.substring(1).toLowerCase();
            obj.description = split[2].replaceAll('"', "");

            map.set(obj.key, obj);
        });

    return map;
}
