import { LoadedMove } from "../loading/moves";
import { Move } from "../types/Move";

// No special functionality, checked in type chart calculation
export class HitsFliersMove extends Move {
    constructor(move: LoadedMove) {
        super(move);
    }

    static moveCodes = ["HitsTargetInSkyGroundsTarget"];
}
