"use client";

import type { NextPage } from "next";
import { useState } from "react";
import { nullPokemon, pokemon } from "./data/pokemon";
import { blankStylePoints, StylePoints } from "./data/types/BasicData";
import { blankStats, Pokemon, Stats } from "./data/types/Pokemon";

function isNull(o: Pokemon | Pokemon | undefined): boolean {
    return !o || o.id === "";
}

function isKey<T extends object>(k: string | number | symbol, o: T): k is keyof T {
    return k in o;
}

function safeKeys<T extends object>(o: T): Array<keyof T> {
    const allKeys = Object.keys(o);
    return allKeys.filter((k) => isKey(k, o));
}

const PokemonDamageCalculator: NextPage = () => {
    const [playerPokemon, setPlayerPokemon] = useState<Pokemon>(nullPokemon);
    const [playerLevel, setPlayerLevel] = useState<number>(70);
    const [playerStylePoints, setPlayerStylePoints] = useState<StylePoints>(blankStylePoints);
    const [playerCalculatedStats, setPlayerCalculatedStats] = useState<Stats>(blankStats);

    const [opponentPokemon, setOpponentPokemon] = useState<Pokemon>(nullPokemon);
    const [opponentLevel, setOpponentLevel] = useState<number>(70);
    const [opponentStylePoints, setOpponentStylePoints] = useState<StylePoints>(blankStylePoints);
    const [opponentCalculatedStats, setOpponentCalculatedStats] = useState<Stats>(blankStats);

    const [fieldEffects, setFieldEffects] = useState({
        weather: "none",
        terrain: "none",
        otherModifiers: 1,
    });

    type Side = "player" | "opponent";

    const getPokemon = {
        player: playerPokemon,
        opponent: opponentPokemon,
    };

    const setPokemon = {
        player: setPlayerPokemon,
        opponent: setOpponentPokemon,
    };

    const getLevel = {
        player: playerLevel,
        opponent: opponentLevel,
    };

    const setLevel = {
        player: setPlayerLevel,
        opponent: setOpponentLevel,
    };

    const getStylePoints = {
        player: playerStylePoints,
        opponent: opponentStylePoints,
    };

    const setStylePoints = {
        player: setPlayerStylePoints,
        opponent: setOpponentStylePoints,
    };

    const getCalculatedStats = {
        player: playerCalculatedStats,
        opponent: opponentCalculatedStats,
    };

    const setCalculatedStats = {
        player: setPlayerCalculatedStats,
        opponent: setOpponentCalculatedStats,
    };

    const DEFAULT_LEVEL = 70;

    function handleLoadingPokemon(pokemon: Pokemon, side: Side) {
        if (!isNull(pokemon)) {
            setPokemon[side](pokemon);
            const baseStats = pokemon.stats;
            const level = DEFAULT_LEVEL;
            const stylePoints = blankStylePoints;
            const newStats: Stats = {
                hp: calculateHP(baseStats.hp, level, stylePoints.hp),
                attack: calculateStat(baseStats.attack, level, stylePoints.attacks),
                defense: calculateStat(baseStats.defense, level, stylePoints.defense),
                spatk: calculateStat(baseStats.spatk, level, stylePoints.attacks),
                spdef: calculateStat(baseStats.spdef, level, stylePoints.spdef),
                speed: calculateStat(baseStats.speed, level, stylePoints.speed),
            };
            setCalculatedStats[side](newStats);
        }
    }

    function styleValueMult(level: number): number {
        return 2.0 + level / 50.0;
    }

    function calculateHP(base: number, level: number, sv: number, stylish: boolean = false): number {
        if (base === 1) return 1; // For Shedinja
        const pseudoLevel = 15.0 + level / 2.0;
        const stylishMult = stylish ? 2.0 : 1.0;
        return Math.floor(
            ((base * 2.0 + sv * styleValueMult(level) * stylishMult) * pseudoLevel) / 100.0 + pseudoLevel + 10.0
        );
    }

    function calculateStat(base: number, level: number, sv: number, stylish: boolean = false): number {
        const pseudoLevel = 15.0 + level / 2.0;
        const stylishMult = stylish ? 2.0 : 1.0;
        return Math.floor(((base * 2.0 + sv * styleValueMult(level) * stylishMult) * pseudoLevel) / 100.0 + 5.0);
    }

    function handleLevel(level: number, side: Side) {
        setLevel[side](level);
        const baseStats = getPokemon[side].stats;
        const stylePoints = getStylePoints[side];
        const newStats: Stats = {
            hp: calculateHP(baseStats.hp, level, stylePoints.hp),
            attack: calculateStat(baseStats.attack, level, stylePoints.attacks),
            defense: calculateStat(baseStats.defense, level, stylePoints.defense),
            spatk: calculateStat(baseStats.spatk, level, stylePoints.attacks),
            spdef: calculateStat(baseStats.spdef, level, stylePoints.spdef),
            speed: calculateStat(baseStats.speed, level, stylePoints.speed),
        };
        setCalculatedStats[side](newStats);
    }

    function handleStylePoints(stylePoints: StylePoints, side: Side) {
        setStylePoints[side](stylePoints);
        const baseStats = getPokemon[side].stats;
        const level = getLevel[side];
        const newStats: Stats = {
            hp: calculateHP(baseStats.hp, level, stylePoints.hp),
            attack: calculateStat(baseStats.attack, level, stylePoints.attacks),
            defense: calculateStat(baseStats.defense, level, stylePoints.defense),
            spatk: calculateStat(baseStats.spatk, level, stylePoints.attacks),
            spdef: calculateStat(baseStats.spdef, level, stylePoints.spdef),
            speed: calculateStat(baseStats.speed, level, stylePoints.speed),
        };
        setCalculatedStats[side](newStats);
    }

    function styleFromStat(stat: keyof Stats): keyof StylePoints {
        if (stat === "attack" || stat === "spatk") {
            return "attacks";
        }
        return stat;
    }

    // This would be replaced with your actual damage calculation logic
    const calculateDamage = () => {
        // Placeholder for your damage calculation
        return { minDamage: 0, maxDamage: 0, percentage: "0%" };
    };

    const damageResult = calculateDamage();

    function pokemonSelect(side: Side) {
        return (
            <>
                <div className="text-center">
                    <label className="block text-sm font-medium text-gray-300 mb-1">Pokémon</label>
                </div>
                <select
                    className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-gray-200 focus:ring-blue-500 focus:border-blue-500 text-center"
                    value={getPokemon[side].id}
                    onChange={(e) => handleLoadingPokemon(pokemon[e.target.value] || nullPokemon, side)}
                >
                    <option value="" className="bg-gray-800">
                        Select Pokémon
                    </option>
                    {Object.values(pokemon).map((p) => (
                        <option key={p.id} value={p.id} className="bg-gray-800">
                            {p.name}
                        </option>
                    ))}
                </select>
            </>
        );
    }

    function pokemonStats(side: Side) {
        return !isNull(getPokemon[side]) ? (
            <>
                <div className="text-center">
                    <label className="block text-sm font-medium text-gray-300 mb-1">Level</label>
                    <input
                        type="number"
                        min="1"
                        max="70"
                        className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-gray-200 focus:ring-blue-500 focus:border-blue-500 text-center"
                        value={getLevel[side]}
                        onChange={(e) => handleLevel(parseInt(e.target.value) || DEFAULT_LEVEL, side)}
                    />
                </div>

                <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-300 mb-2 text-center">Stats</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {safeKeys(getPokemon[side].stats).map((statName) => {
                            const styleName = styleFromStat(statName);
                            return (
                                <div key={statName} className="flex justify-between items-center">
                                    <span className="text-gray-300">{statName.toUpperCase()}</span>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-gray-400">{getCalculatedStats[side][statName]}</span>
                                        <input
                                            type="number"
                                            min="0"
                                            max="20"
                                            className="w-16 px-2 py-1 rounded-md bg-gray-700 border border-gray-600 text-gray-200 focus:ring-blue-500 focus:border-blue-500 text-center"
                                            value={getStylePoints[side][styleName]}
                                            onChange={(e) =>
                                                handleStylePoints(
                                                    {
                                                        ...getStylePoints[side],
                                                        [styleName]: parseInt(e.target.value) || 0,
                                                    },
                                                    side
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </>
        ) : (
            ""
        );
    }

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
                                    {pokemonSelect("player")}
                                    {pokemonStats("player")}
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
                                    {pokemonSelect("opponent")}
                                    {pokemonStats("opponent")}
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
