import { Move } from "./types/Move";

export const moves: Record<string, Move> = {
    testmove: {
        id: "testmove",
        name: "Test Move",
        type: "Normal",
        bp: 80,
        category: "Physical",
    },
};

export const nullMove: Move = {
    id: "",
    name: "",
    type: "Normal",
    bp: 0,
    category: "Status",
};
