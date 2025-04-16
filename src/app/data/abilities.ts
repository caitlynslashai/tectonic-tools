import loadedAbilities from "public/data/abilities.json";
import { Ability } from "./types/Ability";

export const abilities: Record<string, Ability> = Object.fromEntries(
    Object.entries(loadedAbilities).map(([id, ability]) => [id, new Ability(ability)])
);

export const nullAbility: Ability = new Ability({
    key: "",
    name: "",
    description: "",
    flags: [],
});
