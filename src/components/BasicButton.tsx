import { MouseEventHandler, ReactNode } from "react";

export default function BasicButton({
    children,
    onClick,
}: {
    children: ReactNode;
    onClick: MouseEventHandler<HTMLButtonElement>;
}): ReactNode {
    return (
        <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={onClick}
        >
            {children}
        </button>
    );
}
