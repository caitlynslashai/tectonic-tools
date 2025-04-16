import { KVPair, LoadedData } from "./loadData";

export interface LoadedMove extends LoadedData {
    name: string;
    type: string;
    category: string;
    power: number;
    accuracy: number;
    pp: number;
    target: string;
    effectChance: number;
    priority: number;
    description: string;
    flags: string[];
}

export function parseMoves(pairs: KVPair[]): LoadedMove {
    const obj: LoadedMove = {
        key: "",
        name: "",
        type: "",
        category: "",
        power: 0,
        accuracy: 0,
        pp: 0,
        target: "",
        effectChance: 0,
        priority: 0,
        description: "",
        flags: [],
    };
    pairs.forEach((pair) => {
        switch (pair.key) {
            case "Bracketvalue":
                obj.key = pair.value;
                break;
            case "Name":
                obj.name = pair.value;
                break;
            case "Type":
                obj.type = pair.value;
                break;
            case "Category":
                obj.category = pair.value;
                break;
            case "Power":
                obj.power = parseInt(pair.value);
                break;
            case "Accuracy":
                obj.accuracy = parseInt(pair.value);
                break;
            case "TotalPP":
                obj.pp = parseInt(pair.value);
                break;
            case "Target":
                obj.target = pair.value;
                break;
            case "EffectChance":
                obj.effectChance = parseInt(pair.value);
                break;
            case "Priority":
                obj.priority = parseInt(pair.value);
                break;
            case "Description":
                obj.description = pair.value;
                break;
            case "Flags":
                obj.flags = pair.value.split(",");
                break;
        }
    });

    return obj;
}
