import { useState, useCallback } from 'react'
import type { Prefecture } from '../types/population'

export const useSelectedPrefectures = () => {
  const [selectedPrefCodes, setSelectedPrefCodes] = useState<number[]>([])
  const [selectedPrefectures, setSelectedPrefectures] = useState<Prefecture[]>(
    []
  )

  const handlePrefectureSelect = useCallback(
    (prefCode: number, checked: boolean, prefecture: Prefecture) => {
      if (checked) {
        setSelectedPrefCodes(prev => [...prev, prefCode])
        setSelectedPrefectures(prev => [...prev, prefecture])
      } else {
        setSelectedPrefCodes(prev => prev.filter(code => code !== prefCode))
        setSelectedPrefectures(prev =>
          prev.filter(pref => pref.prefCode !== prefCode)
        )
      }
    },
    []
  )

  return {
    selectedPrefCodes,
    selectedPrefectures,
    handlePrefectureSelect,
  }
}
