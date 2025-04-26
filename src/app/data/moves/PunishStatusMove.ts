import { LoadedMove } from "../loading/moves";
import { StatusEffect } from "../statusEffects";
import { Move } from "../types/Move";
import { PartyPokemon } from "../types/PartyPokemon";

const punishStatusMoveCodes: Record<string, StatusEffect> = { SmellingSalts: "Numb", WakeUpSlap: "Sleep" };

export class PunishStatusMove extends Move {
    punishedStatus: StatusEffect;
    constructor(move: LoadedMove) {
        super(move);
        this.punishedStatus = punishStatusMoveCodes[move.functionCode];
    }

    public getPower(_: PartyPokemon, target: PartyPokemon): number {
        if (target.statusEffect === this.punishedStatus) {
            return this.bp * 2;
        }
        return this.bp;
    }

    static moveCodes = Object.keys(punishStatusMoveCodes);
}
