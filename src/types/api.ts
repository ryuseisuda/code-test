export type Prefecture = {
  prefCode: number
  prefName: string
}

export type PrefecturesResponse = {
  message: string | null
  result: Prefecture[]
}

export type PopulationData = {
  year: number
  value: number
  rate: number
}

export type PopulationComposition = {
  label: string
  data: PopulationData[]
}

export type PopulationResponse = {
  message: string | null
  result: {
    boundaryYear: number
    data: PopulationComposition[]
  }
} 