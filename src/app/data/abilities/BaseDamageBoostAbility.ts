import { MoveData } from "@/app/damagecalc/components/MoveCard";
import { LoadedAbility } from "@/preload/loadedDataClasses";
import { Ability } from "../tectonic/Ability";

type damageBoostConditionFunction = (move: MoveData) => boolean;

const baseDamageBoostConditions: Record<string, damageBoostConditionFunction> = {
    RECKLESS: (move: MoveData) => move.move.isRecoil(),
    BRISK: (move: MoveData) => move.move.flags.includes("Wind"),
    GALEFORCE: (move: MoveData) => move.move.flags.includes("Wind"),
    HEAVYDUTYHOOVES: (move: MoveData) => move.move.flags.includes("Kick") || move.move.flags.includes("Kicking"),
    IRONHEEL: (move: MoveData) => move.move.flags.includes("Kick") || move.move.flags.includes("Kicking"),
    STRONGJAW: (move: MoveData) => move.move.flags.includes("Biting") || move.move.flags.includes("Bite"),
    STONEMANE: (move: MoveData) => move.move.isRecoil(),
};

const baseDamageBoostValues: Record<string, number> = {
    RECKLESS: 1.3,
    BRISK: 1.3,
    GALEFORCE: 1.5,
    HEAVYDUTYHOOVES: 1.3,
    IRONHEEL: 1.3,
    STRONGJAW: 1.5,
    STONEMANE: 1.2,
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
