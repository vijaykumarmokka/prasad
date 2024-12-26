import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"

export default function StockSelection() {
  const [watchList, setWatchList] = useState([
    { symbol: 'AAPL', name: 'Apple Inc.', allocation: 0 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', allocation: 0 },
    { symbol: 'MSFT', name: 'Microsoft Corporation', allocation: 0 }
  ])
  const [newStock, setNewStock] = useState('')
  const [totalCapital, setTotalCapital] = useState(10000)

  const addStock = () => {
    if (newStock && !watchList.some(stock => stock.symbol === newStock)) {
      setWatchList([...watchList, { symbol: newStock, name: 'New Stock', allocation: 0 }])
      setNewStock('')
    }
  }

  const updateAllocation = (index: number, allocation: number) => {
    const updatedWatchList = [...watchList]
    updatedWatchList[index].allocation = allocation
    setWatchList(updatedWatchList)
  }

  const optimizePortfolio = () => {
    // Placeholder for optimization logic
    console.log('Optimizing portfolio...')
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Your Watch List</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex mb-4">
          <Input
            type="text"
            value={newStock}
            onChange={(e) => setNewStock(e.target.value)}
            placeholder="Enter stock symbol"
            className="mr-2"
          />
          <Button onClick={addStock}>Add to Watch List</Button>
        </div>
        <div className="mb-4">
          <Input
            type="number"
            value={totalCapital}
            onChange={(e) => setTotalCapital(Number(e.target.value))}
            placeholder="Enter total capital"
          />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Symbol</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Allocation ($)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {watchList.map((stock, index) => (
              <TableRow key={stock.symbol}>
                <TableCell>{stock.symbol}</TableCell>
                <TableCell>{stock.name}</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={stock.allocation}
                    onChange={(e) => updateAllocation(index, Number(e.target.value))}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4">
          <Button onClick={optimizePortfolio}>Optimize Portfolio</Button>
        </div>
      </CardContent>
    </Card>
  )
}

