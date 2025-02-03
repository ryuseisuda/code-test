import { useState } from 'react'
import type { PopulationType } from '../types/population'

export const usePopulationType = () => {
  const [populationType, setPopulationType] = useState<PopulationType>('総人口')

  return {
    populationType,
    handlePopulationTypeChange: setPopulationType,
  }
}
