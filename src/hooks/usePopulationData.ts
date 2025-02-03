import { useState, useEffect } from 'react'
import { fetchPopulationBulk } from '../api/client'
import type { PopulationResponse } from '../types/population'

export const usePopulationData = (selectedPrefCodes: number[]) => {
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
        const errorMessage = err instanceof Error ? err.message : '不明なエラー'
        setError(errorMessage)
      } finally {
        setIsLoading(false)
      }
    }

    void fetchData()
  }, [selectedPrefCodes])

  return {
    populationData,
    isLoading,
    error,
  }
}
