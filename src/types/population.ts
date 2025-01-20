export type PopulationType = '総人口' | '年少人口' | '生産年齢人口' | '老年人口'

export interface PopulationGraphProps {
  data: PopulationResponse[]
  populationType: PopulationType
  prefectures: Prefecture[]
}

export interface PopulationTypeSelectorProps {
  selected: PopulationType
  onChange: (type: PopulationType) => void
}

export interface PrefectureSelectorProps {
  onSelect: (prefCode: number, checked: boolean, prefecture: Prefecture) => void
}

export interface Prefecture {
  prefCode: number
  prefName: string
}

export interface PrefecturesResponse {
  message: string | null
  result: Prefecture[]
}

export interface PopulationData {
  year: number
  value: number
  rate: number
}

export interface PopulationComposition {
  label: string
  data: PopulationData[]
}

export interface PopulationResponse {
  message: string | null
  result: {
    boundaryYear: number
    data: PopulationComposition[]
  }
}
