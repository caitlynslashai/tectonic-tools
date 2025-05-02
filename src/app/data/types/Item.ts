import { MoveData } from "@/app/damagecalc/components/MoveCard";
import { DamageMultipliers } from "@/app/damagecalc/damageCalc";
import { BattleState } from "../battleState";
import { LoadedItem } from "../loading/items";
import { PartyPokemon } from "./PartyPokemon";
import { Stats } from "./Pokemon";

export class Item {
    id: string;
    name: string;
    description: string;
    pocket: number;
    flags: string[];
    constructor(item: LoadedItem) {
        this.id = item.key;
        this.name = item.name;
        this.description = item.description;
        this.pocket = item.pocket;
        this.flags = item.flags;
    }

    public getImage() {
        return `/Items/${this.id}.png`;
    }

    // to be modified by subclasses
    // function signature will be updated as necessary to implement items
    public offensiveMultiplier(
        multipliers: DamageMultipliers,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        move: MoveData,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        user: PartyPokemon,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        battleState: BattleState
    ): DamageMultipliers {
        return multipliers;
    }

    public defensiveMultiplier(multipliers: DamageMultipliers): DamageMultipliers {
        return multipliers;
    }

    public modifyStats(stats: Stats): Stats {
        return stats;
    }

    static itemIds: string[] = [];
}
