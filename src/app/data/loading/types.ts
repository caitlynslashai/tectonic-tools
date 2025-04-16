import { KVPair, LoadedData } from "./loadData";

export interface LoadedType extends LoadedData {
    index: number;
    name: string;
    weaknesses: string;
    resistances: string;
    immunities: string;
    isRealType: boolean;
}

export function parsePokemonTypes(pairs: KVPair[]): LoadedType {
    const obj: LoadedType = {
        index: -1,
        name: "",
        key: "",
        weaknesses: "",
        resistances: "",
        immunities: "",
        isRealType: true,
    };
    pairs.forEach((pair) => {
        switch (pair.key) {
            case "Bracketvalue":
                obj.index = parseInt(pair.value);
                break;
            case "Name":
                obj.name = pair.value;
                break;
            case "InternalName":
                obj.key = pair.value;
                break;
            case "Weaknesses":
                obj.weaknesses = pair.value;
                break;
            case "Resistances":
                obj.resistances = pair.value;
                break;
            case "Immunities":
                obj.immunities = pair.value;
                break;
            case "IsPseudoType":
                obj.isRealType = false;
                break;
        }
    });

    return obj;
}
