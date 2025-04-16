import { LoadedType } from "./types";

export type TypeChart = number[][];

export function buildTypeChart(types: Map<string, LoadedType>) {
    const typeChart: TypeChart = [];
    types.forEach(() => {
        typeChart.push(Array(types.size).fill(1.0));
    });

    types.forEach((attacker) => {
        types.forEach((defender) => {
            if (defender.weaknesses.includes(attacker.key)) {
                typeChart[attacker.index][defender.index] = 2.0;
            } else if (defender.resistances.includes(attacker.key)) {
                typeChart[attacker.index][defender.index] = 0.5;
            } else if (defender.immunities.includes(attacker.key)) {
                typeChart[attacker.index][defender.index] = 0.0;
            }
        });
    });

    return typeChart;
}
