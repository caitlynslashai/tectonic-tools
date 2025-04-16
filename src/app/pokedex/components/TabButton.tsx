export default function TabButton({ tab, activeTab }: { tab: string; activeTab: string }) {
    return (
        <button
            className={`p-2.5 text-2xl text-center no-underline inline-block rounded-lg mx-2 hover:bg-[#FFD166] hover:text-black hover:cursor-pointer ${
                tab === activeTab ? "bg-[#FFD166] text-black" : "bg-gray-500"
            }`}
        >
            {tab}
        </button>
    );
}
