"use client"

import { useState, useMemo } from "react"
import {
  useReactTable,
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
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
    accessorKey: "uploaded_by",
    header: "Uploaded By",
  },
  {
    accessorKey: "date_uploaded",
    header: "Date Uploaded",
  },
]

export default function DatasetsTable() {
  const [searchInput, setSearchInput] = useState("")
  const [sorting, setSorting] = useState<SortingState>([{ id: "date_uploaded", desc: true }])
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 15,
  })

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
      pagination,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div className="p-4">
      <SearchInput value={searchInput} onChange={setSearchInput} />
      <DataTable table={table} />
      <Pagination table={table} />
    </div>
  )
}
