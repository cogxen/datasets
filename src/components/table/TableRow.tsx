import React, { useState } from "react"
import Link from "next/link"
import { Row } from "@tanstack/react-table"

/** Icons */
import { Link2, ChevronDown, ChevronUp } from "lucide-react"

interface TableRowProps<T> {
  row: Row<T>
}

const TableRow = <T,>({ row }: TableRowProps<T>) => {
  const [isProjectsVisible, setIsProjectsVisible] = useState(false)

  const toggleProjectsVisibility = () => {
    setIsProjectsVisible(!isProjectsVisible)
  }

  return (
    <>
      <tr key={row.id} className={`hover:bg-slate-200 ${isProjectsVisible ? "bg-slate-100" : ""}`}>
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
                    className="flex flex-row items-center gap-1 text-blue-700"
                  >
                    <Link2 className="h-3 w-3" />
                    <span>{value.platform}</span>
                  </Link>
                ) : null
              })()
            ) : cell.column.id === "date_uploaded" ? (
              (() => {
                const dateUploaded = new Date(cell.getValue() as string)
                return dateUploaded.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              })()
            ) : cell.column.id === "data_source" ? (
              (() => {
                const value = cell.getValue() as { link: string; name: string }
                return value && value.link && value.name ? (
                  <Link
                    href={value.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700"
                  >
                    {value.name}
                  </Link>
                ) : (
                  <span className="text-slate-500">Anonymous</span>
                )
              })()
            ) : cell.column.id === "projects" ? (
              (() => {
                const projects = cell.getValue() as {
                  name: string
                  link: string
                  contributors: { name: string; link: string }[]
                }[]
                return projects.length > 0 ? (
                  <div
                    className="flex flex-row gap-2 items-center cursor-pointer"
                    onClick={toggleProjectsVisibility}
                  >
                    <span className="text-blue-700">{projects.length} project(s)</span>
                    {isProjectsVisible ? (
                      <ChevronUp className="h-3 w-3" />
                    ) : (
                      <ChevronDown className="h-3 w-3" />
                    )}
                  </div>
                ) : (
                  <span className="text-slate-400">No project founds.</span>
                )
              })()
            ) : cell.column.id === "name" ? (
              (() => {
                const name = cell.getValue() as string
                const dateUploaded = new Date(row.getValue("date_uploaded") as string)
                const today = new Date()
                const diffTime = Math.abs(today.getTime() - dateUploaded.getTime())
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
                return (
                  <span className="flex items-center gap-2 line-clamp-1">
                    {name}
                    {diffDays <= 7 && (
                      <span className="bg-amber-200 text-amber-800 px-2 py-1 rounded text-xs">
                        Latest
                      </span>
                    )}
                  </span>
                )
              })()
            ) : cell.column.id === "uploaded_by" ? (
              <div className="flex space-x-1">
                {(cell.getValue() as { name: string }[]).map((uploader, index) => (
                  <span key={index} className="border border-gray-300 px-2 py-1 rounded">
                    {uploader.name.charAt(0)}
                  </span>
                ))}
              </div>
            ) : typeof cell.column.columnDef.cell === "function" ? (
              cell.column.columnDef.cell(cell.getContext())
            ) : (
              cell.column.columnDef.cell
            )}
          </td>
        ))}
      </tr>
      {isProjectsVisible && (
        <tr>
          <td
            colSpan={row.getVisibleCells().length}
            className="px-6 py-2 text-black text-xs bg-slate-100"
          >
            <div className="flex flex-row flex-wrap gap-2 items-center">
              <span className="text-slate-500">Projects:</span>
              {(
                row.getValue("projects") as {
                  name: string
                  link: string
                  contributors: { name: string; link: string }[]
                }[]
              ).map((project, index) => (
                <div
                  key={index}
                  className="border border-gray-300 flex flex-row items-center gap-2 px-2 py-1 rounded text-slate-500"
                >
                  <div className="flex flex-row items-center gap-2">
                    <span>Name:</span>
                    <Link
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700"
                    >
                      {project.name}
                    </Link>
                  </div>
                  <div className="flex flex-row gap-2 items-center">
                    <span>Contributor(s):</span>
                    {project.contributors.map((contributor, idx) => (
                      <Link
                        key={idx}
                        href={contributor.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-700"
                      >
                        {contributor.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </td>
        </tr>
      )}
    </>
  )
}

export default TableRow
