import { FC, useState, useEffect } from 'react'
import { PrefectureSelector } from '../components/PrefectureSelector'
import { PopulationTypeSelector } from '../components/PopulationTypeSelector'
import { fetchPopulationBulk } from '../api/client'
import { PopulationResponse } from '../types/api'

type PopulationType = '総人口' | '年少人口' | '生産年齢人口' | '老年人口'

const PopulationGraphPage: FC = () => {
  const [selectedPrefCodes, setSelectedPrefCodes] = useState<number[]>([])
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
        setError('人口データの取得に失敗しました')
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [selectedPrefCodes]) // 選択された都道府県が変更されたときにデータを取得

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
      <PopulationTypeSelector 
        selected={populationType} 
        onChange={setPopulationType} 
      />
      <PrefectureSelector onSelect={handlePrefectureSelect} />
      
      {isLoading && <div className="text-center mt-4">データを読み込み中...</div>}
      {error && <div className="text-red-500 text-center mt-4">{error}</div>}
      
      {/* ここに後でグラフコンポーネントを追加 */}
      {populationData.length > 0 && (
        <div className="mt-4">
          <pre className="text-xs">
            {JSON.stringify(populationData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}

export default PopulationGraphPage
