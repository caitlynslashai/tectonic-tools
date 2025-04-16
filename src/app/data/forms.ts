import loadedForms from "public/data/forms.json";
import { abilities } from "./abilities";
import { LoadedPokemon } from "./loading/pokemon";
import { moves } from "./moves";
import { Pokemon } from "./types/Pokemon";
import { PokemonType } from "./types/PokemonType";

type LoadedForm = Partial<LoadedPokemon> & { form_id: number };
export type PokemonForm = Partial<Pokemon> & { formId: number };

// this is currently redundant but I'm maintaining the structure in case I need to change things
function loadForm(form: LoadedForm): PokemonForm {
    return {
        ...form,
        formId: form.form_id,
        formName: form.formName as string | undefined,
        type1: form.type1 as PokemonType | undefined,
        type2: form.type2 as PokemonType | undefined,
        abilities: form.abilities?.map((a) => abilities[a]),
        levelMoves: form.levelMoves
            ? Object.entries(form.levelMoves).map(([moveId, level]) => [level, moves[moveId]])
            : undefined,
        tribes: undefined, // should never be defined on a form, this makes my life easier
        evos: undefined, // should never be defined on a form, this makes my life easier
    };
}

export const forms: Record<string, PokemonForm[]> = Object.fromEntries(
    Object.entries(loadedForms).map(([id, forms]) => [id, forms.map((form) => loadForm(form))])
);

export const nullForm: PokemonForm = { formId: 0 };
