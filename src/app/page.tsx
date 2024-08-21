import DatasetsTable from "@/components/DatasetsTable"

export default function Home() {
  return (
    <div className="text-white">
      <h1 className="text-4xl text-center">Datasets</h1>

      <div className="pt-16 mx-auto w-full max-w-7xl">
        <DatasetsTable />
      </div>
    </div>
  )
}
