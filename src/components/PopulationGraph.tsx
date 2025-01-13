import { FC, useMemo } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { PopulationResponse } from '../types/population'

type Props = {
  data: PopulationResponse[]
  populationType: '総人口' | '年少人口' | '生産年齢人口' | '老年人口'
  prefectures: { prefCode: number; prefName: string }[]
}

export const PopulationGraph: FC<Props> = ({ data, populationType, prefectures }) => {
  const processedData = useMemo(() => {
    if (!data.length) return []

    const firstPrefData = data[0].result.data.find(d => d.label === populationType)
    if (!firstPrefData) return []

    return firstPrefData.data.map(yearData => {
      const yearEntry: { [key: string]: number | string } = {
        year: yearData.year,
      }

      data.forEach((prefData, index) => {
        const prefecture = prefectures[index]
        if (!prefecture) return

        const populationTypeData = prefData.result.data.find(d => d.label === populationType)
        if (!populationTypeData) return

        const matchingYearData = populationTypeData.data.find(d => d.year === yearData.year)
        if (matchingYearData) {
          yearEntry[prefecture.prefName] = matchingYearData.value
        }
      })

      return yearEntry
    })
  }, [data, populationType, prefectures])

  const colors = [
    '#8884d8', '#82ca9d', '#ffc658', '#ff7300', 
    '#0088FE', '#00C49F', '#FFBB28', '#FF8042'
  ]

  if (!processedData.length) {
    return <div>データがありません</div>
  }

  return (
    <div className="w-full h-[500px] mt-8">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={processedData}
          margin={{ top: 10, right: 30, left: 60, bottom: 30 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="year"
            label={{ value: '年度', position: 'bottom', offset: 0 }}
          />
          <YAxis
            label={{ 
              value: '人口数', 
              angle: -90,
              position: 'insideLeft',
              offset: -10
            }}
          />
          <Tooltip />
          <Legend verticalAlign="top" height={36}/>
          {prefectures.map((pref, index) => (
            <Line
              key={pref.prefCode}
              type="monotone"
              dataKey={pref.prefName}
              stroke={colors[index % colors.length]}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 8 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
} 