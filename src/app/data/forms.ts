import loadedForms from "public/data/forms.json";
import { abilities } from "./abilities";
import { LoadedForm } from "./loading/forms";
import { moves } from "./moves";
import { types } from "./types";
import { PokemonForm } from "./types/Pokemon";

// this is currently redundant but I'm maintaining the structure in case I need to change things
function loadForm(form: LoadedForm): PokemonForm {
    return {
        ...form,
        formId: form.formId,
        formName: form.formName,
        type1: form.type1 ? types[form.type1] : undefined,
        type2: form.type2 ? types[form.type2] : undefined,
        abilities: form.abilities?.map((a) => abilities[a]),
        levelMoves: form.levelMoves
            ? Object.entries(form.levelMoves).map(([moveId, level]) => [level, moves[moveId]])
            : undefined,
        // the following should never be defined on a form, this makes my life easier
        // (and explicitly labelling that in the form Type is tedious and less futureproof)
        lineMoves: undefined,
        tutorMoves: undefined,
        tribes: undefined,
    };
}

const loadedEntries: [string, LoadedForm[]][] = Object.entries(loadedForms) as [string, LoadedForm[]][];
const formEntries = loadedEntries.map(([id, forms]: [string, LoadedForm[]]) => [
    id,
    forms.map((form: LoadedForm) => loadForm(form)),
]);
export const forms: Record<string, PokemonForm[]> = Object.fromEntries(formEntries);

export const nullForm: PokemonForm = { formId: 0 };
