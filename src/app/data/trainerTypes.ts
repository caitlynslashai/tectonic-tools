import loadedTrainerTypes from "public/data/trainertypes.json";
import { LoadedTrainerType } from "./loading/trainertypes";
import { TrainerType } from "./types/TrainerType";

function loadTrainerType(type: LoadedTrainerType): TrainerType {
    return { ...type, id: type.key };
}

export const trainerTypes: Record<string, TrainerType> = Object.fromEntries(
    Object.entries(loadedTrainerTypes).map(([id, tribe]) => [id, loadTrainerType(tribe)])
);

export const nullTribe: TrainerType = {
    id: "",
    name: "",
};
