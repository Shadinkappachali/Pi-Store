"use client";

import { useState } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

interface Column<T> {
    key: keyof T | string;
    label: string;
    render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    actions?: (item: T) => React.ReactNode;
    searchable?: boolean;
    searchPlaceholder?: string;
    rowKey?: keyof T;
}

export function DataTable<T>({
    data,
    columns,
    actions,
    searchable = true,
    searchPlaceholder = "Search...",
    rowKey = "id" as keyof T
}: DataTableProps<T>) {
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Filter data based on search
    const filteredData = searchable
        ? data.filter((item) =>
            Object.values(item as any).some((value) =>
                String(value).toLowerCase().includes(search.toLowerCase())
            )
        )
        : data;

    // Pagination
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="space-y-4">
            {/* Search */}
            {searchable && (
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder={searchPlaceholder}
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                </div>
            )}

            {/* Table */}
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                {columns.map((column) => (
                                    <th
                                        key={String(column.key)}
                                        className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600"
                                    >
                                        {column.label}
                                    </th>
                                ))}
                                {actions && (
                                    <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-600">
                                        Actions
                                    </th>
                                )}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {paginatedData.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={columns.length + (actions ? 1 : 0)}
                                        className="px-6 py-12 text-center text-sm text-gray-500"
                                    >
                                        No data found
                                    </td>
                                </tr>
                            ) : (
                                paginatedData.map((item) => (
                                    <tr key={String(item[rowKey])} className="hover:bg-gray-50">
                                        {columns.map((column) => (
                                            <td
                                                key={String(column.key)}
                                                className="whitespace-nowrap px-6 py-4 text-sm text-gray-900"
                                            >
                                                {column.render
                                                    ? column.render(item)
                                                    : String((item as any)[column.key] || "-")}
                                            </td>
                                        ))}
                                        {actions && (
                                            <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                                                {actions(item)}
                                            </td>
                                        )}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-6 py-3">
                        <div className="text-sm text-gray-700">
                            Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
                            <span className="font-medium">
                                {Math.min(startIndex + itemsPerPage, filteredData.length)}
                            </span>{" "}
                            of <span className="font-medium">{filteredData.length}</span> results
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <ChevronLeft size={16} />
                            </button>
                            <button
                                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
