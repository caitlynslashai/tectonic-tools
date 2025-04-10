import { pokemonTypes } from "@/app/data/basicData";
import { Pokemon } from "@/app/data/types/Pokemon";

export type FilterOperator = "==" | "!=" | ">" | "<" | "includes";

type BaseFilter = {
    label: string; // What users see in the UI
    operator: FilterOperator;
    value: string | number;
};

// Direct field comparison
type FieldFilter = BaseFilter & {
    type: "field";
    field: keyof Pokemon; // Ensures field exists on Pokemon
};

type TextFilter = BaseFilter & {
    inputMethod: "text";
};

// Custom filter logic
type CustomFilter = BaseFilter & {
    type: "custom";
    apply: (pokemon: Pokemon, value: string | number) => boolean; // Custom filter function
};

type SelectFilter = BaseFilter & {
    inputMethod: "select";
    inputValues: readonly string[];
};

export type PokemonFilterType =
    | (FieldFilter & TextFilter)
    | (FieldFilter & SelectFilter)
    | (CustomFilter & TextFilter)
    | (CustomFilter & SelectFilter);

const AVAILABLE_FILTERS: PokemonFilterType[] = [
    // Standard field filters
    {
        type: "field",
        label: "Name",
        field: "name",
        operator: "includes",
        value: "",
        inputMethod: "text",
    },

    // Custom filters
    {
        type: "custom",
        label: "Type",
        operator: "includes",
        value: "",
        apply: (pokemon: Pokemon, value: string | number) => {
            const searchType = String(value).toLowerCase();
            return (
                pokemon.type1.toLowerCase().includes(searchType) ||
                (pokemon.type2?.toLowerCase().includes(searchType) ?? false)
            );
        },
        inputMethod: "select",
        inputValues: pokemonTypes,
    },
];

export function compareValues<T>(a: T, op: FilterOperator, b: T) {
    switch (op) {
        case "==":
            return a == b;
        case "!=":
            return a != b;
        case ">":
            return Number(a) > Number(b);
        case "<":
            return Number(a) < Number(b);
        case "includes":
            return String(a).toLowerCase().includes(String(b).toLowerCase());
    }
}

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
                        {pokemonTypes.map((type) => (
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
