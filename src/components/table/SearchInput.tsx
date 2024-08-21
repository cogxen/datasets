import React from "react"

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search a dataset"
      className="mb-4 px-4 py-2 border border-gray-300 rounded placeholder:text-slate-600 text-xs text-slate-900"
    />
  )
}

export default SearchInput
