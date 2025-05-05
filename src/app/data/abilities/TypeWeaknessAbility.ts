import { LoadedAbility } from "@/preload/loadedDataClasses";
import { TectonicData } from "../tectonic/TectonicData";
import { MatchupModifyAbility } from "./MatchupModifyAbility";

const doubleTakenAbilities: Record<string, string> = {
    FLUFFY: "FIRE",
    PARANOID: "PSYCHIC",
};

export class TypeWeaknessAbility extends MatchupModifyAbility {
    matchup = 2;
    constructor(ability: LoadedAbility) {
        super(ability);
        this.affectedTypes = [TectonicData.types[doubleTakenAbilities[ability.key]]];
    }

    static abilityIds = Object.keys(doubleTakenAbilities);
}
