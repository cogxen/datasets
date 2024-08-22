import React from "react"

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  totalDatasets: number
}

interface StatusIndicatorProps {
  color: string
  label: string
  textColor?: string
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ color, label, textColor }) => (
  <div className="flex flex-row gap-2 items-center">
    <span className="relative flex h-2 w-2">
      <span
        className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-${color}-400 opacity-75`}
      ></span>
      <span className={`relative inline-flex rounded-full h-2 w-2 bg-${color}-500`}></span>
    </span>
    <span className={textColor ? `text-${textColor}-500` : ""}>{label}</span>
  </div>
)

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
