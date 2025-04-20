import { LoadedMove } from "../loading/moves";
import { Move } from "../types/Move";
import { PartyPokemon } from "../types/PartyPokemon";
import { PokemonType } from "../types/PokemonType";
import { isNull } from "../util";

export const typeFromItemMoves = {
    JUDGMENT: "PRISMATICPLATE",
    MULTIATTACK: "MEMORYSET",
};

export class TypeFromItemMove extends Move {
    typeItem: string;
    constructor(move: LoadedMove, typeItem: string) {
        super(move);
        this.typeItem = typeItem;
    }
    public getType(user: PartyPokemon): PokemonType {
        const itemIndex = user.items.findIndex((i) => i.id === this.typeItem);
        if (itemIndex > -1) {
            const itemType = user.itemTypes[itemIndex];
            if (!isNull(itemType)) {
                return itemType;
            }
        }
        return this.type;
    }
}
