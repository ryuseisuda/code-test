import { useState, useEffect } from 'react'
import { fetchPrefectures } from '../api/client'
import type { Prefecture } from '../types/population'

export const usePrefectures = () => {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const getPrefectures = async () => {
      setIsLoading(true)
      setError('')
      
      try {
        const data = await fetchPrefectures()
        setPrefectures(data.result)
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : '不明なエラー'
        setError(errorMessage)
      } finally {
        setIsLoading(false)
      }
    }

    void getPrefectures()
  }, [])

  return {
    prefectures,
    isLoading,
    error,
  }
} 