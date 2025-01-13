export type PopulationType = '総人口' | '年少人口' | '生産年齢人口' | '老年人口'

export type PopulationGraphProps = {
  data: PopulationResponse[]
  populationType: PopulationType
  prefectures: Prefecture[]
}

export type PopulationTypeSelectorProps = {
  selected: PopulationType
  onChange: (type: PopulationType) => void
}

export type PrefectureSelectorProps = {
  onSelect: (prefCode: number, checked: boolean, prefecture: Prefecture) => void
} 
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