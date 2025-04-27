import { LoadedMove } from "../loading/moves";
import { types } from "../types";
import { Move } from "../types/Move";
import { PokemonType } from "../types/PokemonType";

const extraEffectMoveCodes: Record<string, string> = {
    SuperEffectiveAgainstFighting: "FIGHTING",
    SuperEffectiveAgainstDragon: "DRAGON",
    SuperEffectiveAgainstGhost: "GHOST",
    SuperEffectiveAgainstElectric: "ELECTRIC",
};

export class ExtraEffectiveMove extends Move {
    extraEffect: PokemonType;
    constructor(move: LoadedMove) {
        super(move);
        this.extraEffect = types[extraEffectMoveCodes[move.functionCode]];
    }

    // no special functionality, checked in type calc

    static moveCodes = Object.keys(extraEffectMoveCodes);
}
