import loadedEncounters from "public/data/encounters.json";
import { EncounterArea } from "./types/Encounter";

// this is currently redundant but I'm maintaining the structure in case I need to change things
function loadEncounters(area: EncounterArea): EncounterArea {
    return area;
}

export const encounters: Record<string, EncounterArea> = Object.fromEntries(
    Object.entries(loadedEncounters).map(([id, area]) => [id, loadEncounters(area)])
);
