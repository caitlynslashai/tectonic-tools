import { nullAbility } from "../abilities";
import { nullItem } from "../items";
import { nullMove } from "../moves";
import { nullPokemon } from "../pokemon";
import { MAX_LEVEL } from "../teamExport";
import { Ability } from "./Ability";
import { Item } from "./Item";
import { Move } from "./Move";
import { blankStats, defaultStylePoints, Pokemon, Stats, StylePoints } from "./Pokemon";
import { PokemonType } from "./PokemonType";

export class PartyPokemon {
    species: Pokemon;
    moves: Move[];
    ability: Ability;
    items: Item[];
    itemTypes: PokemonType[];
    form: number;
    level: number;
    stylePoints: StylePoints;
    statSteps: Stats;
    statusEffect?: string;
    volatileStatusEffects: string[];
    constructor(data?: Partial<PartyPokemon>) {
        this.species = data?.species || nullPokemon;
        this.moves = data?.moves || Array(4).fill(nullMove);
        this.ability = data?.ability || nullAbility;
        this.items = data?.items || Array(2).fill(nullMove);
        this.itemTypes = data?.itemTypes || Array(2).fill(nullItem);
        this.form = data?.form || 0;
        this.level = data?.level || MAX_LEVEL;
        this.stylePoints = data?.stylePoints || defaultStylePoints;
        this.statSteps = data?.statSteps || blankStats;
        this.statusEffect = data?.statusEffect;
        this.volatileStatusEffects = data?.volatileStatusEffects || [];
    }
}
