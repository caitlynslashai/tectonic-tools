import { LoadedMove } from "../loading/moves";
import { Move } from "../types/Move";
import { Stat } from "../types/Pokemon";

export const ignoreStatMoveCodes: Record<string, Stat[]> = {
    IgnoreTargetDefSpDefEvaStatStages: ["defense", "spdef"],
};

export class IgnoreStatMove extends Move {
    ignoreStats: Stat[];
    constructor(move: LoadedMove, ignoreStats: Stat[]) {
        super(move);
        this.ignoreStats = ignoreStats;
    }
}
