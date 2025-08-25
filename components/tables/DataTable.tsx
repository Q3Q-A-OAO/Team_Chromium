
import React from 'react';
import { ChevronDown, Search } from 'lucide-react';
import Button from '../ui/Button';

interface DataTableProps<T> {
  columns: { header: string; accessor: keyof T }[];
  data: T[];
}

function DataTable<T extends { [key: string]: any }>({ columns, data }: DataTableProps<T>): React.ReactNode {
  return (
    <div className="w-full">
        <div className="flex items-center py-4 gap-2">
            <div className="relative w-full max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-subtext" />
                <input placeholder="Filter students..." className="w-full rounded-md bg-muted py-2 pl-10 pr-4 text-sm" />
            </div>
            {/* Placeholder for future filters */}
        </div>
        <div className="rounded-md border border-muted">
        <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b [&_tr]:border-muted">
            <tr className="transition-colors hover:bg-muted/50">
                {columns.map((col, index) => (
                <th key={index} className="h-12 px-4 text-left align-middle font-medium text-subtext">
                    {col.header}
                </th>
                ))}
            </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
            {data.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-b border-muted transition-colors hover:bg-muted/50">
                {columns.map((col, colIndex) => (
                    <td key={colIndex} className="p-4 align-middle">
                        {row[col.accessor]}
                    </td>
                ))}
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    </div>
  );
}

export default DataTable;
