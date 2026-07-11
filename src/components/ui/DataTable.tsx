import React, { useState } from "react";

/**
 * `Column<T>` and `DataTable<T>` use a generic type parameter, `T`.
 * A generic is a placeholder type filled in at the call site: instead of
 * hardcoding "this table holds Application rows," the component says
 * "this table holds whatever type of row you give it," and TypeScript
 * fills in T from the `data` prop you pass. That's what replaces the old
 * `Record<string, any>[]` typing, columns and rows are now checked
 * against the real shape of the data instead of "any object goes."
 */
export interface Column<T> {
  key: keyof T;
  header: string;
  sortable?: boolean;
  /** Optional custom cell renderer, for badges, links, formatted dates, etc. */
  render?: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  /** Optional row click handler, used to open the application detail drawer later. */
  onRowClick?: (row: T) => void;
  /** Stable row key, falls back to array index if not provided. */
  getRowId?: (row: T) => string;
}

type SortDirection = "asc" | "desc";

export function DataTable<T>({ data, columns, onRowClick, getRowId }: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [direction, setDirection] = useState<SortDirection>("asc");

  const sortedData = React.useMemo(() => {
    if (!sortKey) return data;

    const copy = [...data];

    return copy.sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];

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

  const handleSort = (key: keyof T) => {
    if (sortKey === key) {
      setDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setDirection("asc");
    }
  };

  return (
    <div className="w-full overflow-x-auto border border-muted/20 rounded-md bg-surface">
      <table className="w-full text-sm font-data">
        <thead>
          <tr className="border-b border-muted/20 bg-paper">
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className={`text-left p-3 font-medium font-body text-ink ${
                  col.sortable ? "cursor-pointer select-none" : ""
                }`}
                onClick={() => col.sortable && handleSort(col.key)}
              >
                <div className="flex items-center gap-1">
                  {col.header}

                  {sortKey === col.key && (
                    <span className="text-xs text-muted">
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
            <tr
              key={getRowId ? getRowId(row) : i}
              className={`border-b border-muted/10 hover:bg-paper transition-colors ${
                onRowClick ? "cursor-pointer" : ""
              }`}
              onClick={() => onRowClick?.(row)}
            >
              {columns.map((col) => (
                <td key={String(col.key)} className="p-3 text-ink">
                  {col.render ? col.render(row) : String(row[col.key] ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}