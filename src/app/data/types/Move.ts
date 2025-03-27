import { PokemonType } from "./BasicData";

export interface Move {
    id: string;
    name: string;
    type: PokemonType;
    bp: number;
}
