import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { date: "Jan", value: 100 },
  { date: "Feb", value: 120 },
  { date: "Mar", value: 115 },
  { date: "Apr", value: 130 },
  { date: "May", value: 140 },
  { date: "Jun", value: 135 },
  { date: "Jul", value: 150 },
]

export default function PerformanceChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  )
}

