import { FC } from 'react'
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
import { PopulationGraphProps } from '../types/population'
import { GRAPH_COLORS } from '../constants/population'

export const PopulationGraph: FC<PopulationGraphProps> = ({ 
  data, 
  populationType, 
  prefectures 
}) => {
  // データを整形
  const chartData = data.reduce((acc, prefData, index) => {
    const prefecture = prefectures[index]
    if (!prefecture) return acc

    const typeData = prefData.result.data.find(d => d.label === populationType)
    if (!typeData) return acc

    typeData.data.forEach(({ year, value }) => {
      const existingYear = acc.find(d => d.year === year)
      if (existingYear) {
        existingYear[prefecture.prefName] = value
      } else {
        acc.push({ year, [prefecture.prefName]: value })
      }
    })
    return acc
  }, [] as { year: number; [key: string]: number }[])

  if (chartData.length === 0) {
    return <div>データがありません</div>
  }

  return (
    <div className="w-full mt-8">
      <h2 className="text-2xl font-bold mb-4">{populationType}</h2>
      <div style={{ width: '100%', height: '400px' }}>
        <ResponsiveContainer>
          <LineChart
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="year" 
              label={{ 
                value: '年度', 
                position: 'bottom', 
                offset: -5 
              }}
            />
            <YAxis
              label={{ 
                value: '人口数', 
                angle: -90, 
                position: 'insideLeft',
                offset: -5
              }}
              tickFormatter={(value) => `${(value / 10000).toFixed(0)}万`}
            />
            <Tooltip 
              formatter={(value: number) => [`${value.toLocaleString()}人`]}
              labelFormatter={(label) => `${label}年`}
            />
            <Legend />
            {prefectures.map((prefecture, index) => (
              <Line
                key={prefecture.prefCode}
                type="monotone"
                dataKey={prefecture.prefName}
                stroke={GRAPH_COLORS[index % GRAPH_COLORS.length]}
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
} 