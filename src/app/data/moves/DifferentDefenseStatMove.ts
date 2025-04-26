import { LoadedMove } from "../loading/moves";
import { Move } from "../types/Move";
import { Stat } from "../types/Pokemon";

export const differentDefenseStatMoveCodes: Record<string, Stat> = {
    DoesPhysicalDamage: "defense",
};

export class DifferentDefenseStatMove extends Move {
    defenseStat: Stat;
    constructor(move: LoadedMove, defenseStat: Stat) {
        super(move);
        this.defenseStat = defenseStat;
    }

    public getDefendingStat(): Stat {
        return this.defenseStat;
    }
}
