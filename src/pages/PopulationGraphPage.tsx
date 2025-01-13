import { FC, useState } from 'react'
import { PrefectureSelector } from '../components/PrefectureSelector'

type PopulationType = '総人口' | '年少人口' | '生産年齢人口' | '老年人口'

const PopulationGraphPage: FC = () => {
  const [selectedPrefCodes, setSelectedPrefCodes] = useState<number[]>([])
  const [populationType, setPopulationType] = useState<PopulationType>('総人口')

  const handlePrefectureSelect = (prefCode: number, checked: boolean) => {
    if (checked) {
      setSelectedPrefCodes([...selectedPrefCodes, prefCode])
    } else {
      setSelectedPrefCodes(selectedPrefCodes.filter(code => code !== prefCode))
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-8">都道府県別人口推移</h1>
      <PrefectureSelector onSelect={handlePrefectureSelect} />
    </div>
  )
}

export default PopulationGraphPage
