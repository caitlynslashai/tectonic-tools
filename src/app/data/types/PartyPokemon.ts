import { MoveData } from "@/app/damagecalc/components/MoveCard";
import { Side } from "@/app/damagecalc/damageCalc";
import { nullAbility } from "../abilities";
import { nullForm } from "../forms";
import { nullItem } from "../items";
import { TypeChangingItem } from "../items/TypeChangingItem";
import { nullMove } from "../moves";
import { IgnoreStatMove } from "../moves/IgnoreStatMove";
import { nullPokemon } from "../pokemon";
import { calculateHP, calculateStat } from "../stats";
import { StatusEffect, VolatileStatusEffect, volatileStatusEffects } from "../statusEffects";
import { MAX_LEVEL } from "../teamExport";
import { types } from "../types";
import { isNull } from "../util";
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
    itemType: PokemonType;
    form: number;
    level: number;
    stylePoints: StylePoints;
    statSteps: Stats;
    statusEffect?: StatusEffect;
    volatileStatusEffects: Record<VolatileStatusEffect, boolean>;
    constructor(data?: Partial<PartyPokemon>) {
        this.species = data?.species || nullPokemon;
        this.moves = data?.moves || Array(4).fill(nullMove);
        this.ability = data?.ability || nullAbility;
        this.items = data?.items || Array(2).fill(nullItem);
        this.itemType = data?.itemType || types["NORMAL"];
        this.form = data?.form || nullForm.formId;
        this.level = data?.level || MAX_LEVEL;
        this.stylePoints = data?.stylePoints || defaultStylePoints;
        this.statSteps = data?.statSteps || blankStats;
        this.statusEffect = data?.statusEffect;
        this.volatileStatusEffects =
            data?.volatileStatusEffects ||
            (Object.fromEntries(volatileStatusEffects.map((e) => [e, false])) as Record<VolatileStatusEffect, boolean>);
    }

    public getStats(move?: MoveData, side?: Side): Stats {
        const stylish = this.ability.id === "STYLISH";
        const steps = { ...this.statSteps };
        if (move?.criticalHit) {
            // crits ignore player attack drops
            if (side === "player") {
                steps.attack = Math.max(0, steps.attack);
                steps.spatk = Math.max(0, steps.spatk);
            }
            // crits ignore defender defense ups
            if (side === "opponent") {
                steps.defense = Math.min(0, steps.defense);
                steps.spdef = Math.min(0, steps.defense);
            }
        }
        if (move?.move instanceof IgnoreStatMove && side === "opponent") {
            for (const stat of move.move.ignoreStats) {
                steps[stat] = Math.min(0, steps[stat]);
            }
        }
        let speed = calculateStat(this.species.stats.speed, this.level, this.stylePoints.speed, steps.speed, stylish);
        // TODO: abilities probably can sometimes affect this
        if (this.statusEffect === "Numb") {
            speed = speed / 2;
        }
        const calculatedStats: Stats = {
            hp: calculateHP(this.species.stats.hp, this.level, this.stylePoints.hp, stylish),
            attack: calculateStat(
                this.species.stats.attack,
                this.level,
                this.stylePoints.attacks,
                steps.attack,
                stylish
            ),
            defense: calculateStat(
                this.species.stats.defense,
                this.level,
                this.stylePoints.defense,
                steps.defense,
                stylish
            ),
            spatk: calculateStat(this.species.stats.spatk, this.level, this.stylePoints.attacks, steps.spatk, stylish),
            spdef: calculateStat(this.species.stats.spdef, this.level, this.stylePoints.spdef, steps.spdef, stylish),
            speed,
        };
        return calculatedStats;
    }

    get types(): { type1: PokemonType; type2?: PokemonType } {
        if (this.items.some((i) => i instanceof TypeChangingItem && i.canChangeType(this)) && !isNull(this.itemType)) {
            return { type1: this.itemType };
        }
        return { type1: this.species.getType1(this.form), type2: this.species.getType2(this.form) };
    }
}
