export interface Encounter {
    weight: number;
    pokemon: string;
}

export interface EncounterArea {
    id: string;
    name: string;
    encounters: Record<string, Encounter[]>;
}
