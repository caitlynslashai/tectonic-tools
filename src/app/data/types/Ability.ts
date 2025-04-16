import { LoadedAbility } from "../loading/abilities";

export class Ability {
    id: string;
    name: string;
    description: string;
    flags: string[];
    constructor(ability: LoadedAbility) {
        this.id = ability.key;
        this.name = ability.name;
        this.description = ability.description;
        this.flags = ability.flags;
    }
}
