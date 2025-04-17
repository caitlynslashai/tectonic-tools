import loadedPokemon from "public/data/pokemon.json";
import { forms, nullForm } from "./forms";
import { Pokemon } from "./types/Pokemon";
import { LoadedEvolution, LoadedPokemon } from "./loading/pokemon";
import { NTreeNode } from "./util";

export const pokemon: Record<string, Pokemon> = {}
const loadData: Record<string, LoadedPokemon> = {}
Object.entries(loadedPokemon).forEach(([id, mon], _i) => loadData[id] = mon);

function buildEvoTree(curNode: NTreeNode<LoadedEvolution>, cur: LoadedPokemon) {
    for (const evo of cur.evolutions) {
        buildEvoTree(curNode.addChild(evo), loadData[evo.pokemon])
    }
}

Object.values(loadData).forEach((loadMon) => {
    const firstEvo = loadData[loadMon.firstEvolution];
    if (firstEvo.evolutionTree == null) {
        firstEvo.evolutionTree = new NTreeNode(new LoadedEvolution(firstEvo.key, "", ""));
        buildEvoTree(firstEvo.evolutionTree, firstEvo);
    }
    loadMon.evolutionTree = firstEvo.evolutionTree;
    pokemon[loadMon.key] = new Pokemon(loadMon, loadMon.dexNum)
})

for (const mon in forms) {
    //0th form should fall back to base form
    pokemon[mon].addForms([nullForm, ...forms[mon]]);
}

export const nullPokemon = new Pokemon(
    {
        key: "",
        name: "",
        formName: "",
        type1: "NORMAL",
        type2: "",
        abilities: [],
        levelMoves: {},
        lineMoves: [],
        tutorMoves: [],
        tribes: [],
        evolutions: [],
        height: 0,
        weight: 0,
        kind: "",
        pokedex: "",
        dexNum: 0,
        hp: 0,
        attack: 0,
        spAttack: 0,
        speed: 0,
        defense: 0,
        spDefense: 0,
        bst: 0,
        wildItems: [],
        firstEvolution: "",
    },
    0
);
