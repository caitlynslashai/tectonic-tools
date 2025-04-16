import { PokemonType } from "@/app/data/types/PokemonType";
import { getTypeBadgeColourClass } from "./colours";

export default function TypeBadgeHeader({ type }: { type: PokemonType }) {
    return (
        <th className={`px-2 py-1 rounded-full text-white text-xs font-semibold ${getTypeBadgeColourClass(type)}`}>
            {type.name}
        </th>
    );
}
