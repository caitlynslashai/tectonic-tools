import { Pokemon } from "@/app/data/types/Pokemon";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import Image from "next/image";
import { useMemo } from "react";
import { getTypeGradient } from "../../../components/colours";
import TypeBadge from "../../../components/TypeBadge";

const columnHelper = createColumnHelper<Pokemon>();

interface PokemonTableProps {
    mons: Pokemon[];
    onRowClick: (pokemon: Pokemon) => void;
}

const PokemonTable: React.FC<PokemonTableProps> = ({ mons, onRowClick }) => {
    const columns = [
        columnHelper.display({
            id: "image",
            cell: ({ row }) => (
                <Image
                    src={`/Pokemon/${row.original.id}.png`}
                    alt={row.original.name}
                    width={50}
                    height={50}
                    className="rounded-full"
                />
            ),
        }),
        columnHelper.accessor("dex", {
            header: "#",
            sortingFn: "basic",
            sortDescFirst: false,
        }),
        columnHelper.accessor("name", {
            header: "Name",
            sortingFn: "text",
        }),
        columnHelper.display({
            header: "Types",
            cell: ({ row }) => <TypeBadge type1={row.original.type1} type2={row.original.type2} />,
        }),
    ];

    const data = useMemo(() => mons, [mons]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    className={`px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider ${
                                        header.column.getCanSort() ? "cursor-pointer" : ""
                                    }`}
                                    onClick={header.column.getToggleSortingHandler()}
                                >
                                    <div className="flex items-center">
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                        {header.column.getIsSorted() === "asc" && <span className="ml-2">▲</span>}
                                        {header.column.getIsSorted() === "desc" && <span className="ml-2">▼</span>}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                    {table.getRowModel().rows.map((row) => (
                        <tr
                            key={row.id}
                            onClick={() => onRowClick(row.original)}
                            className={`hover:bg-blue-50 dark:hover:bg-blue-900 cursor-pointer transition-colors ${getTypeGradient(
                                row.original
                            )}`}
                        >
                            {row.getVisibleCells().map((cell) => (
                                <td
                                    key={cell.id}
                                    className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200"
                                >
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PokemonTable;
