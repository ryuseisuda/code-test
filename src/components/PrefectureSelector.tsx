import { FC, useEffect, useState } from 'react'
import { Prefecture, PrefectureSelectorProps } from '../types/population'
import { fetchPrefectures } from '../api/client'

export const PrefectureSelector: FC<PrefectureSelectorProps> = ({
  onSelect,
}) => {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([])
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const getPrefectures = async () => {
      try {
        const data = await fetchPrefectures()
        setPrefectures(data.result)
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : '不明なエラー'
        setError(`都道府県データの取得に失敗しました: ${errorMessage}`)
      }
    }

    void getPrefectures()
  }, [])

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
      {prefectures.map(pref => (
        <label key={pref.prefCode} className="flex items-center space-x-2">
          <input
            type="checkbox"
            onChange={e => onSelect(pref.prefCode, e.target.checked, pref)}
          />
          <span>{pref.prefName}</span>
        </label>
      ))}
    </div>
  )
}
