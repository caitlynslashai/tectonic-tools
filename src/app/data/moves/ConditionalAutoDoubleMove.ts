import { LoadedMove } from "../loading/moves";
import { Move } from "../types/Move";
import { PartyPokemon } from "../types/PartyPokemon";
import { isNull } from "../util";

type ConditionFunction = (user: PartyPokemon, target: PartyPokemon) => boolean;

const conditionalAutoDoubleMoveCodes: Record<string, ConditionFunction> = {
    DoubleDamageNoItem: (user: PartyPokemon) => user.items.filter((i) => !isNull(i)).length === 0,
    DoubleDamageAgainstPoisoned: (_, target: PartyPokemon) => target.statusEffect === "Poison",
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
