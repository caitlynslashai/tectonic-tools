import { abilities } from "./abilities";
import { moves } from "./moves";
import { pokemon } from "./pokemon";

type AbilityCounts = Record<string, string[]>;
type MoveCounts = Record<string, string[]>;

export function getSignatureAbilities(): Record<string, string> {
    const abilityCounts = getAbilityCounts();
    for (const [ability, group] of Object.entries(abilityCounts)) {
        if (group.length !== 1) {
            delete abilityCounts[ability];
        }
    }

    const result: Record<string, string> = {};
    for (const [ability, group] of Object.entries(abilityCounts)) {
        result[ability] = group[0];
    }
    return result;
}

function getAbilityCounts(): AbilityCounts {
    const abilityCounts: AbilityCounts = {};

    Object.values(abilities).forEach((abilityData) => {
        abilityCounts[abilityData.id] = [];
    });

    Object.values(pokemon).forEach((speciesData) => {
        if (speciesData.getEvos().length > 0) return;

        // const arrayID = speciesData.isLegendary() ? 1 : 0;
        speciesData.abilities.forEach((ability) => {
            abilityCounts[ability.id].push(speciesData.id);
        });
    });

    // Deduplicate
    Object.values(abilities).forEach((abilityData) => {
        abilityCounts[abilityData.id] = [...new Set(abilityCounts[abilityData.id])];
    });

    return abilityCounts;
}

export function getSignatureMoves(): Record<string, string> {
    const moveCounts = getMoveLearnableGroups();
    for (const [move, group] of Object.entries(moveCounts)) {
        if (group.length !== 1) {
            delete moveCounts[move];
        }
    }

    const result: Record<string, string> = {};
    for (const [move, group] of Object.entries(moveCounts)) {
        result[move] = group[0];
    }
    return result;
}

function getMoveLearnableGroups(): MoveCounts {
    const moveCounts: MoveCounts = {};

    Object.values(moves).forEach((moveData) => {
        moveCounts[moveData.id] = [];
    });

    Object.values(pokemon).forEach((speciesData) => {
        if (speciesData.getEvos().length > 0) return;

        //const groupIndex = speciesData.isLegendary() ? 1 : 0;
        speciesData.allMoves().forEach((move) => {
            moveCounts[move.id].push(speciesData.id);
        });
        // speciesData.form_specific_moves.forEach((move) => {
        //     if (move != null) {
        //         moveCounts.get(move)?.[groupIndex].push(speciesData.id);
        //     }
        // });
    });

    // Deduplicate
    Object.values(moves).forEach((moveData) => {
        moveCounts[moveData.id] = [...new Set(moveCounts[moveData.id])];
    });

    return moveCounts;
}
