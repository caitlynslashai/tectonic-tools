import { LoadedAbility } from "@/preload/loadedDataClasses";
import { Ability } from "../tectonic/Ability";
import { Stat, Stats } from "../tectonic/Pokemon";

// RADIATE works differently on live and dev - currently implementing live version
const statModifyAbilities: Record<string, [Stat, number]> = {
    RADIATE: ["spatk", 1.3],
    PUREFORCE: ["attack", 1.5],
    PUREENERGY: ["spatk", 1.5],
    DEEPSTING: ["attack", 1.5],
};

export class StatModifyAbility extends Ability {
    private modifiedStat: Stat;
    private statMult: number;

    constructor(ability: LoadedAbility) {
        super(ability);
        this.modifiedStat = statModifyAbilities[ability.key][0];
        this.statMult = statModifyAbilities[ability.key][1];
    }

    public modifyStats(stats: Stats): Stats {
        stats[this.modifiedStat] *= this.statMult;
        return stats;
    }

    static abilityIds = Object.keys(statModifyAbilities);
}
