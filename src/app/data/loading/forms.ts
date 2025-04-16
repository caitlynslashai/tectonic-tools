import { KVPair } from "./loadData";
import { LoadedPokemon } from "./pokemon";

export type LoadedForm = Partial<LoadedPokemon> & { key: string; formId: number };

function parseForm(pairs: KVPair[]): LoadedForm {
    const obj: LoadedForm = {
        key: "",
        formId: 0,
    };
    pairs.forEach((pair) => {
        switch (pair.key) {
            case "Bracketvalue":
                const terms = pair.value.split(",");
                obj.key = terms[0];
                obj.formId = parseInt(terms[1]);
                break;
            case "Name":
                obj.name = pair.value;
                break;
            case "FormName":
                obj.formName = pair.value;
                break;
            case "InternalName":
                obj.key = pair.value;
                break;
            case "Type1":
                obj.type1 = pair.value;
                break;
            case "Type2":
                obj.type2 = pair.value;
                break;
            case "Height":
                obj.height = parseFloat(pair.value);
                break;
            case "Weight":
                obj.weight = parseFloat(pair.value);
                break;
            case "BaseStats":
                const stats = pair.value.split(",");
                obj.hp = parseInt(stats[0]);
                obj.attack = parseInt(stats[1]);
                obj.defense = parseInt(stats[2]);
                obj.speed = parseInt(stats[3]);
                obj.spAttack = parseInt(stats[4]);
                obj.spDefense = parseInt(stats[5]);
                obj.bst = obj.hp + obj.attack + obj.defense + obj.speed + obj.spAttack + obj.spDefense;
                break;
            case "Abilities":
                obj.abilities = pair.value.split(",");
                break;
            case "Moves":
                if (obj.levelMoves === undefined) {
                    obj.levelMoves = {};
                }
                const moveSplit = pair.value.split(",");
                for (let i = 0; i < moveSplit.length; i += 2) {
                    obj.levelMoves[moveSplit[i + 1]] = parseInt(moveSplit[i]);
                }
                break;
            case "LineMoves":
                obj.lineMoves = pair.value.split(",");
                break;
            case "TutorMoves":
                obj.tutorMoves = pair.value.split(",");
                break;
            case "Tribes":
                obj.tribes = pair.value.split(",");
                break;
            case "WildItemCommon":
                if (!obj.wildItems) {
                    obj.wildItems = [];
                }
                obj.wildItems.push(pair.value);
                break;
            case "WildItemUncommon":
                if (!obj.wildItems) {
                    obj.wildItems = [];
                }
                obj.wildItems.push(pair.value);
                break;
            case "WildItemRare":
                if (!obj.wildItems) {
                    obj.wildItems = [];
                }
                obj.wildItems.push(pair.value);
                break;
            case "Kind":
                obj.kind = pair.value;
                break;
            case "Pokedex":
                obj.pokedex = pair.value;
                break;
            case "Evolutions":
                const evoSplit = pair.value.split(",");
                const evolutions = [];
                for (let i = 0; i < evoSplit.length; i += 3) {
                    evolutions.push({ pokemon: evoSplit[i], method: evoSplit[i + 1], condition: evoSplit[i + 2] });
                }
                obj.evolutions = evolutions;
                break;
        }
    });

    return obj;
}

export function parseForms(files: string[]): Record<string, LoadedForm[]> {
    const map: Record<string, LoadedForm[]> = {};

    files.forEach((file) => {
        const pairs: KVPair[] = [];

        file.split(/\r?\n/).forEach((line) => {
            if (line.startsWith("#-")) {
                if (pairs.length !== 0) {
                    const value = parseForm(pairs);
                    if (!(value.key in map)) {
                        map[value.key] = [];
                    }
                    map[value.key].push(value);
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
            const value = parseForm(pairs);
            if (!(value.key in map)) {
                map[value.key] = [];
            }
            map[value.key].push(value);

            pairs.length = 0;
        }
    });

    return map;
}
