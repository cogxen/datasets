import React from "react"
import { Table } from "@tanstack/react-table"

interface PaginationProps<T> {
  table: Table<T>
}

const Pagination = <T,>({ table }: PaginationProps<T>) => {
  return (
    <div className="flex items-center justify-between mt-4">
      <button
        className="px-4 py-2 border rounded disabled:opacity-50"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        Previous
      </button>
      <span className="text-sm">
        Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
      </span>
      <button
        className="px-4 py-2 border rounded disabled:opacity-50"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        Next
      </button>
    </div>
  )
}

export default Pagination
