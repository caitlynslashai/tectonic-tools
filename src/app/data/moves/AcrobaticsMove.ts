import { Move } from "../types/Move";
import { PartyPokemon } from "../types/PartyPokemon";
import { isNull } from "../util";

// could be extended to other doubling conditions in the future
// just need a naming scheme that distinguishes between
// ConditionalDoubleMove (where the condition is flagged by the user)
// and these (where the condition is derived from the game state automatically)
export class AcrobaticsMove extends Move {
    public getPower(user: PartyPokemon): number {
        if (user.items.filter((i) => !isNull(i)).length === 0) {
            return this.bp * 2;
        }
        return this.bp;
    }

    static moveCodes = ["DoubleDamageNoItem"];
}
