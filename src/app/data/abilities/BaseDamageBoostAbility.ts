import { MoveData } from "@/app/damagecalc/components/MoveCard";
import { LoadedAbility } from "@/preload/loadedDataClasses";
import { Ability } from "../tectonic/Ability";

type damageBoostConditionFunction = (move: MoveData) => boolean;

const baseDamageBoostConditions: Record<string, damageBoostConditionFunction> = {
    RECKLESS: (move: MoveData) => move.move.isRecoil(),
    SCALDINGSMOKE: (move: MoveData) => move.move.type.id === "POISON",
    VERDANT: (move: MoveData) => move.move.type.id === "GRASS",
    TUNNELMAKER: (move: MoveData) => move.move.type.id === "GROUND",
    STRATAGEM: (move: MoveData) => move.move.type.id === "ROCK",
    TOXICATTITUDE: (move: MoveData) => move.move.type.id === "POISON",
    STEELWORKER: (move: MoveData) => move.move.type.id === "STEEL",
    STEELYSPIRIT: (move: MoveData) => move.move.type.id === "STEEL",
    SURFSUP: (move: MoveData) => move.move.type.id === "WATER",
    ERUDITE: (move: MoveData) => move.move.type.id === "PSYCHIC",

};

const baseDamageBoostValues: Record<string, number> = {
    RECKLESS: 1.3,
    SCALDINGSMOKE: 1.5,
    VERDANT: 1.5,
    TUNNELMAKER: 1.5,
    STRATAGEM: 1.5,
    TOXICATTITUDE: 1.5,
    STEELWORKER: 1.5,
    STEELYSPIRIT: 1.5,
    SURFSUP: 1.5,
    ERUDITE: 1.5,
};

export class BaseDamageBoostAbility extends Ability {
    private condition: damageBoostConditionFunction;
    private boostValue: number;
    constructor(ability: LoadedAbility) {
        super(ability);
        this.condition = baseDamageBoostConditions[ability.key];
        this.boostValue = baseDamageBoostValues[ability.key];
    }

    public movePowerMultiplier(move: MoveData) {
        return this.condition(move) ? this.boostValue : 1;
    }

    static abilityIds = Object.keys(baseDamageBoostConditions);
}
