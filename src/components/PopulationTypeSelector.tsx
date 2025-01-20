import { FC } from 'react'
import { POPULATION_TYPES } from '../constants/population'
import {
  PopulationType,
  PopulationTypeSelectorProps,
} from '../types/population'

export const PopulationTypeSelector: FC<PopulationTypeSelectorProps> = ({
  selected,
  onChange,
}) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center my-4">
      {POPULATION_TYPES.map(type => (
        <label key={type} className="flex items-center space-x-2">
          <input
            type="radio"
            name="populationType"
            value={type}
            checked={selected === type}
            onChange={e => onChange(e.target.value as PopulationType)}
          />
          <span>{type}</span>
        </label>
      ))}
    </div>
  )
}
