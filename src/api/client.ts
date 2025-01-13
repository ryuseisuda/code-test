const API_ENDPOINT = 'https://yumemi-frontend-engineer-codecheck-api.vercel.app/api/v1'
const API_KEY = '8FzX5qLmN3wRtKjH7vCyP9bGdEaU4sYpT6cMfZnJ'

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