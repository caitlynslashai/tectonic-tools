import { DamageResult } from "../damageCalc";

export default function DamageResultComponent({ damageResult }: { damageResult: DamageResult }) {
    let damageNumbers;
    // multi-hit moves
    if (damageResult.minTotal && damageResult.minPercentage) {
        if (damageResult.maxTotal === damageResult.minTotal) {
            damageNumbers = (
                <>
                    <p className="text-3xl font-bold text-green-400">{damageResult.minTotal}</p>
                    <p className="text-gray-300">({damageResult.damage} per hit)</p>
                    <p className="text-gray-300">
                        {(damageResult.minPercentage * 100).toFixed(2)}% of opponent&apos;s HP
                    </p>
                </>
            );
        } else if (damageResult.maxTotal && damageResult.maxPercentage) {
            damageNumbers = (
                <>
                    <p className="text-3xl font-bold text-green-400">
                        {damageResult.minTotal}-{damageResult.maxTotal}
                    </p>
                    <p className="text-gray-300">({damageResult.damage} per hit)</p>
                    <p className="text-gray-300">
                        {(damageResult.minPercentage * 100).toFixed(2)}%-
                        {(damageResult.maxPercentage * 100).toFixed(2)}% of opponent&apos;s HP
                    </p>
                </>
            );
        }
    } else {
        damageNumbers = (
            <>
                <p className="text-3xl font-bold text-green-400">{damageResult.damage}</p>
                <p className="text-gray-300">{(damageResult.percentage * 100).toFixed(2)}% of opponent&apos;s HP</p>
            </>
        );
    }

    const percentage = damageResult.minPercentage || damageResult.percentage;
    let hpBar;
    if (damageResult.maxPercentage && damageResult.maxPercentage !== damageResult.minPercentage) {
        hpBar = (
            <div className="mt-4 relative">
                <div className="h-4 bg-gray-600 rounded-full overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"></div>
                    <div
                        className="absolute inset-0 bg-gray-800 rounded-left transition-all duration-300"
                        style={{
                            left: `${100 - Math.min(100, percentage * 100)}%`,
                        }}
                    ></div>
                    <div
                        className="absolute inset-0 bg-gray-800 rounded-left transition-all duration-300 opacity-80"
                        style={{
                            left: `${100 - Math.min(100, damageResult.maxPercentage * 100)}%`,
                        }}
                    ></div>
                </div>
            </div>
        );
    } else {
        hpBar = (
            <div className="mt-4 relative">
                <div className="h-4 bg-gray-600 rounded-full overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"></div>
                    <div
                        className="absolute inset-0 bg-gray-800 rounded-left transition-all duration-300"
                        style={{
                            left: `${100 - Math.min(100, percentage * 100)}%`,
                        }}
                    ></div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-xs">
            <div className="bg-gray-700 p-6 rounded-lg border border-gray-600 text-center">
                <div className="space-y-4">
                    {damageNumbers}
                    <p className="text-gray-300">{damageResult.hits} hits to KO</p>
                    {/* Effectiveness message */}
                    {damageResult.typeEffectMult === 4 && <p className="text-pink-400 font-bold">Hyper Effective!</p>}
                    {damageResult.typeEffectMult === 2 && <p className="text-green-400 font-bold">Super Effective!</p>}
                    {damageResult.typeEffectMult === 0.5 && (
                        <p className="text-red-400 font-bold">Not Very Effective!</p>
                    )}
                    {damageResult.typeEffectMult === 0.25 && (
                        <p className="text-gray-400 font-bold">Barely Effective!</p>
                    )}
                    {damageResult.typeEffectMult === 0 && (
                        <p className="text-gray-500 font-bold shadow-md">Not Effective!</p>
                    )}
                    {/* Fixed health bar */}
                    {hpBar}
                </div>{" "}
            </div>{" "}
        </div>
    );
}
