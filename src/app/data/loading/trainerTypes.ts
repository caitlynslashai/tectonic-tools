import { KVPair, LoadedData } from "./loadData";

export interface LoadedTrainerType extends LoadedData {
    name: string;
    gender: string;
    baseMoney: number;
    introBGM?: string;
    battleBGM?: string;
}

export function parseTrainerTypes(pairs: KVPair[]): LoadedTrainerType {
    const obj: LoadedTrainerType = {
        name: "",
        key: "",
        gender: "",
        baseMoney: 0,
    };
    pairs.forEach((pair) => {
        switch (pair.key) {
            case "Bracketvalue":
                obj.key = pair.value;
                break;
            case "Name":
                obj.name = pair.value;
                break;
            case "BaseMoney":
                obj.baseMoney = parseInt(pair.value);
                break;
            case "IntroBGM":
                obj.introBGM = pair.value;
                break;
            case "BattleBGM":
                obj.battleBGM = pair.value;
                break;
        }
    });

    return obj;
}
