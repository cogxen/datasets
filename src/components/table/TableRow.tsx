import React from "react"
import Link from "next/link"
import { Row } from "@tanstack/react-table"

/** Icons */
import { Link2 } from "lucide-react"

interface TableRowProps<T> {
  row: Row<T>
}

const TableRow = <T,>({ row }: TableRowProps<T>) => {
  return (
    <tr key={row.id} className="hover:bg-slate-200">
      {row.getVisibleCells().map((cell) => (
        <td
          key={cell.id}
          className={`px-6 py-2 whitespace-nowrap text-xs text-slate-900 ${
            cell.column.id === "date_uploaded" ? "text-right" : ""
          }`}
        >
          {cell.column.id === "format" ? (
            <div className="flex space-x-2">
              {(cell.getValue() as string[]).map((format, index) => (
                <span key={index} className="border border-gray-300 px-2 py-1 rounded">
                  {format}
                </span>
              ))}
            </div>
          ) : cell.column.id === "url" ? (
            (() => {
              const value = cell.getValue() as { link: string; platform: string }
              return value.link ? (
                <Link
                  href={value.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-row items-center gap-2 text-blue-700"
                >
                  <Link2 className="h-5 w-5" />
                  <span>{value.platform}</span>
                </Link>
              ) : null
            })()
          ) : cell.column.id === "date_uploaded" ? (
            (() => {
              const dateUploaded = new Date(cell.getValue() as string)
              const today = new Date()
              const diffTime = Math.abs(today.getTime() - dateUploaded.getTime())
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
              return (
                <span className="flex items-center justify-end gap-2">
                  {dateUploaded.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                  {diffDays <= 7 && (
                    <span className="bg-slate-200 text-slate-800 px-2 py-1 rounded text-xs">
                      Latest
                    </span>
                  )}
                </span>
              )
            })()
          ) : cell.column.id === "data_source" ? (
            (() => {
              const value = cell.getValue() as { link: string; name: string }
              return value.link ? (
                <Link
                  href={value.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700"
                >
                  {value.name}
                </Link>
              ) : null
            })()
          ) : cell.column.id === "projects" ? (
            (() => {
              const projects = cell.getValue() as { name: string; link: string }[]
              return projects.length > 0 ? (
                <div className="flex space-x-2">
                  {projects.map((project, index) => (
                    <Link
                      key={index}
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-gray-300 px-2 py-1 rounded text-blue-700"
                    >
                      {project.name}
                    </Link>
                  ))}
                </div>
              ) : (
                <span className="text-slate-500">No project founds.</span>
              )
            })()
          ) : typeof cell.column.columnDef.cell === "function" ? (
            cell.column.columnDef.cell(cell.getContext())
          ) : (
            cell.column.columnDef.cell
          )}
        </td>
      ))}
    </tr>
  )
}

export default TableRow
