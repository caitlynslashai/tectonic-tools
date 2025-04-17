import { KVPair, LoadedData } from "./loadData";
import { NTreeNode } from "../util";

export class LoadedEvolution {
    pokemon: string;
    method: string;
    condition: string;

    constructor(pokemon: string, method: string, condition: string) {
        this.pokemon = pokemon;
        this.method = method;
        this.condition = condition;
    }
}

export interface LoadedPokemon extends LoadedData {
    name: string;
    dexNum: number;
    formName?: string;
    type1: string;
    type2?: string;
    height: number;
    weight: number;
    hp: number;
    attack: number;
    defense: number;
    speed: number;
    spAttack: number;
    spDefense: number;
    bst: number;
    abilities: string[];
    levelMoves: Record<string, number>;
    lineMoves: string[];
    tutorMoves: string[];
    tribes: string[];
    evolutions: LoadedEvolution[];
    kind: string;
    pokedex: string;
    wildItems: string[];
    firstEvolution: string; // Post processing
    evolutionTree?: NTreeNode<LoadedEvolution>; // Post processing
}

export function parsePokemon(pairs: KVPair[]): LoadedPokemon {
    const obj: LoadedPokemon = {
        key: "",
        name: "",
        dexNum: 0,
        type1: "",
        height: 0,
        weight: 0,
        hp: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        spAttack: 0,
        spDefense: 0,
        bst: 0,
        abilities: [],
        levelMoves: {}, // Key of move name and value of level
        lineMoves: [], // Note that only the first evo has this
        tutorMoves: [], // Not every mon has these
        tribes: [],
        evolutions: [],
        wildItems: [],
        kind: "",
        pokedex: "",
        firstEvolution: "",
    };
    pairs.forEach((pair) => {
        switch (pair.key) {
            case "Bracketvalue":
                obj.dexNum = parseInt(pair.value);
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
                obj.wildItems.push(pair.value);
                break;
            case "WildItemUncommon":
                obj.wildItems.push(pair.value);
                break;
            case "WildItemRare":
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
                const evolutions: LoadedEvolution[] = [];
                for (let i = 0; i < evoSplit.length; i += 3) {
                    evolutions.push(new LoadedEvolution(evoSplit[i], evoSplit[i + 1], evoSplit[i + 2]));
                }
                obj.evolutions = evolutions;
                break;
        }
    });

    return obj;
}

export function addAllTribesAndEvoTree(pokemon: Record<string, LoadedPokemon>): Record<string, LoadedPokemon> {
    function addFirstEvo(mon: LoadedPokemon | null, first: string) {
        if (mon == null) {
            return;
        }

        mon.firstEvolution = first;
        mon.evolutions.forEach((evo) => addFirstEvo(pokemon[evo.pokemon], first));
    }

    function getEvoPath(cur: LoadedPokemon, find: LoadedPokemon): LoadedPokemon[] {
        if (cur.key == find.key) {
            return [cur];
        }

        for (const evo of cur.evolutions) {
            const result = getEvoPath(pokemon[evo.pokemon], find);
            if (result.length > 0) {
                return [cur].concat(result);
            }
        }

        return [];
    }

    for (const id in pokemon) {
        if (pokemon[id].firstEvolution.length == 0) {
            addFirstEvo(pokemon[id], pokemon[id].key);
        }
    }

    for (const id in pokemon) {
        if (pokemon[id].tribes.length == 0) {
            const evoPath = getEvoPath(pokemon[pokemon[id].firstEvolution], pokemon[id]);
            pokemon[id].tribes = evoPath.reverse().find((evo) => evo.tribes.length > 0)?.tribes ?? [];
        }
    }

    return pokemon;
}
