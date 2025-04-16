import loadedTribes from "public/data/tribes.json";

import { LoadedTribe } from "./loading/tribes";
import { Tribe } from "./types/Tribe";

function loadTribe(item: LoadedTribe): Tribe {
    return { ...item, id: item.key };
}

export const tribes: Record<string, Tribe> = Object.fromEntries(
    Object.entries(loadedTribes).map(([id, tribe]) => [id, loadTribe(tribe)])
);

export const nullTribe: Tribe = {
    id: "",
    name: "",
    description: "",
    activationCount: 0,
};
