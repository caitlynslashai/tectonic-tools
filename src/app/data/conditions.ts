export const statusEffects = ["Poison", "Burn", "Frostbite", "Numb", "Dizzy", "Leech", "Waterlog", "Sleep"] as const;

export type StatusEffect = (typeof statusEffects)[number] | "None";

export const volatileStatusEffects = ["Jinx", "Fracture"] as const; // others exist but are not? relevant to damage calculation

export type VolatileStatusEffect = (typeof volatileStatusEffects)[number];

export const weatherConditions = [
    "Sunshine",
    "Rainstorm",
    "Hail",
    "Sandstorm",
    "Eclipse",
    "Moonglow",
    "Ring Eclipse",
    "Blood Moon",
] as const;

export type WeatherCondition = (typeof weatherConditions)[number] | "None";
