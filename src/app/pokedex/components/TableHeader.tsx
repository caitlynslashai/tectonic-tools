import { ReactNode } from "react";

export default function TableHeader({ children }: { children: ReactNode }) {
    return (
        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
            {children}
        </th>
    );
}
