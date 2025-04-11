import { isNull } from "@/app/data/util";
import Image from "next/image";
import { CardData } from "../page";

export default function TableHeader({ card }: { card: CardData }) {
    const pokemon = card.pokemon;
    return (
        !isNull(pokemon) && (
            <div className="flex flex-col items-center">
                <Image src={pokemon.getImage(card.form)} alt={pokemon.name} height="80" width="80" className="my-2" />
                <span>{pokemon.name}</span>
            </div>
        )
    );
}
