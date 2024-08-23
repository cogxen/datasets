import React from "react"

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  totalDatasets: number
}

type Color = "blue" | "orange" | "emerald"

interface StatusIndicatorProps {
  color: Color
  label: string
  textColor?: Color
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ color, label, textColor }) => {
  const colorClasses: Record<Color, string> = {
    blue: "bg-blue-400 bg-blue-500",
    orange: "bg-orange-400 bg-orange-500",
    emerald: "bg-emerald-400 bg-emerald-500",
  }

  const textColorClasses: Record<Color, string> = {
    blue: "text-blue-500",
    orange: "text-orange-500",
    emerald: "text-emerald-500",
  }

  return (
    <div className="flex flex-row gap-2 items-center">
      <span className="relative flex h-2 w-2">
        <span
          className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
            colorClasses[color].split(" ")[0]
          } opacity-75`}
        ></span>
        <span
          className={`relative inline-flex rounded-full h-2 w-2 ${
            colorClasses[color].split(" ")[1]
          }`}
        ></span>
      </span>
      <span className={textColor ? textColorClasses[textColor] : ""}>{label}</span>
    </div>
  )
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange, totalDatasets }) => {
  return (
    <div className="mb-4 w-full flex flex-row items-center justify-between text-xs">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search a dataset"
        className="px-4 py-2 border border-gray-300 rounded placeholder:text-slate-600 text-slate-900"
      />
      <div className="flex flex-col items-end">
        <div className="flex flex-row gap-2 items-center">
          <StatusIndicator color="blue" label="Latest" />
          <StatusIndicator color="orange" label="Outdated" textColor="orange" />
          <StatusIndicator color="emerald" label="Updated" textColor="emerald" />
        </div>
        <div>Total datasets ({totalDatasets})</div>
      </div>
    </div>
  )
}

export default SearchInput
