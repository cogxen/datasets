import React, { useState } from "react"
import Link from "next/link"
import { Row } from "@tanstack/react-table"

/** Icons */
import { Link2, ChevronDown, ChevronUp, Globe } from "lucide-react"

interface TableRowProps<T> {
  row: Row<T>
}

const FormatCell: React.FC<{ formats: string[] }> = ({ formats }) => (
  <div className="flex space-x-2">
    {formats.map((format, index) => (
      <span key={index} className="border border-gray-300 px-2 py-1 rounded">
        {format}
      </span>
    ))}
  </div>
)

const UrlCell: React.FC<{ link: string; platform: string }> = ({ link, platform }) => (
  <Link
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="flex flex-row items-center gap-1 text-blue-700"
  >
    <Link2 className="h-3 w-3" />
    <span>{platform}</span>
  </Link>
)

const DateCell: React.FC<{ date: string }> = ({ date }) => {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  return <>{formattedDate}</>
}

const DataSourceCell: React.FC<{ link: string; name: string }> = ({ link, name }) =>
  link && name ? (
    <Link
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-row items-center gap-1 text-blue-700"
    >
      <Globe className="h-3 w-3" />
      {name}
    </Link>
  ) : (
    <span className="text-slate-500">Anonymous</span>
  )

const ProjectsCell: React.FC<{
  projects: { name: string; link: string; contributors: { name: string; link: string }[] }[]
  toggleVisibility: () => void
  isVisible: boolean
}> = ({ projects, toggleVisibility, isVisible }) =>
  projects.length > 0 ? (
    <div className="flex flex-row gap-2 items-center cursor-pointer" onClick={toggleVisibility}>
      <span className="text-blue-700">{projects.length} project(s)</span>
      {isVisible ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
    </div>
  ) : (
    <span className="text-slate-400">No project founds.</span>
  )

const NameCell: React.FC<{ name: string; uploadedAt: string }> = ({ name, uploadedAt }) => {
  const dateUploaded = new Date(uploadedAt)
  const today = new Date()
  const diffTime = Math.abs(today.getTime() - dateUploaded.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return (
    <span className="flex items-center gap-2 line-clamp-1">
      {name}
      {diffDays <= 14 && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
        </span>
      )}
    </span>
  )
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
              cell.column.id === "uploaded_at" || cell.column.id === "updated_at"
                ? "text-right"
                : "text-left"
            }`}
          >
            {cell.column.id === "format" ? (
              <FormatCell formats={cell.getValue() as string[]} />
            ) : cell.column.id === "url" ? (
              <UrlCell {...(cell.getValue() as { link: string; platform: string })} />
            ) : cell.column.id === "uploaded_at" || cell.column.id === "updated_at" ? (
              <DateCell date={cell.getValue() as string} />
            ) : cell.column.id === "data_source" ? (
              <DataSourceCell {...(cell.getValue() as { link: string; name: string })} />
            ) : cell.column.id === "projects" ? (
              <ProjectsCell
                projects={
                  cell.getValue() as {
                    name: string
                    link: string
                    contributors: { name: string; link: string }[]
                  }[]
                }
                toggleVisibility={toggleProjectsVisibility}
                isVisible={isProjectsVisible}
              />
            ) : cell.column.id === "name" ? (
              <NameCell
                name={cell.getValue() as string}
                uploadedAt={row.getValue("uploaded_at") as string}
              />
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
                  className="border border-slate-300 flex flex-row items-center gap-2 px-2 py-1 rounded text-slate-500"
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
