import { useState } from "react";
import { PokemonFilterType } from "../page";

interface FilterInputProps {
    currentFilter: PokemonFilterType;
    onAddFilter: (filter: PokemonFilterType, value: string) => void;
}

export function FilterInput({ currentFilter, onAddFilter }: FilterInputProps) {
    const [localValue, setLocalValue] = useState("");

    const handleAdd = () => {
        if (!localValue) {
            alert("Please select a value for the filter!");
            return;
        }
        onAddFilter(currentFilter, localValue);
        setLocalValue("");
    };

    return (
        <div>
            {currentFilter.inputMethod === "select" ? (
                <select
                    className="border rounded px-2 py-1 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    value={localValue}
                    onChange={(e) => setLocalValue(e.target.value)}
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
                    value={localValue}
                    onChange={(e) => setLocalValue(e.target.value)}
                    placeholder="Value..."
                />
            )}

            <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                onClick={handleAdd}
            >
                Add Filter
            </button>
        </div>
    );
}
