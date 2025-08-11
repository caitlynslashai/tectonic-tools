import { Ability } from "../tectonic/Ability";
import { Stats } from "../tectonic/Pokemon";
import { PokemonType } from "../tectonic/PokemonType";

export class ParanoidAbility extends Ability {
    public modifiedMatchup(type: PokemonType) {
        return type.id === "PSYCHIC" ? 2 : 1;
    }

    public modifyStats(stats: Stats): Stats {
        stats.spdef *= 2;
        return stats;
    }

    static abilityIds = ["PARANOID"];
}
