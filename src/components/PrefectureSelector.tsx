import { FC, useEffect, useState } from 'react'
import { Prefecture } from '../types/api'
import { fetchPrefectures } from '../api/client'

type Props = {
  onSelect: (prefCode: number, checked: boolean, prefecture: Prefecture) => void
}

export const PrefectureSelector: FC<Props> = ({ onSelect }) => {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([])
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const getPrefectures = async () => {
      try {
        const data = await fetchPrefectures()
        setPrefectures(data.result)
      } catch (error) {
        setError(`都道府県データの取得に失敗しました: ${error}`)
      }
    }

    getPrefectures()
  }, [])

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  const handleChange = (pref: Prefecture, checked: boolean) => {
    onSelect(pref.prefCode, checked, pref)
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
      {prefectures.map((pref) => (
        <label key={pref.prefCode} className="flex items-center space-x-2">
          <input
            type="checkbox"
            onChange={(e) => handleChange(pref, e.target.checked)}
          />
          <span>{pref.prefName}</span>
        </label>
      ))}
    </div>
  )
} 