import loadedMoves from "public/data/moves.json";
import { LoadedMove } from "./loading/moves";
import { BreakScreensMove, breakScreensMoveCodes } from "./moves/BreakScreensMove";
import { ConditionalDoubleMove, conditionalDoubleMoveCodes } from "./moves/ConditionalDoubleMove";
import { DesperationMove, desperationMoveCodes } from "./moves/DesperationMove";
import { DifferentAttackingStatMove, differentAttackStatMoveCodes } from "./moves/DifferentAttackStatMove";
import { DifferentDefenseStatMove, differentDefenseStatMoveCodes } from "./moves/DifferentDefenseStatMove";
import { ExtraTypeMove, extraTypeMoveCodes } from "./moves/ExtraTypeMove";
import { FacadeMove, facadeMoveCodes } from "./moves/FacadeMove";
import { IgnoreStatMove, ignoreStatMoveCodes } from "./moves/IgnoreStatMove";
import { MultiHitMove, multiHitMoveCodes } from "./moves/MultiHitMove";
import { PunishStatusMove, punishStatusMoveCodes } from "./moves/PunishStatusMove";
import { SpitUpMove, spitUpMoveCodes } from "./moves/SpitUpMove";
import { StackingMove, stackingMoveCodes } from "./moves/StackingMove";
import { VariableTypeMove, variableTypeMoves } from "./moves/TypeFromItemMove";
import { WeightScalingMove, weightScalingMoveCodes } from "./moves/WeightScalingMove";
import { Move } from "./types/Move";

function loadMove(move: LoadedMove): Move {
    if (move.functionCode in multiHitMoveCodes) {
        return new MultiHitMove(move);
    }
    // Judgment, Multi-Attack, and Techno Blast are sufficiently hardcoded that
    // a functionCode-based approach would be more roundabout
    if (move.key in variableTypeMoves) {
        return new VariableTypeMove(move);
    }
    if (move.functionCode in differentAttackStatMoveCodes) {
        return new DifferentAttackingStatMove(move);
    }
    if (move.functionCode in differentDefenseStatMoveCodes) {
        return new DifferentDefenseStatMove(move);
    }
    if (move.functionCode in extraTypeMoveCodes) {
        return new ExtraTypeMove(move);
    }
    if (move.functionCode in conditionalDoubleMoveCodes) {
        return new ConditionalDoubleMove(move);
    }
    if (move.functionCode in ignoreStatMoveCodes) {
        return new IgnoreStatMove(move);
    }
    if (move.functionCode in punishStatusMoveCodes) {
        return new PunishStatusMove(move);
    }
    if (stackingMoveCodes.includes(move.functionCode)) {
        return new StackingMove(move);
    }
    if (facadeMoveCodes.includes(move.functionCode)) {
        return new FacadeMove(move);
    }
    if (desperationMoveCodes.includes(move.functionCode)) {
        return new DesperationMove(move);
    }
    if (breakScreensMoveCodes.includes(move.functionCode)) {
        return new BreakScreensMove(move);
    }
    if (weightScalingMoveCodes.includes(move.functionCode)) {
        return new WeightScalingMove(move);
    }
    if (spitUpMoveCodes.includes(move.functionCode)) {
        return new SpitUpMove(move);
    }
    return new Move(move);
}

export const moves: Record<string, Move> = Object.fromEntries(
    Object.entries(loadedMoves).map(([id, move]) => [id, loadMove(move)])
);

export const nullMove: Move = new Move({
    key: "",
    name: "",
    description: "",
    type: "Normal",
    power: 0,
    accuracy: 0,
    pp: 0,
    category: "Status",
    target: "User",
    functionCode: "Basic",
    effectChance: 0,
    priority: 0,
    flags: [],
});
