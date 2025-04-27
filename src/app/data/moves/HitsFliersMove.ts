import { LoadedMove } from "../loading/moves";
import { Move } from "../types/Move";

// No special functionality, checked in type chart calculation
// This is for moves that override type calculation to hit flying types and levitators
// *Not* every move that hits Pokemon using fly
export class HitsFliersMove extends Move {
    constructor(move: LoadedMove) {
        super(move);
    }

    static moveCodes = ["HitsTargetInSkyGroundsTarget"];
}
