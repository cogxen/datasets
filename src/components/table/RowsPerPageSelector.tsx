import React, { useState } from "react"
import { Table } from "@tanstack/react-table"
import { Menu } from "@headlessui/react"
import { ChevronDown, ChevronUp } from "lucide-react"

interface RowsPerPageSelectorProps<T> {
  table: Table<T>
}

const RowsPerPageSelector = <T,>({ table }: RowsPerPageSelectorProps<T>) => {
  const [isOpen, setIsOpen] = useState(false)
  const pageSizeOptions = [10, 15, 20]

  return (
    <div className="flex items-center gap-2">
      <span>Rows per page:</span>
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button
          className="border border-gray-300 rounded px-2 py-1 flex items-center gap-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {table.getState().pagination.pageSize}
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </Menu.Button>
        <Menu.Items
          className="absolute w-28 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          onClick={() => setIsOpen(false)}
        >
          {pageSizeOptions.map((size) => (
            <Menu.Item key={size}>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-gray-100" : ""
                  } group flex rounded-md items-center w-full px-2 py-1 text-sm `}
                  onClick={() => table.setPageSize(size)}
                >
                  {size}
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Menu>
    </div>
  )
}

export default RowsPerPageSelector
