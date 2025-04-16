export const moveCategories = ["Physical", "Special", "Status", "Adaptive"] as const;

export type MoveCategory = (typeof moveCategories)[number];

export interface StylePoints {
    hp: number;
    attacks: number;
    defense: number;
    spdef: number;
    speed: number;
}

export const defaultStylePoints: StylePoints = {
    hp: 10,
    attacks: 10,
    defense: 10,
    spdef: 10,
    speed: 10,
};
