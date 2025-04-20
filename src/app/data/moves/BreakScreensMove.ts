import { Move } from "../types/Move";

export const breakScreensMoves = ["BRICKBREAK"];

export class BreakScreensMove extends Move {
    public ignoresScreens(): boolean {
        return true;
    }
}
