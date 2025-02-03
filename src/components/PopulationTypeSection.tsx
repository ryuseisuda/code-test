import { FC } from 'react'
import { PopulationTypeSelector } from './PopulationTypeSelector'
import type { PopulationType } from '../types/population'

interface PopulationTypeSectionProps {
  selected: PopulationType
  onChange: (type: PopulationType) => void
}

export const PopulationTypeSection: FC<PopulationTypeSectionProps> = ({
  selected,
  onChange,
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        人口種別の選択
      </h2>
      <PopulationTypeSelector selected={selected} onChange={onChange} />
    </div>
  )
}
