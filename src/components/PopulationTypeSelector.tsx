import { FC } from 'react'

type PopulationType = '総人口' | '年少人口' | '生産年齢人口' | '老年人口'

type Props = {
  selected: PopulationType
  onChange: (type: PopulationType) => void
}

export const PopulationTypeSelector: FC<Props> = ({ selected, onChange }) => {
  const types: PopulationType[] = ['総人口', '年少人口', '生産年齢人口', '老年人口']

  return (
    <div className="flex flex-wrap gap-4 justify-center my-4">
      {types.map((type) => (
        <label key={type} className="flex items-center space-x-2">
          <input
            type="radio"
            name="populationType"
            value={type}
            checked={selected === type}
            onChange={(e) => onChange(e.target.value as PopulationType)}
          />
          <span>{type}</span>
        </label>
      ))}
    </div>
  )
} 