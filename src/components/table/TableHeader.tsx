import React from "react"
import { HeaderGroup } from "@tanstack/react-table"
import { ArrowDownAZ, ArrowUpAZ, CalendarArrowDown, CalendarArrowUp } from "lucide-react"

interface TableHeaderProps<T> {
  headerGroup: HeaderGroup<T>
}

const TableHeader = <T,>({ headerGroup }: TableHeaderProps<T>) => {
  return (
    <tr key={headerGroup.id}>
      {headerGroup.headers.map((header) => (
        <th
          key={header.id}
          className={`px-6 py-3 text-xs font-medium text-slate-900 uppercase tracking-wider cursor-pointer ${
            header.column.id === "uploaded_at" || header.column.id === "updated_at"
              ? "text-right"
              : "text-left"
          }`}
          onClick={header.column.getToggleSortingHandler()}
        >
          <div
            className={`flex flex-row items-center gap-2 ${
              header.column.id === "uploaded_at" || header.column.id === "updated_at"
                ? "justify-end"
                : ""
            }`}
          >
            {header.isPlaceholder
              ? null
              : typeof header.column.columnDef.header === "function"
              ? header.column.columnDef.header(header.getContext())
              : header.column.columnDef.header}
            {header.column.getIsSorted() ? (
              header.column.id === "uploaded_at" || header.column.id === "updated_at" ? (
                header.column.getIsSorted() === "asc" ? (
                  <CalendarArrowUp className="h-4 w-4 text-slate-900" />
                ) : (
                  <CalendarArrowDown className="h-4 w-4 text-slate-900" />
                )
              ) : header.column.getIsSorted() === "asc" ? (
                <ArrowUpAZ className="h-4 w-4 text-slate-900" />
              ) : (
                <ArrowDownAZ className="h-4 w-4 text-slate-900" />
              )
            ) : header.column.id === "uploaded_at" || header.column.id === "updated_at" ? (
              <CalendarArrowDown className="h-4 w-4 text-slate-500" />
            ) : (
              <ArrowDownAZ className="h-4 w-4 text-slate-500" />
            )}
          </div>
        </th>
      ))}
    </tr>
  )
}

export default TableHeader
