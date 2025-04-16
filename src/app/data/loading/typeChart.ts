import { LoadedType } from "./types";

export type TypeChart = number[][];

export function buildTypeChart(types: Record<string, LoadedType>) {
    const size = Object.keys(types).length;
    const typeChart: TypeChart = Array(size).fill(Array(size).fill(1.0));

    for (const atkType in types) {
        const attacker = types[atkType];
        for (const defType in types) {
            const defender = types[defType];
            if (defender.weaknesses.includes(attacker.key)) {
                typeChart[attacker.index][defender.index] = 2.0;
            } else if (defender.resistances.includes(attacker.key)) {
                typeChart[attacker.index][defender.index] = 0.5;
            } else if (defender.immunities.includes(attacker.key)) {
                typeChart[attacker.index][defender.index] = 0.0;
            }
        }
    }

    return typeChart;
}
