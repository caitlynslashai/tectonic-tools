import loadedAbilities from "public/data/abilities.json";
import { Ability } from "./types/Ability";

export interface LoadedAbility {
    id: string;
    name: string;
    description: string;
    flags: string[] | null;
}

export const abilities: Record<string, Ability> = Object.fromEntries(
    Object.entries(loadedAbilities).map(([id, ability]) => [id, new Ability(ability)])
);

export const nullAbility: Ability = new Ability({
    id: "",
    name: "",
    description: "",
    flags: [],
});
