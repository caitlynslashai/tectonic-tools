import MonCard from "./MonCard";

export default function TrainerCard() {
    return (
        <div className="flex flex-col">
            <div className="w-full bg-black py-2">
                <div className="text-center text-yellow-400 font-bold text-lg">Tuber Peter</div>
            </div>
            <div className="flex flex-row">
                {Array.from({ length: 6 }).map((_, i) => (
                    <MonCard key={i} />
                ))}
            </div>
        </div>
    );
}
