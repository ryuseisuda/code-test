import { FC } from 'react'
import { PrefectureSelectorProps } from '../types/population'
import { usePrefectures } from '../hooks/usePrefectures'

export const PrefectureSelector: FC<PrefectureSelectorProps> = ({
  onSelect,
}) => {
  const { prefectures, isLoading, error } = usePrefectures()

  if (isLoading) {
    return <div>読み込み中...</div>
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 bg-white rounded-lg shadow p-6 mb-8">
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
