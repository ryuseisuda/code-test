import { FC, useMemo } from 'react'
import { PopulationTypeSection } from '../components/PopulationTypeSection'
import { PrefectureSelector } from '../components/PrefectureSelector'
import { PopulationGraph } from '../components/PopulationGraph'
import { useSelectedPrefectures } from '../hooks/useSelectedPrefectures'
import { usePopulationType } from '../hooks/usePopulationType'
import { usePopulationData } from '../hooks/usePopulationData'

export const PopulationGraphPage: FC = () => {
  const { selectedPrefCodes, selectedPrefectures, handlePrefectureSelect } =
    useSelectedPrefectures()

  const { populationType, handlePopulationTypeChange } = usePopulationType()

  const { populationData, isLoading, error } =
    usePopulationData(selectedPrefCodes)

  // グラフデータの計算をメモ化
  const memoizedData = useMemo(() => {
    if (!populationData.length) return []
    // データ加工ロジック
    return populationData
  }, [populationData])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
          都道府県別人口推移グラフ
        </h1>

        <PopulationTypeSection
          selected={populationType}
          onChange={handlePopulationTypeChange}
        />

        <PrefectureSelector onSelect={handlePrefectureSelect} />

        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {!isLoading && !error && memoizedData.length > 0 && (
          <div className="bg-white rounded-lg shadow p-6">
            <PopulationGraph
              data={memoizedData}
              populationType={populationType}
              prefectures={selectedPrefectures}
            />
          </div>
        )}
      </div>
    </div>
  )
}
