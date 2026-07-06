import React, { useState } from "react";

export type Column = {
  key: string;
  header: string;
  sortable?: boolean;
};

interface DataTableProps {
  data: Record<string, any>[];
  columns: Column[];
}

type SortDirection = "asc" | "desc";

export function DataTable({ data, columns }: DataTableProps) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [direction, setDirection] = useState<SortDirection>("asc");

  const sortedData = React.useMemo(() => {
    if (!sortKey) return data;

    const copy = [...data];

    return copy.sort((a, b) => {
      const aVal = a?.[sortKey];
      const bVal = b?.[sortKey];

      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;

      const aStr = String(aVal);
      const bStr = String(bVal);

      if (direction === "asc") {
        return aStr.localeCompare(bStr);
      } else {
        return bStr.localeCompare(aStr);
      }
    });
  }, [data, sortKey, direction]);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setDirection("asc");
    }
  };

  return (
    <div className="w-full overflow-x-auto border rounded-md bg-white">
      <table className="w-full text-sm">

        <thead>
          <tr className="border-b bg-gray-50">
            {columns.map((col) => (
              <th
                key={col.key}
                className={`text-left p-3 font-medium ${
                  col.sortable ? "cursor-pointer select-none" : ""
                }`}
                onClick={() => col.sortable && handleSort(col.key)}
              >
                <div className="flex items-center gap-1">
                  {col.header}

                  {sortKey === col.key && (
                    <span className="text-xs">
                      {direction === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {sortedData.map((row, i) => (
            <tr key={i} className="border-b hover:bg-gray-50">
              {columns.map((col) => (
                <td key={col.key} className="p-3">
                  {String(row[col.key] ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}