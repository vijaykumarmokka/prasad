import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"

const watchListData = [
  { symbol: 'AAPL', name: 'Apple Inc.', allocation: 5000 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', allocation: 3000 },
  { symbol: 'MSFT', name: 'Microsoft Corporation', allocation: 2000 },
]

export default function WatchListSummary() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Watch List Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Symbol</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Allocation ($)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {watchListData.map((stock) => (
              <TableRow key={stock.symbol}>
                <TableCell>{stock.symbol}</TableCell>
                <TableCell>{stock.name}</TableCell>
                <TableCell>{stock.allocation.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

