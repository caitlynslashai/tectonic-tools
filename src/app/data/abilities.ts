import { loadData } from "./loading/loadData";
import { Ability } from "./types/Ability";

let abilities: Record<string, Ability> | undefined = undefined;

export async function getAbilities(): Promise<Record<string, Ability>> {
    if (abilities !== undefined) {
        return abilities;
    }
    const loadedAbilities = (await loadData()).abilities;
    abilities = {};
    loadedAbilities.forEach((ability) => (abilities![ability.key] = new Ability(ability)));
    return abilities;
}

export const nullAbility: Ability = new Ability({
    key: "",
    name: "",
    description: "",
    flags: [],
});
