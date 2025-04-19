import loadedForms from "public/data/forms.json";
import { abilities } from "./abilities";
import { LoadedForm } from "./loading/forms";
import { moves } from "./moves";
import { types } from "./types";
import { PokemonForm } from "./types/Pokemon";

function loadForm(form: LoadedForm): PokemonForm {
    return {
        ...form,
        formId: form.formId,
        formName: form.formName,
        type1: form.type1 ? types[form.type1] : undefined,
        type2: form.type2 ? types[form.type2] : undefined,
        abilities: form.abilities?.map((a) => abilities[a]),
        levelMoves: form.levelMoves ? form.levelMoves.map(([level, id]) => [level, moves[id]]) : undefined,
        // if one stat is defined, they should all be
        stats: form.hp
            ? {
                  hp: form.hp,
                  attack: form.attack!,
                  spatk: form.spAttack!,
                  speed: form.speed!,
                  defense: form.defense!,
                  spdef: form.spDefense!,
              }
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
