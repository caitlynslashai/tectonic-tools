function styleValueMult(level: number): number {
    return 2.0 + level / 50.0;
}

export function calculateHP(base: number, level: number, sv: number, stylish: boolean = false): number {
    if (base === 1) return 1; // For Shedinja
    const pseudoLevel = 15.0 + level / 2.0;
    const stylishMult = stylish ? 2.0 : 1.0;
    return Math.floor(
        ((base * 2.0 + sv * styleValueMult(level) * stylishMult) * pseudoLevel) / 100.0 + pseudoLevel + 10.0
    );
}

export function calculateStat(base: number, level: number, sv: number, stylish: boolean = false): number {
    const pseudoLevel = 15.0 + level / 2.0;
    const stylishMult = stylish ? 2.0 : 1.0;
    return Math.floor(((base * 2.0 + sv * styleValueMult(level) * stylishMult) * pseudoLevel) / 100.0 + 5.0);
}
