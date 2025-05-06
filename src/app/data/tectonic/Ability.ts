import { LoadedAbility } from "@/preload/loadedDataClasses";

export class Ability {
    id: string = "";
    name: string = "";
    description: string = "";
    flags: string[] = [];
    isSignature: boolean = false;

    static NULL: Ability = null!;

    constructor(loaded?: LoadedAbility) {
        if (!loaded) return;

        this.id = loaded.key;
        this.name = loaded.name;
        this.description = loaded.description;
        this.flags = loaded.flags;
        this.isSignature = loaded.isSignature;
    }

    public movePowerMultiplier(): number {
        return 1;
    }

    static abilityIds: string[] = [];
}
