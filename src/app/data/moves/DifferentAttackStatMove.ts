import { LoadedMove } from "../loading/moves";
import { Move } from "../types/Move";
import { Stat } from "../types/Pokemon";

export const differentAttackStatMoveCodes: Record<string, Stat> = {
    AttacksWithDefense: "defense",
};

export class DifferentAttackingStatMove extends Move {
    attackStat: Stat;
    constructor(move: LoadedMove) {
        super(move);
        this.attackStat = differentAttackStatMoveCodes[move.functionCode];
    }

    public getAttackingStat(): Stat {
        return this.attackStat;
    }
}
