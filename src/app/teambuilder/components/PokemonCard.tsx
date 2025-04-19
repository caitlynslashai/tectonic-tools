"use client";

import { abilities, nullAbility } from "@/app/data/abilities";
import { TwoItemAbility } from "@/app/data/abilities/TwoItemAbility";
import { items, nullItem } from "@/app/data/items";
import { TypeChangingItem } from "@/app/data/items/TypeChangingItem";
import { moves, nullMove } from "@/app/data/moves";
import { nullPokemon, pokemon } from "@/app/data/pokemon";
import { MAX_LEVEL, MAX_SP, MIN_LEVEL, MIN_SP, STYLE_POINT_CAP, styleFromStat } from "@/app/data/teamExport";
import { nullType, types } from "@/app/data/types";
import { Ability } from "@/app/data/types/Ability";
import { Item } from "@/app/data/types/Item";
import { PartyPokemon } from "@/app/data/types/PartyPokemon";
import { StylePoints } from "@/app/data/types/Pokemon";
import { isNull, negativeMod, safeKeys } from "@/app/data/util";
import Dropdown from "@/components/DropDown";
import TypeBadge from "@/components/TypeBadge";
import Image from "next/image";

function legalItems(currentItems: Item[], ability: Ability, index: number): Item[] {
    // TODO: Add a non-magic map of pockets somewhere
    const heldItems = Object.values(items).filter((i) => i.pocket === 5);
    // only allow selecting items that maintain the legality constraint
    if (ability instanceof TwoItemAbility) {
        return heldItems.filter((i) => {
            const newItems = [...currentItems];
            newItems[index] = i;
            return ability.validateItems(newItems);
        });
    }
    return heldItems;
}

export default function PokemonCard({
    data,
    update,
}: {
    data: PartyPokemon;
    update: (c: Partial<PartyPokemon>) => void;
}) {
    // wipe pokemon-dependent data when switching pokemon
    function updatePokemon(pokemonId: string) {
        if (pokemonId in pokemon) {
            update({
                species: pokemon[pokemonId],
                form: 0,
                moves: Array(4).fill(nullMove),
                ability: nullAbility,
            });
        } else {
            update({ species: nullPokemon, form: 0, moves: Array(4).fill(nullMove), ability: nullAbility });
        }
    }

    function updateMoves(moveId: string, moveIndex: number) {
        const newMoves = [...data.moves];
        if (moveId in moves) {
            newMoves[moveIndex] = moves[moveId];
        } else {
            newMoves[moveIndex] = nullMove;
        }

        update({ moves: newMoves });
    }

    function updateAbility(abilityId: string) {
        if (abilityId in abilities) {
            update({
                ability: abilities[abilityId],
            });
        } else {
            update({
                ability: nullAbility,
            });
        }
    }

    function updateItem(itemId: string, index: number) {
        const newItems = [...data.items];
        newItems[index] = items[itemId] || nullItem;
        update({ items: newItems });
    }

    function updateItemType(typeId: string, index: number) {
        const newTypes = [...data.itemTypes];
        newTypes[index] = types[typeId] || nullType;
        update({ itemTypes: newTypes });
    }

    function updateForm(form: number) {
        update({ form });
    }

    function updateLevel(level: number) {
        level = Math.max(level, MIN_LEVEL);
        level = Math.min(level, MAX_LEVEL);
        update({ level });
    }

    function updateSP(stat: keyof StylePoints, value: number) {
        value = Math.max(value, MIN_SP);
        value = Math.min(value, MAX_SP);
        const newSP = { ...data.stylePoints, [stat]: value };
        const spSum = Object.values(newSP).reduce((total, sp) => total + sp, 0);
        if (spSum > STYLE_POINT_CAP) {
            alert("You can only have a maximum of 50 total style points!");
            return;
        }
        update({ stylePoints: newSP });
    }

    const realTypes = Object.values(types).filter((t) => t.isRealType);

    return (
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 flex flex-col items-center w-60">
            <div className="text-center flex flex-row items-center">
                {data.species.forms.length > 1 && (
                    <button
                        onClick={() => updateForm(negativeMod(data.form - 1, data.species.forms.length))}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                )}
                <Dropdown value={data.species.id} onChange={(e) => updatePokemon(e.target.value)}>
                    <option value="">Select Pokémon</option>
                    {Object.values(pokemon).map((p) => (
                        <option key={p.id} value={p.id}>
                            {p.name}
                        </option>
                    ))}
                </Dropdown>
                {data.species.forms.length > 1 && (
                    <button
                        onClick={() => updateForm((data.form + 1) % data.species.forms.length)}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                )}
            </div>
            {!isNull(data.species) && (
                <div>
                    <div className="text-center flex flex-col items-center">
                        {data.species.forms.length > 0 && <div className="flex items-center space-x-2"></div>}
                        <Image
                            src={data.species.getImage(data.form)}
                            alt={data.species.name}
                            height="160"
                            width="160"
                            className="my-2"
                        />
                        <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                            {data.species.name +
                                (data.species.getFormName(data.form) ? " " + data.species.getFormName(data.form) : "")}
                        </p>
                        <TypeBadge type1={data.species.getType1(data.form)} type2={data.species.getType2(data.form)} />
                    </div>
                    <div className="text-center">
                        <h3 className="font-semibold text-gray-800 dark:text-gray-100">Level</h3>
                        <input
                            type="number"
                            min={MIN_LEVEL}
                            max={MAX_LEVEL}
                            className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-gray-200 focus:ring-blue-500 focus:border-blue-500 text-center"
                            value={data.level}
                            onChange={(e) => updateLevel(parseInt(e.target.value))}
                        />
                    </div>
                    <div className="w-full mt-4 text-center">
                        <h3 className="font-semibold text-gray-800 dark:text-gray-100">Moves</h3>
                        {Array.from({ length: 4 }).map((_, moveIndex) => (
                            <div key={moveIndex} className="flex items-center space-x-2">
                                <div className="flex-1">
                                    <Dropdown
                                        onChange={(e) => {
                                            updateMoves(e.target.value, moveIndex);
                                        }}
                                        value={data.moves[moveIndex].id}
                                    >
                                        <option value="">Select Move {moveIndex + 1}</option>
                                        {data.species.allMoves(data.form).map((m) => (
                                            <option
                                                key={m.id}
                                                value={m.id}
                                                className={m.isSTAB(data.species) ? "font-semibold" : ""}
                                            >
                                                {m.name}
                                            </option>
                                        ))}
                                    </Dropdown>
                                </div>
                                <div className="w-12 flex justify-center">
                                    {data.moves[moveIndex].isAttackingMove() && (
                                        <TypeBadge type1={data.moves[moveIndex].type} />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="w-full mt-4 text-center">
                        <h3 className="font-semibold text-gray-800 dark:text-gray-100">Ability</h3>
                        <Dropdown value={data.ability.id} onChange={(e) => updateAbility(e.target.value)}>
                            <option value="">Select Ability</option>
                            {data.species.getAbilities(data.form).map((a) => (
                                <option key={a.id} value={a.id}>
                                    {a.name}
                                </option>
                            ))}
                        </Dropdown>
                    </div>
                    <div className="w-full mt-4 text-center">
                        <h3 className="font-semibold text-gray-800 dark:text-gray-100">Held Item</h3>
                        <div>
                            {Array.from({ length: 2 }).map(
                                (_, i) =>
                                    // only display second item if ability enables it
                                    (i === 0 || data.ability instanceof TwoItemAbility) && (
                                        <div key={i}>
                                            <div className="flex items-center space-x-2">
                                                <Dropdown
                                                    value={data.items[i].id}
                                                    onChange={(e) => updateItem(e.target.value, i)}
                                                >
                                                    <option value="">Select Item</option>
                                                    {legalItems(data.items, data.ability, i).map((i) => (
                                                        <option key={i.id} value={i.id}>
                                                            {i.name}
                                                        </option>
                                                    ))}
                                                </Dropdown>
                                                <div className="w-12 flex justify-center">
                                                    {!isNull(data.items[i]) && (
                                                        <Image
                                                            alt={data.items[i].name}
                                                            src={data.items[i].getImage()}
                                                            width={50}
                                                            height={50}
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                            {data.items[i] instanceof TypeChangingItem &&
                                                data.items[i].canChangeType(data.species) && (
                                                    <div className="flex items-center space-x-2">
                                                        <Dropdown
                                                            value={data.itemTypes[i].id}
                                                            onChange={(e) => {
                                                                updateItemType(e.target.value, i);
                                                            }}
                                                        >
                                                            <option value="" className="bg-gray-800">
                                                                Select Type
                                                            </option>
                                                            {realTypes.map((t) => (
                                                                <option key={t.id} value={t.id} className="bg-gray-800">
                                                                    {t.name}
                                                                </option>
                                                            ))}
                                                        </Dropdown>
                                                        {!isNull(data.itemTypes[i]) && (
                                                            <TypeBadge type1={data.itemTypes[i]} />
                                                        )}
                                                    </div>
                                                )}
                                        </div>
                                    )
                            )}
                        </div>
                    </div>
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Stat</th>
                                    <th>Value</th>
                                    <th>SP</th>
                                </tr>
                            </thead>
                            <tbody>
                                {safeKeys(data.species.getStats(data.form)).map((statName) => {
                                    const styleName = styleFromStat(statName);
                                    return (
                                        <tr key={statName}>
                                            <td className="text-gray-300 w-16 text-right">{statName.toUpperCase()}</td>
                                            <td className="text-gray-400 w-12 text-center">{data.stats[statName]}</td>
                                            <td>
                                                <input
                                                    type="number"
                                                    min={MIN_SP}
                                                    max={MAX_SP}
                                                    className="w-16 px-2 py-1 rounded-md bg-gray-700 border border-gray-600 text-gray-200 focus:ring-blue-500 focus:border-blue-500 text-center"
                                                    value={data.stylePoints[styleName]}
                                                    onChange={(e) => updateSP(styleName, parseInt(e.target.value))}
                                                />
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="w-full mt-4 text-center">
                        <h3 className="font-semibold text-gray-800 dark:text-gray-100">Tribes</h3>
                        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
                            {data.species.tribes.map((tribe, index) => (
                                <li key={index}>{tribe.name}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
