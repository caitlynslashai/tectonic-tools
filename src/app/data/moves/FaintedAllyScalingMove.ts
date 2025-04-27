import { Move } from "../types/Move";
import { PartyPokemon } from "../types/PartyPokemon";

export class FaintedAllyScalingMove extends Move {
    customVarName: string = "Stockpiles";
    customVarType: string = "number";
    needsInput: boolean = true;
    public getPower(_: PartyPokemon, __: PartyPokemon, faintedAllies: number): number {
        return this.bp + faintedAllies * 20;
    }

    static moveCodes = ["ScalesFaintedPartyMembers"];
}
