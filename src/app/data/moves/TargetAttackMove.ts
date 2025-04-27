import { Side } from "@/app/damagecalc/damageCalc";
import { LoadedMove } from "../loading/moves";
import { Move } from "../types/Move";

export class TargetAttackMove extends Move {
    constructor(move: LoadedMove) {
        super(move);
    }

    public getAttackStatSide(): Side {
        return "opponent";
    }

    static moveCodes = ["AttacksWithTargetsStats"];
}
