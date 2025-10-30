import { MoveData } from "@/app/damagecalc/components/MoveCard";
import { LoadedAbility } from "@/preload/loadedDataClasses";
import { Ability } from "../tectonic/Ability";

type damageBoostConditionFunction = (move: MoveData) => boolean;

const baseDamageBoostConditions: Record<string, damageBoostConditionFunction> = {
    RECKLESS: (move: MoveData) => move.move.isRecoil(),
    EARSPLITTING: (move: MoveData) => move.move.flags.includes("Sound"),
    HOOLIGAN: (move: MoveData) => move.move.flags.includes("Sound") || move.move.isRecoil(),
    LOUD: (move: MoveData) => move.move.flags.includes("Sound"),
    KNUCKLEDUSTER: (move: MoveData) => move.move.flags.includes("Punch"),
    IRONFIST: (move: MoveData) => move.move.flags.includes("Punch"),
    SWORDPLAY: (move: MoveData) => move.move.flags.includes("Blade"),
    RAZORSEDGE: (move: MoveData) => move.move.flags.includes("Blade"),
    BLADEBRAINED: (move: MoveData) => move.move.flags.includes("Blade"),
    MEGALAUNCHER: (move: MoveData) => move.move.flags.includes("Pulse"),
    BADOMEN: (move: MoveData) => move.move.flags.includes("Foretold"),


};

const baseDamageBoostValues: Record<string, number> = {
    RECKLESS: 1.3,
    EARSPLITTING: 1.5,
    HOOLIGAN: 1.3,
    LOUD: 1.3,
    KNUCKLEDUSTER: 1.5,
    IRONFIST: 1.3,
    SWORDPLAY: 1.3,
    RAZORSEDGE: 1.3,
    BLADEBRAINED: 1.5,  
    MEGALAUNCHER: 1.5,
    BADOMEN: 1.3,

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
