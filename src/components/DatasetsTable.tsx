"use client"

import { useState, useMemo } from "react"
import {
  useReactTable,
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table"
/** Custom Hooks */
import useDebounce from "../lib/custom-hooks/useDebounce"
/** Types */
import type { Data } from "../types/data.types"
/** Data (JSON) */
import datasetsData from "../assets/data/datasets.json"
/** Components */
import SearchInput from "./table/SearchInput"
import DataTable from "./table/DataTable"
import Pagination from "./table/Pagination"

const columns: ColumnDef<Data>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "format",
    header: "Format",
  },
  {
    accessorKey: "url",
    header: "URL",
  },
  {
    accessorKey: "data_source",
    header: "Data Source",
  },
  {
    accessorKey: "projects",
    header: "Projects",
  },
  {
    accessorKey: "date_uploaded",
    header: "Date Uploaded",
  },
]

export default function DatasetsTable() {
  const [searchInput, setSearchInput] = useState("")
  const [sorting, setSorting] = useState<SortingState>([])

  const debouncedSearchInput = useDebounce(searchInput, 300)

  const filteredData = useMemo(() => {
    return datasetsData.datasets.filter((row: Data) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(debouncedSearchInput.toLowerCase()),
      ),
    )
  }, [debouncedSearchInput])

  const table = useReactTable<Data>({
    data: filteredData,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <div className="p-4">
      <SearchInput value={searchInput} onChange={setSearchInput} />
      <DataTable table={table} />
      <Pagination table={table} />
    </div>
  )
}
