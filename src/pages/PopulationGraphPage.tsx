import { FC, useState, useEffect } from 'react'
import { PrefectureSelector } from '../components/PrefectureSelector'
import { PopulationTypeSelector } from '../components/PopulationTypeSelector'
import { PopulationGraph } from '../components/PopulationGraph'
import { fetchPopulationBulk } from '../api/client'
import { PopulationType,Prefecture, PopulationResponse } from '../types/population'

const PopulationGraphPage: FC = () => {
  const [selectedPrefCodes, setSelectedPrefCodes] = useState<number[]>([])
  const [selectedPrefectures, setSelectedPrefectures] = useState<Prefecture[]>([])
  const [populationType, setPopulationType] = useState<PopulationType>('総人口')
  const [populationData, setPopulationData] = useState<PopulationResponse[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const fetchData = async () => {
      if (selectedPrefCodes.length === 0) {
        setPopulationData([])
        return
      }

      setIsLoading(true)
      setError('')

      try {
        const data = await fetchPopulationBulk(selectedPrefCodes)
        setPopulationData(data)
      } catch (err) {
        setError(`人口データの取得に失敗しました: ${err}`)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [selectedPrefCodes])

  const handlePrefectureSelect = (prefCode: number, checked: boolean, prefecture: Prefecture) => {
    if (checked) {
      setSelectedPrefCodes([...selectedPrefCodes, prefCode])
      setSelectedPrefectures([...selectedPrefectures, prefecture])
    } else {
      setSelectedPrefCodes(selectedPrefCodes.filter(code => code !== prefCode))
      setSelectedPrefectures(selectedPrefectures.filter(pref => pref.prefCode !== prefCode))
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-8">都道府県別人口推移</h1>
      <PopulationTypeSelector 
        selected={populationType} 
        onChange={setPopulationType} 
      />
      <PrefectureSelector onSelect={handlePrefectureSelect} />
      
      {isLoading && <div className="text-center mt-4">データを読み込み中...</div>}
      {error && <div className="text-red-500 text-center mt-4">{error}</div>}
      
      {populationData.length > 0 && (
        <PopulationGraph
          data={populationData}
          populationType={populationType}
          prefectures={selectedPrefectures}
        />
      )}
    </div>
  )
}

export default PopulationGraphPage
