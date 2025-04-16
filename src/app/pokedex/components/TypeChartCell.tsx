function getColourClassForMult(mult: number): string {
    if (mult >= 4) {
        return "bg-hyper-effective";
    }
    if (mult >= 2) {
        return "bg-super-effective";
    }
    if (mult == 0) {
        return "bg-not-effective";
    }
    if (mult < 0.5) {
        return "bg-barely-effective";
    }
    if (mult < 1) {
        return "bg-not-very-effective";
    }
    // if neutrally effective, no special colour
    return "";
}

function getTextColourForMult(mult: number): string {
    if (mult !== 1) {
        return "text-black";
    }
    return "";
}

function getTextForMult(mult: number): string {
    if (mult === 0.125) {
        return "⅛";
    }
    if (mult === 0.25) {
        return "¼";
    }
    if (mult === 0.5) {
        return "½";
    }
    return mult.toString();
}

export default function TypeChartCell({ mult }: { mult: number }) {
    const colourClass = getColourClassForMult(mult);
    const textClass = getTextColourForMult(mult);
    const content = getTextForMult(mult);
    return (
        <td className={"text-center border border-gray-600 text-lg cursor-default " + colourClass + " " + textClass}>
            {content}
        </td>
    );
}
