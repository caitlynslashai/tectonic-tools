import { LoadedAbility } from "../loading/abilities";
import { getSignatureAbilities } from "../signatures";
import { Pokemon } from "./Pokemon";

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

    public async isSignature(pokemon?: Pokemon): Promise<boolean> {
        const signatures = await getSignatureAbilities();
        if (!pokemon) return this.id in signatures;
        return signatures[this.id] === pokemon.id;
    }
}
