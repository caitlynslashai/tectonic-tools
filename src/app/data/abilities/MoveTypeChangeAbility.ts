import { Ability } from "../tectonic/Ability";
import { Move } from "../tectonic/Move";
import { PokemonType } from "../tectonic/PokemonType";

export abstract class MoveTypeChangeAbility extends Ability {
    public moveType: PokemonType = PokemonType.NULL;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public shouldChangeType(move: Move): boolean {
        return true;
    }
}
