import { MoveData } from "@/app/damagecalc/components/MoveCard";
import { LoadedAbility } from "@/preload/loadedDataClasses";
import { BattleState } from "../battleState";
import { Ability } from "../tectonic/Ability";
import { PartyPokemon } from "../types/PartyPokemon";

type damageBoostConditionFunction = (move: MoveData, user: PartyPokemon, battleState: BattleState) => boolean;

function isTypeCheck(typeId: string) {
    return (move: MoveData, user: PartyPokemon, battleState: BattleState) =>
        move.move.getType(user, battleState).id === typeId;
}

const attackMultBoostCondition: Record<string, damageBoostConditionFunction> = {
    PALEOLITHIC: isTypeCheck("ROCK"),
    HUSTLE: () => true,
    TUNNELMAKER: isTypeCheck("GROUND"),
};

const attackMultBoostValues: Record<string, number> = {
    PALEOLITHIC: 1.5,
    HUSTLE: 1.5,
};

export class AttackMultBoostAbility extends Ability {
    private condition: damageBoostConditionFunction;
    private boostValue: number;
    constructor(ability: LoadedAbility) {
        super(ability);
        this.condition = attackMultBoostCondition[ability.key];
        this.boostValue = attackMultBoostValues[ability.key];
    }

    public attackMultiplier(move: MoveData, user: PartyPokemon, battleState: BattleState) {
        return this.condition(move, user, battleState) ? this.boostValue : 1;
    }

    static abilityIds = Object.keys(attackMultBoostCondition);
}
