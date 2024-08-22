import React from "react"
import { Table } from "@tanstack/react-table"
import RowsPerPageSelector from "./RowsPerPageSelector"

interface PaginationProps<T> {
  table: Table<T>
}

const Pagination = <T,>({ table }: PaginationProps<T>) => {
  return (
    <div className="flex text-xs items-center justify-between mt-4">
      <div className="flex flex-row items-center gap-2">
        <RowsPerPageSelector table={table} />
      </div>
      <span>
        Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
      </span>
      <div className="flex flex-row items-center gap-2">
        <button
          className="px-4 py-1 border border-blue-700 disabled:border-blue-700/50 rounded disabled:opacity-50"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </button>
        <button
          className="px-4 py-1 border border-blue-700 disabled:border-blue-700/50 rounded disabled:opacity-50"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Pagination
