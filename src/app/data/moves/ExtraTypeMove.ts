import { LoadedMove } from "../loading/moves";
import { types } from "../types";
import { Move } from "../types/Move";
import { PokemonType } from "../types/PokemonType";

const extraTypeMoveCodes: Record<string, string> = {
    EffectivenessIncludesFlyingType: "FLYING",
    EffectivenessIncludesPsychicType: "PSYCHIC",
};

export class ExtraTypeMove extends Move {
    extraType: PokemonType;
    constructor(move: LoadedMove) {
        super(move);
        this.extraType = types[extraTypeMoveCodes[move.functionCode]];
    }

    static moveCodes = Object.keys(extraTypeMoveCodes);
}
