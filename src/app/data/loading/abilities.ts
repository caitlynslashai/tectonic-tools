import { KVPair, LoadedData } from "./loadData";

export interface LoadedAbility extends LoadedData {
    name: string;
    description: string;
    flags: string[];
}

export function parseAbilities(pairs: KVPair[]): LoadedAbility {
    const obj: LoadedAbility = {
        key: "",
        name: "",
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
