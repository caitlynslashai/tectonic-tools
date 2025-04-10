import loadedForms from "public/data/forms.json";
import { abilities } from "./abilities";
import { PokemonType } from "./basicData";
import { moves } from "./moves";
import { LoadedPokemon } from "./pokemon";
import { Pokemon } from "./types/Pokemon";

type LoadedForm = Partial<LoadedPokemon> & { form_id: number };
export type PokemonForm = Partial<Pokemon> & { formId: number };

// this is currently redundant but I'm maintaining the structure in case I need to change things
function loadForm(form: LoadedForm): PokemonForm {
    return {
        ...form,
        formId: form.form_id,
        formName: form.form_name as string | undefined,
        type1: form.type1 as PokemonType | undefined,
        type2: form.type2 as PokemonType | undefined,
        abilities: form.abilities?.map((a) => abilities[a]),
        levelMoves: form.level_moves?.map((m) => [m[0] as number, moves[m[1]]]),
        tribes: undefined, // should never be defined on a form, this makes my life easier
        evos: undefined, // should never be defined on a form, this makes my life easier
    };
}

export const forms: Record<string, PokemonForm[]> = Object.fromEntries(
    Object.entries(loadedForms).map(([id, forms]) => [id, forms.map((form) => loadForm(form))])
);

export const nullForm: PokemonForm = { formId: 0 };
