export type Data = {
  id: number
  name: string
  url: {
    link: string
    platform: string
  }
  format: string[]
  data_source: {
    name: string
    link: string
  }
  projects: {
    name: string
    link: string
  }[]
  date_uploaded: string
}
