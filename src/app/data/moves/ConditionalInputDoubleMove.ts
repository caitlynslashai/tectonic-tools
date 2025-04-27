import { LoadedMove } from "../loading/moves";
import { Move } from "../types/Move";
import { PartyPokemon } from "../types/PartyPokemon";

const conditionalDoubleMoveCodes: Record<string, string> = {
    DoubleDamageAvengingFaint: "Ally Fainted Last Turn",
    Round: "Other Round This Turn",
    DoubleDamageTargetHitUser: "Target Damaged User This Turn",
    DoubleDamageBerryConsumed: "Berry Consumed This Battle",
    HitsDiggers: "Opponent Underground",
    DoubleDamageLastMoveFailed: "Last Move Failed",
    FusionBolt: "Fusion Flare Used This Turn",
    FusionFlare: "Fusion Bolt Used This Turn",
    DamageBoost50PercentTargetNotAttacked: "Target Hasn't Moved This Turn",
};

export class ConditionalInputDoubleMove extends Move {
    customVarName: string;
    customVarType: string = "boolean";
    needsInput: boolean = true;
    constructor(move: LoadedMove) {
        super(move);
        this.customVarName = conditionalDoubleMoveCodes[move.functionCode];
    }

    public getPower(_: PartyPokemon, __: PartyPokemon, condition: boolean): number {
        return this.bp * (condition ? 2 : 1);
    }

    static moveCodes = Object.keys(conditionalDoubleMoveCodes);
}
