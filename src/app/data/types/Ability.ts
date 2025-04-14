import { LoadedAbility } from "../abilities";
import { getSignatureAbilities } from "../signatures";

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

    public isSignature(): boolean {
        return this.id in getSignatureAbilities();
    }

    public signatureOf(): string {
        return getSignatureAbilities()[this.id];
    }
}
