import { LoadedMove } from "../loading/moves";
import { Move } from "../types/Move";

interface MultiHits {
    minHits: number;
    maxHits: number;
}

export const multiHitMoves = {
    DOUBLEHIT: {
        minHits: 2,
        maxHits: 2,
    },
    FURYSWIPES: {
        minHits: 2,
        maxHits: 5,
    },
    ARMTHRUST: {
        minHits: 2,
        maxHits: 5,
    },
};

export class MultiHitMove extends Move {
    minHits: number;
    maxHits: number;
    constructor(move: LoadedMove, hits: MultiHits) {
        super(move);
        this.minHits = hits.minHits;
        this.maxHits = hits.maxHits;
    }
}
