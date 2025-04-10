"use client";

import InternalLink from "@/components/InternalLink";
import type { NextPage } from "next";
import Head from "next/head";
import { ChangeEvent, useEffect, useState } from "react";
import { pokemon } from "../data/pokemon";
import { Pokemon } from "../data/types/Pokemon";
import PokemonModal from "./components/PokemonModal";
import PokemonTable from "./components/PokemonTable";

export interface PokemonTableProps {
    mons: Pokemon[];
    onRowClick: (pokemon: Pokemon) => void;
}

type SortOption = "dex" | "name";

const Home: NextPage = () => {
    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
    const [filterText, setFilterText] = useState<string>("");
    const [sortKey, setSortKey] = useState<SortOption>("dex");

    useEffect(() => {
        if (selectedPokemon) {
            document.body.style.overflow = "hidden"; // Disable scrolling
        } else {
            document.body.style.overflow = ""; // Re-enable scrolling
        }
    }, [selectedPokemon]);

    const handleRowClick = (pokemon: Pokemon) => {
        setSelectedPokemon(pokemon);
    };

    const handleCloseModal = () => {
        setSelectedPokemon(null);
    };

    const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFilterText(event.target.value.toLowerCase());
    };

    const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSortKey(event.target.value as "name" | "dex");
    };

    const filteredAndSortedPokemon = Object.values(pokemon)
        .filter((mon) => mon.name.toLowerCase().includes(filterText))
        .sort((a, b) => {
            if (sortKey === "dex") {
                return a.dex - b.dex;
            }
            return a.name.localeCompare(b.name);
        });

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <Head>
                <title>Pokémon Tectonic Online Pokédex</title>
                <meta name="description" content="View Pokémon data for the fangame Pokémon Tectonic" />
            </Head>

            <main className="container mx-auto py-8 px-4">
                <div className="flex flex-col justify-center items-center mb-10 relative">
                    <h1 className="text-3xl font-bold text-center mb-8 text-blue-800 dark:text-blue-300">
                        Pokémon Tectonic Online Pokédex
                    </h1>
                    <p>
                        <InternalLink url="../">Return to homepage</InternalLink>
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                        <input
                            type="text"
                            placeholder="Filter by name"
                            value={filterText}
                            onChange={handleFilterChange}
                            className="border border-gray-300 rounded px-4 py-2 w-full sm:w-auto"
                        />
                        <div className="flex items-center gap-2">
                            <span>Sort by</span>
                            <select
                                value={sortKey}
                                onChange={handleSortChange}
                                className="border border-gray-300 rounded px-4 py-2 w-full sm:w-auto"
                            >
                                <option value="dex">Dex ID</option>
                                <option value="name">Name</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <PokemonTable mons={filteredAndSortedPokemon} onRowClick={handleRowClick} />
                </div>
            </main>

            {selectedPokemon && <PokemonModal pokemon={selectedPokemon} onClose={handleCloseModal} />}
        </div>
    );
};

export default Home;
