import { LoadedMove } from "../loading/moves";
import { StatusEffect } from "../statusEffects";
import { Move } from "../types/Move";
import { PartyPokemon } from "../types/PartyPokemon";
import { isNull } from "../util";

type ConditionFunction = (user: PartyPokemon, target: PartyPokemon) => boolean;

function punishStatus(status: StatusEffect) {
    return (_: PartyPokemon, target: PartyPokemon) => target.statusEffect === status;
}

const conditionalAutoDoubleMoveCodes: Record<string, ConditionFunction> = {
    DoubleDamageNoItem: (user: PartyPokemon) => user.items.filter((i) => !isNull(i)).length === 0,
    DoubleDamageTargetStatused: (_: PartyPokemon, target: PartyPokemon) => target.statusEffect !== "None", // Does Hex interact with Volatile SEs?
    DoubleDamageAgainstPoisoned: punishStatus("Poison"),
    // Smelling Salts and Wake-Up Slap aren't identical to Venoshock,
    // but the status-curing part isn't relevant to a single turn of damage calculation
    SmellingSalts: punishStatus("Numb"),
    WakeUpSlap: punishStatus("Sleep"),
};

export class ConditionalAutoDoubleMove extends Move {
    condition: ConditionFunction;
    constructor(move: LoadedMove) {
        super(move);
        this.condition = conditionalAutoDoubleMoveCodes[move.functionCode];
    }
    public getPower(user: PartyPokemon, target: PartyPokemon): number {
        return this.bp * (this.condition(user, target) ? 2 : 1);
    }

    static moveCodes = Object.keys(conditionalAutoDoubleMoveCodes);
}
