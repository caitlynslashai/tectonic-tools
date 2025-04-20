import loadedMoves from "public/data/moves.json";
import { LoadedMove } from "./loading/moves";
import { BreakScreensMove, breakScreensMoves } from "./moves/BreakScreensMove";
import { DesperationMove, desperationMoves } from "./moves/DesperationMove";
import { DifferentAttackingStatMove, differentAttackStatMoves } from "./moves/DifferentAttackStatMove";
import { FacadeMove, facadeMoves } from "./moves/FacadeMove";
import { MultiHitMove, multiHitMoves } from "./moves/MultiHitMove";
import { SmellingSaltsMove, smellingSaltsMoves } from "./moves/SmellingSaltsMove";
import { StackingMove, stackingMoves } from "./moves/StackingMove";
import { VariableTypeMove, typeFromItemMoves } from "./moves/TypeFromItemMove";
import { Move } from "./types/Move";

function loadMove(move: LoadedMove): Move {
    if (move.key in multiHitMoves) {
        const hits = multiHitMoves[move.key as keyof typeof multiHitMoves];
        return new MultiHitMove(move, hits);
    }
    if (move.key in typeFromItemMoves) {
        return new VariableTypeMove(move, typeFromItemMoves[move.key]);
    }
    if (move.key in differentAttackStatMoves) {
        return new DifferentAttackingStatMove(move, differentAttackStatMoves[move.key]);
    }
    // TODO: It's possible that for moves below, which have no unique functionality
    // We could determine them by Flag or FunctionCode, rather than hard coding
    if (stackingMoves.includes(move.key)) {
        return new StackingMove(move);
    }
    if (facadeMoves.includes(move.key)) {
        return new FacadeMove(move);
    }
    if (smellingSaltsMoves.includes(move.key)) {
        return new SmellingSaltsMove(move);
    }
    if (desperationMoves.includes(move.key)) {
        return new DesperationMove(move);
    }
    if (breakScreensMoves.includes(move.key)) {
        return new BreakScreensMove(move);
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
    effectChance: 0,
    priority: 0,
    flags: [],
});
