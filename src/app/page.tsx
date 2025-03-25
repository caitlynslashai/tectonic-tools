"use client";

import type { NextPage } from "next";
import { useState } from "react";

const PokemonDamageCalculator: NextPage = () => {
    const [playerPokemon, setPlayerPokemon] = useState({
        name: "",
        level: 50,
        attack: 0,
        specialAttack: 0,
        movePower: 0,
        moveType: "normal",
        isPhysical: true,
        stab: false,
    });

    const [fieldEffects, setFieldEffects] = useState({
        weather: "none",
        terrain: "none",
        otherModifiers: 1,
    });

    const [opponentPokemon, setOpponentPokemon] = useState({
        name: "",
        defense: 0,
        specialDefense: 0,
        hp: 0,
        type1: "normal",
        type2: "",
    });

    // This would be replaced with your actual damage calculation logic
    const calculateDamage = () => {
        // Placeholder for your damage calculation
        return { minDamage: 0, maxDamage: 0, percentage: "0%" };
    };

    const damageResult = calculateDamage();

    return (
        <div className="min-h-screen bg-gray-900 py-8">
            <div className="max-w-7xl mx-auto px-4">
                {/* Centered title with dark mode text */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-blue-400">Pokémon Damage Calculator</h1>
                    <p className="text-gray-400 mt-2">Calculate damage between Pokémon in various battle conditions</p>
                </div>

                {/* Calculator container with dark background */}
                <div className="flex justify-center">
                    <div className="w-full max-w-5xl bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700">
                        <div className="flex flex-col md:flex-row">
                            {/* Player's Pokemon Section - Dark Blue */}
                            <div className="flex-1 p-6 bg-gray-800 border-b md:border-b-0 md:border-r border-gray-700">
                                <h2 className="text-xl font-semibold mb-4 text-blue-400 text-center">Your Pokémon</h2>

                                <div className="space-y-4 max-w-xs mx-auto">
                                    <div className="text-center">
                                        <label className="block text-sm font-medium text-gray-300 mb-1">
                                            Pokémon Name
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-gray-200 focus:ring-blue-500 focus:border-blue-500 text-center placeholder-gray-400"
                                            value={playerPokemon.name}
                                            onChange={(e) =>
                                                setPlayerPokemon({ ...playerPokemon, name: e.target.value })
                                            }
                                            placeholder="Enter Pokémon"
                                        />
                                    </div>

                                    <div className="text-center">
                                        <label className="block text-sm font-medium text-gray-300 mb-1">Level</label>
                                        <input
                                            type="number"
                                            min="1"
                                            max="100"
                                            className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-gray-200 focus:ring-blue-500 focus:border-blue-500 text-center"
                                            value={playerPokemon.level}
                                            onChange={(e) =>
                                                setPlayerPokemon({
                                                    ...playerPokemon,
                                                    level: parseInt(e.target.value) || 50,
                                                })
                                            }
                                        />
                                    </div>

                                    {/* Continue with other inputs in same dark mode style... */}
                                </div>
                            </div>

                            {/* Field Effects Section - Dark Gray */}
                            <div className="flex-1 p-6 bg-gray-800 border-b md:border-b-0 md:border-x border-gray-700">
                                <h2 className="text-xl font-semibold mb-4 text-purple-400 text-center">
                                    Field Effects
                                </h2>

                                <div className="space-y-4 max-w-xs mx-auto">
                                    <div className="text-center">
                                        <label className="block text-sm font-medium text-gray-300 mb-1">Weather</label>
                                        <select
                                            className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-gray-200 focus:ring-purple-500 focus:border-purple-500 text-center"
                                            value={fieldEffects.weather}
                                            onChange={(e) =>
                                                setFieldEffects({ ...fieldEffects, weather: e.target.value })
                                            }
                                        >
                                            <option value="none" className="bg-gray-800">
                                                None
                                            </option>
                                            <option value="sun" className="bg-gray-800">
                                                Harsh Sunlight
                                            </option>
                                            <option value="rain" className="bg-gray-800">
                                                Rain
                                            </option>
                                            <option value="sand" className="bg-gray-800">
                                                Sandstorm
                                            </option>
                                            <option value="hail" className="bg-gray-800">
                                                Hail
                                            </option>
                                        </select>
                                    </div>

                                    {/* Damage Results - Dark Card */}
                                    <div className="mt-8 p-4 bg-gray-700 rounded-lg border border-gray-600 text-center">
                                        <h3 className="font-medium text-lg text-white">Damage Results</h3>
                                        <div className="mt-2">
                                            <p className="text-2xl font-bold text-green-400">
                                                {damageResult.minDamage} - {damageResult.maxDamage}
                                            </p>
                                            <p className="text-gray-400">
                                                ({damageResult.percentage} of opponent&apos;s HP)
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Opponent's Pokemon Section - Dark Red */}
                            <div className="flex-1 p-6 bg-gray-800 border-t md:border-t-0 md:border-l border-gray-700">
                                <h2 className="text-xl font-semibold mb-4 text-red-400 text-center">
                                    Opponent&apos;s Pokémon
                                </h2>

                                <div className="space-y-4 max-w-xs mx-auto">
                                    <div className="text-center">
                                        <label className="block text-sm font-medium text-gray-300 mb-1">
                                            Pokémon Name
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-gray-200 focus:ring-red-500 focus:border-red-500 text-center placeholder-gray-400"
                                            value={opponentPokemon.name}
                                            onChange={(e) =>
                                                setOpponentPokemon({ ...opponentPokemon, name: e.target.value })
                                            }
                                            placeholder="Enter Pokémon"
                                        />
                                    </div>

                                    <div className="text-center">
                                        <label className="block text-sm font-medium text-gray-300 mb-1">
                                            {playerPokemon.isPhysical ? "Defense" : "Special Defense"}
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-gray-200 focus:ring-red-500 focus:border-red-500 text-center"
                                            value={
                                                playerPokemon.isPhysical
                                                    ? opponentPokemon.defense
                                                    : opponentPokemon.specialDefense
                                            }
                                            onChange={(e) =>
                                                playerPokemon.isPhysical
                                                    ? setOpponentPokemon({
                                                          ...opponentPokemon,
                                                          defense: parseInt(e.target.value) || 0,
                                                      })
                                                    : setOpponentPokemon({
                                                          ...opponentPokemon,
                                                          specialDefense: parseInt(e.target.value) || 0,
                                                      })
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PokemonDamageCalculator;
