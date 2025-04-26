import { LoadedMove } from "../loading/moves";
import { Move } from "../types/Move";
import { Stat } from "../types/Pokemon";

export const differentDefenseStatMoveCodes: Record<string, Stat> = {
    DoesPhysicalDamage: "defense",
};

export class DifferentDefenseStatMove extends Move {
    defenseStat: Stat;
    constructor(move: LoadedMove) {
        super(move);
        this.defenseStat = differentDefenseStatMoveCodes[move.functionCode];
    }

    public getDefendingStat(): Stat {
        return this.defenseStat;
    }
}
