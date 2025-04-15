import { LoadedAbility } from "../abilities";
import { getSignatureAbilities } from "../signatures";
import { Pokemon } from "./Pokemon";

export class Ability {
    id: string;
    name: string;
    description: string;
    flags: string[];
    constructor(ability: LoadedAbility) {
        this.id = ability.id;
        this.name = ability.name;
        this.description = ability.description;
        this.flags = ability.flags || [];
    }

    public isSignature(pokemon?: Pokemon): boolean {
        if (!pokemon) return this.id in getSignatureAbilities();
        return getSignatureAbilities()[this.id] === pokemon.id;
    }
}
