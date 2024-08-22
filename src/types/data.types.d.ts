export type Data = {
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
    contributors: {
      name: string
      link: string
    }[]
  }[]
  date_uploaded: string
  uploaded_by: {
    name: string
  }[]
}
