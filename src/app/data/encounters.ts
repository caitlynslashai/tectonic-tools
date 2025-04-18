import loadedEncounters from "public/data/encounters.json";
import { LoadedEncounterMap } from "./loading/encounters";
import { EncounterMap } from "./types/Encounter";

// this is currently redundant but I'm maintaining the structure in case I need to change things
function loadEncounters(map: LoadedEncounterMap): EncounterMap {
    return { ...map, id: map.key };
}

export const encounters: Record<string, EncounterMap> = Object.fromEntries(
    Object.entries(loadedEncounters).map(([id, map]) => [id, loadEncounters(map)])
);
