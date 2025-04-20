import { LoadedMove } from "../loading/moves";
import { moves } from "../moves";
import { types } from "../types";
import { Move } from "../types/Move";
import { PartyPokemon } from "../types/PartyPokemon";
import { PokemonType } from "../types/PokemonType";
import { isNull } from "../util";

type TypeFromItemFunction = (user: PartyPokemon) => PokemonType | undefined;

function typeFromItemType(user: PartyPokemon, typeItem: string): PokemonType | undefined {
    const itemIndex = user.items.findIndex((i) => i.id === typeItem);
    if (itemIndex > -1) {
        const itemType = user.itemTypes[itemIndex];
        if (!isNull(itemType)) {
            return itemType;
        }
    }
}

const naturalGiftTypes = {
    CHILANBERRY: "NORMAL",
    CHERIBERRY: "FIRE",
    BLUKBERRY: "FIRE",
    WATMELBERRY: "FIRE",
    OCCABERRY: "FIRE",
    CHESTOBERRY: "WATER",
    NANABBERRY: "WATER",
    DURINBERRY: "WATER",
    PASSHOBERRY: "WATER",
    PECHABERY: "ELECTRIC",
    WEPEARBERRY: "ELECTRIC",
    BELUEBERRY: "ELECTRIC",
    WACANBERRY: "ELECTRIC",
    RAWSTBERRY: "GRASS",
    PINAPBERRY: "GRASS",
    RINDOBERRY: "GRASS",
    LIECHIBERRY: "GRASS",
    ASPEARBERRY: "ICE",
    POMEGBERRY: "ICE",
    YACHEBERRY: "ICE",
    GANLONBERRY: "ICE",
    LEPPABERRY: "FIGHTING",
    KELPSYBERRY: "FIGHTING",
    CHOPLEBERRY: "FIGHTING",
    SALACBERRY: "FIGHTING",
    CADOBERRY: "POISON",
    QUALOTBERRY: "POISON",
    KEBIABERRY: "POISON",
    PETAYABERRY: "POISON",
    PERSIMBERRY: "GROUND",
    HONDEWBERRY: "GROUND",
    SHUCABERRY: "GROUND",
    APICOTBERRY: "GROUND",
    LUMBERRY: "FLYING",
    GREPABERRY: "FLYING",
    COBABERRY: "FLYING",
    LANSATBERRY: "FLYING",
    SITRUSBERRY: "PSYCHIC",
    TAMATOBERRY: "PSYCHIC",
    PAYAPABERRY: "PSYCHIC",
    STARFBERRY: "PSYCHIC",
    FIGYBERRY: "BUG",
    CORNNBERRY: "BUG",
    TANGABERRY: "BUG",
    ENIGMABERRY: "BUG",
    WIKIBERRY: "ROCK",
    MAGOSTBERRY: "ROCK",
    CHARTIBERRY: "ROCK",
    MICLEBERRY: "ROCK",
    MAGOBERRY: "GHOST",
    RABUTABERRY: "GHOST",
    KASIBBERRY: "GHOST",
    CUSTAPBERRY: "GHOST",
    AGUAVBERRY: "DRAGON",
    NOMELBERRY: "DRAGON",
    HABANBERRY: "DRAGON",
    JABOCABERRY: "DRAGON",
    IAPAPABERRY: "DARK",
    SPELONBERRY: "DARK",
    COLBURBERRY: "DARK",
    ROWAPBERRY: "DARK",
    MARANGABERRY: "DARK",
    RAZZBERRY: "STEEL",
    PAMTREBERRY: "STEEL",
    BABIRIBERRY: "STEEL",
    ROSELIBERRY: "FAIRY",
    KEEBERRY: "FAIRY",
};

function typeFromItemMap(user: PartyPokemon, map: Record<string, string>): PokemonType | undefined {
    for (const item of user.items) {
        if (item.id in map) {
            return types[map[item.id]];
        }
    }
}

export const typeFromItemMoves: Record<keyof typeof moves, TypeFromItemFunction> = {
    JUDGMENT: (user: PartyPokemon) => typeFromItemType(user, "PRISMATICPLATE"),
    MULTIATTACK: (user: PartyPokemon) => typeFromItemType(user, "MEMORYSET"),
    NATURALGIFT: (user: PartyPokemon) => typeFromItemMap(user, naturalGiftTypes),
};

export class TypeFromItemMove extends Move {
    typeFunction: TypeFromItemFunction;
    constructor(move: LoadedMove, typeFunction: TypeFromItemFunction) {
        super(move);
        this.typeFunction = typeFunction;
    }
    public getType(user: PartyPokemon): PokemonType {
        return this.typeFunction(user) || this.type;
    }
}
