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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
          都道府県別人口推移グラフ
        </h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            人口種別の選択
          </h2>
          <PopulationTypeSelector 
            selected={populationType} 
            onChange={setPopulationType} 
          />
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            都道府県の選択
          </h2>
          <PrefectureSelector onSelect={handlePrefectureSelect} />
        </div>

        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {!isLoading && !error && populationData.length > 0 && (
          <div className="bg-white rounded-lg shadow p-6">
            <PopulationGraph
              data={populationData}
              populationType={populationType}
              prefectures={selectedPrefectures}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default PopulationGraphPage
