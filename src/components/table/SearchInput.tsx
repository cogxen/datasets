import React from "react"

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => {
  return (
    <div className="mb-4 w-full flex flex-row items-center justify-between text-xs">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search a dataset"
        className="px-4 py-2 border border-gray-300 rounded placeholder:text-slate-600 text-slate-900"
      />
      <div className="flex flex-row gap-2 items-center">
        <div className="flex flex-row gap-2 items-center">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <span>Latest</span>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
          </span>
          <span className="text-orange-500">Outdated</span>
        </div>
      </div>
    </div>
  )
}

export default SearchInput
