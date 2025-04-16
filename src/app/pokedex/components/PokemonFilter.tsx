import { pokemonTribes, pokemonTypes } from "@/app/data/basicData";
import { moves } from "@/app/data/moves";
import { Pokemon } from "@/app/data/types/Pokemon";

export type FilterOperator = "==" | "!=" | ">" | "<" | "includes";

type BaseFilter = {
    label: string; // What users see in the UI
    operator: FilterOperator;
    value: string | number;
    apply: (pokemon: Pokemon, value: string | number) => boolean;
};

type TextFilter = BaseFilter & {
    inputMethod: "text";
};

type SelectFilter = BaseFilter & {
    inputMethod: "select";
    inputValues: readonly string[];
};

function validateMoves(pokemon: Pokemon) {
    if (!pokemon.levelMoves) {
        console.warn(`Pokemon ${pokemon.name} has undefined level_moves`);
        return false;
    }

    const invalidMoves = pokemon.levelMoves.filter((m) => !m?.[1]?.name);
    if (invalidMoves.length > 0) {
        console.warn(`Pokemon ${pokemon.name} has invalid moves:`, invalidMoves);
        return false;
    }
    return true;
}

export type PokemonFilterType = TextFilter | SelectFilter;

const AVAILABLE_FILTERS: PokemonFilterType[] = [
    // Standard field filters
    {
        label: "Name",
        operator: "includes",
        value: "",
        inputMethod: "text",
        apply: (pokemon, value) => {
            const searchValue = String(value).toLowerCase();
            return pokemon.name.toLowerCase().includes(searchValue);
        },
    },

    // Custom filters
    {
        label: "Type",
        operator: "includes",
        value: "",
        apply: (pokemon: Pokemon, value: string | number) => {
            const searchType = String(value).toLowerCase();
            return (
                pokemon.type1.name.toLowerCase().includes(searchType) ||
                (pokemon.type2?.name.toLowerCase().includes(searchType) ?? false)
            );
        },
        inputMethod: "select",
        inputValues: pokemonTypes,
    },
    {
        label: "Ability Name",
        operator: "includes",
        value: "",
        apply: (pokemon: Pokemon, value: string | number) => {
            const searchValue = String(value).toLowerCase();
            return pokemon.abilities.some((a) => a.name.toLowerCase().includes(searchValue));
        },
        inputMethod: "text",
    },
    {
        label: "Ability Desc",
        operator: "includes",
        value: "",
        apply: (pokemon: Pokemon, value: string | number) => {
            const searchValue = String(value).toLowerCase();
            return pokemon.abilities.some((a) => a.description.toLowerCase().includes(searchValue));
        },
        inputMethod: "text",
    },
    {
        label: "Moves (Level)",
        operator: "includes",
        value: "",
        apply: (pokemon: Pokemon, value: string | number) => {
            if (!validateMoves(pokemon)) return false;
            const searchValue = String(value).toLowerCase();
            return pokemon.levelMoves.some((m) => m[1].name.toLowerCase().includes(searchValue));
        },
        inputMethod: "select",
        inputValues: Object.values(moves).map((m) => m.name),
    },
    {
        label: "Moves (All)",
        operator: "includes",
        value: "",
        apply: (pokemon: Pokemon, value: string | number) => {
            if (!validateMoves(pokemon)) return false;
            const searchValue = String(value).toLowerCase();
            return pokemon.allMoves().some((m) => m.name.toLowerCase().includes(searchValue));
        },
        inputMethod: "select",
        inputValues: Object.values(moves).map((m) => m.name),
    },
    {
        label: "Tribes",
        operator: "includes",
        value: "",
        apply: (pokemon: Pokemon, value: string | number) => {
            const searchValue = String(value).toLowerCase();
            return pokemon.tribes.some((t) => t.name.toLowerCase().includes(searchValue));
        },
        inputMethod: "select",
        inputValues: pokemonTribes,
    },
];

// to use when we implement numeric filters
// function compareValues(a: number, op: FilterOperator, b: number) {
//     switch (op) {
//         case "==":
//             return a == b;
//         case "!=":
//             return a != b;
//         case ">":
//             return Number(a) > Number(b);
//         case "<":
//             return Number(a) < Number(b);
//     }
// }

import { useEffect, useState } from "react";

export default function PokemonFilter({
    onChangeFilters,
}: {
    onChangeFilters: (filters: PokemonFilterType[]) => void;
}) {
    const [activeFilters, setActiveFilters] = useState<PokemonFilterType[]>([]);
    const [currentFilter, setCurrentFilter] = useState<PokemonFilterType>(AVAILABLE_FILTERS[0]);
    const [currentValue, setCurrentValue] = useState("");

    const addFilter = () => {
        if (!currentValue) {
            alert("Please select a value for the filter!");
            return;
        }

        setActiveFilters((prev) => [...prev, { ...currentFilter, value: currentValue }]);
        setCurrentValue("");
    };

    const removeFilter = (index: number) => {
        setActiveFilters((prev) => prev.filter((_, i) => i !== index));
    };

    useEffect(() => {
        onChangeFilters(activeFilters);
    }, [activeFilters, onChangeFilters]);

    return (
        <div className="filter-container p-4 border rounded shadow-md bg-white dark:bg-gray-800 dark:border-gray-700">
            <div className="filter-controls flex items-center gap-4 mb-4">
                <select
                    className="border rounded px-2 py-1 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    value={currentFilter.label}
                    onChange={(e) => {
                        const selected = AVAILABLE_FILTERS.find((f) => f.label === e.target.value);
                        if (selected) setCurrentFilter(selected);
                    }}
                >
                    {AVAILABLE_FILTERS.map((filter) => (
                        <option key={filter.label} value={filter.label}>
                            {filter.label}
                        </option>
                    ))}
                </select>

                {[">", "<", "==", "!="].includes(currentFilter.operator) && (
                    <select
                        className="border rounded px-2 py-1 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        value={currentFilter.operator}
                        onChange={(e) =>
                            setCurrentFilter({
                                ...currentFilter,
                                operator: e.target.value as FilterOperator,
                            })
                        }
                    >
                        <option value="==">=</option>
                        <option value="!=">≠</option>
                        <option value=">">&gt;</option>
                        <option value="<">&lt;</option>
                    </select>
                )}

                {currentFilter.inputMethod === "select" ? (
                    <select
                        className="border rounded px-2 py-1 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        value={currentValue}
                        onChange={(e) => setCurrentValue(e.target.value)}
                    >
                        <option value="">Value...</option>
                        {currentFilter.inputValues.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                ) : (
                    <input
                        className="border rounded px-2 py-1 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        type={typeof currentFilter.value === "number" ? "number" : "text"}
                        value={currentValue}
                        onChange={(e) => setCurrentValue(e.target.value)}
                        placeholder="Value..."
                    />
                )}

                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                    onClick={addFilter}
                >
                    Add Filter
                </button>
            </div>

            <div className="active-filters flex flex-wrap gap-2">
                {activeFilters.map((filter, index) => (
                    <div
                        key={index}
                        className="filter-chip flex items-center gap-2 px-3 py-1 bg-gray-200 rounded shadow-sm dark:bg-gray-700"
                    >
                        <span className="text-sm dark:text-white">
                            {filter.label} {filter.operator} {filter.value}
                        </span>
                        <button
                            className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-500"
                            onClick={() => removeFilter(index)}
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
