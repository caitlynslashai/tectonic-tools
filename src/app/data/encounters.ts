import loadedEncounters from "public/data/encounters.json";
import { LoadedEncounterMap } from "./loading/encounters";
import { EncounterMap } from "./types/Encounter";

function loadEncounters(map: LoadedEncounterMap): EncounterMap {
    return { ...map, id: map.key };
}

export const encounters: Record<string, EncounterMap> = Object.fromEntries(
    Object.entries(loadedEncounters).map(([id, map]) => [id, loadEncounters(map)])
);
