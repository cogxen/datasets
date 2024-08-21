import React from "react"
import { Table } from "@tanstack/react-table"
import TableHeader from "./TableHeader"
import TableRow from "./TableRow"

interface DataTableProps<T> {
  table: Table<T>
}

const DataTable = <T,>({ table }: DataTableProps<T>) => {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        {table.getHeaderGroups().map((headerGroup) => (
          <TableHeader key={headerGroup.id} headerGroup={headerGroup} />
        ))}
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id} row={row} />
        ))}
      </tbody>
    </table>
  )
}

export default DataTable
