import { LoadedAbility } from "@/preload/loadedDataClasses";
import { Ability } from "../tectonic/Ability";
import { PokemonType } from "../tectonic/PokemonType";
import { TectonicData } from "../tectonic/TectonicData";

const immunityAbilities: Record<string, string[]> = {
    AERODYNAMIC: ["FLYING"],
    CHALLENGER: ["FIGHTING"],
    COLDRECEPTION: ["ICE"],
    DESERTSPIRIT: ["GROUND"],
    DRAGONSLAYER: ["DRAGON"],
    FILTHY: ["POISON"],
    FIREFIGHTER: ["FIRE"],
    FLYTRAP: ["BUG"],
    FOOLHARDY: ["PSYCHIC"],
    FULLBLUBBER: ["WATER", "ICE"],
    GLASSFIRING: ["FIRE"],
    HEARTLESS: ["FAIRY"],
    HEARTOFJUSTICE: ["DARK"],
    INDUSTRIALIZE: ["STEEL"],
    PECKINGORDER: ["FLYING"],
    POISONABSORB: ["POISON"],
    ROCKCLIMBER: ["ROCK"],
    STEELABSORB: ["STEEL"],
    VENOMDETTA: ["POISON"],
    LEVITATE: ["GROUND"],
    MOTORDRIVE: ["ELECTRIC"],
    SAPSIPPER: ["GRASS"],
    VOLTABSORB: ["ELECTRIC"],
    WATERABSORB: ["WATER"],
    WONDERGUARD: ["QMARKS"],
};

export class TypeImmunityAbility extends Ability {
    private immuneTypes: PokemonType[];
    constructor(ability: LoadedAbility) {
        super(ability);
        this.immuneTypes = immunityAbilities[ability.key].map((t) => TectonicData.types[t]);
    }

    public isImmune(type: PokemonType) {
        return this.immuneTypes.map((t) => t.id).includes(type.id);
    }

    static abilityIds = Object.keys(immunityAbilities);
}
