const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT
const API_KEY = import.meta.env.VITE_API_KEY

export const fetchPrefectures = async () => {
  const response = await fetch(`${API_ENDPOINT}/prefectures`, {
    headers: {
      'X-API-KEY': API_KEY,
    },
  })
  
  if (!response.ok) {
    throw new Error('都道府県データの取得に失敗しました')
  }
  
  return response.json()
}

export const fetchPopulation = async (prefCode: number) => {
  const response = await fetch(
    `${API_ENDPOINT}/population/composition/perYear?prefCode=${prefCode}`,
    {
      headers: {
        'X-API-KEY': API_KEY,
      },
    }
  )
    
    console.log('response', response)

  if (!response.ok) {
    throw new Error(`人口データの取得に失敗しました: 都道府県コード ${prefCode}`)
  }

  return response.json()
}

// 複数の都道府県の人口データを一括取得
export const fetchPopulationBulk = async (prefCodes: number[]) => {
  try {
    const promises = prefCodes.map(prefCode => fetchPopulation(prefCode))
    const responses = await Promise.all(promises)
    return responses
  } catch (error) {
    throw new Error(`人口データの一括取得に失敗しました: ${error}`)
  }
} 