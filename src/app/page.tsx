import DatasetsTable from "@/components/DatasetsTable"

export default function Home() {
  return (
    <div className="text-blue-800">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl text-center">Datasets</h1>
        <span className="text-xs">Collected by Cogxen</span>
      </div>
      <div className="pt-16 mx-auto w-full max-w-7xl">
        <DatasetsTable />
      </div>
    </div>
  )
}
