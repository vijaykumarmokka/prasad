'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { Loader2, Copy, Tags, Share2, Trash2 } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Stock {
  symbol: string
  currentPrice: number
  currentQuantity: number
  optimumQuantity: number
  totalValue: number
}

// 50 lines of dummy stock data
const dummyStocks: Stock[] = [
  { symbol: "SHAKTIPUMP", currentPrice: 967.30, currentQuantity: 322, optimumQuantity: 0, totalValue: 311470.60 },
  { symbol: "RESPONIND", currentPrice: 249.20, currentQuantity: 633, optimumQuantity: 0, totalValue: 157743.60 },
  { symbol: "JPPOWER", currentPrice: 18.58, currentQuantity: 0, optimumQuantity: 0, totalValue: 0 },
  { symbol: "DCMSRIND", currentPrice: 186.97, currentQuantity: 0, optimumQuantity: 0, totalValue: 0 },
  { symbol: "COCHINSHIP", currentPrice: 1466.90, currentQuantity: 41, optimumQuantity: 0, totalValue: 60142.90 },
  { symbol: "BSE", currentPrice: 5548.30, currentQuantity: 30, optimumQuantity: 179, totalValue: 166449.00 },
  { symbol: "DOLATALGO", currentPrice: 126.68, currentQuantity: 0, optimumQuantity: 0, totalValue: 0 },
  { symbol: "JBMA", currentPrice: 1663.35, currentQuantity: 160, optimumQuantity: 0, totalValue: 266136.00 },
  { symbol: "TARIL", currentPrice: 1080.15, currentQuantity: 625, optimumQuantity: 885, totalValue: 675093.75 },
  { symbol: "BHARATFORG", currentPrice: 1299.20, currentQuantity: 102, optimumQuantity: 0, totalValue: 132518.40 },
  { symbol: "GEOJITFSL", currentPrice: 114.64, currentQuantity: 0, optimumQuantity: 0, totalValue: 0 },
  { symbol: "RELIANCE", currentPrice: 2543.75, currentQuantity: 150, optimumQuantity: 200, totalValue: 381562.50 },
  { symbol: "TCS", currentPrice: 3678.90, currentQuantity: 80, optimumQuantity: 100, totalValue: 294312.00 },
  { symbol: "HDFCBANK", currentPrice: 1678.45, currentQuantity: 200, optimumQuantity: 150, totalValue: 335690.00 },
  { symbol: "INFY", currentPrice: 1456.80, currentQuantity: 120, optimumQuantity: 180, totalValue: 174816.00 },
  { symbol: "ICICIBANK", currentPrice: 987.65, currentQuantity: 300, optimumQuantity: 250, totalValue: 296295.00 },
  { symbol: "BHARTIARTL", currentPrice: 876.50, currentQuantity: 180, optimumQuantity: 220, totalValue: 157770.00 },
  { symbol: "HINDUNILVR", currentPrice: 2567.90, currentQuantity: 90, optimumQuantity: 110, totalValue: 231111.00 },
  { symbol: "ITC", currentPrice: 456.75, currentQuantity: 400, optimumQuantity: 350, totalValue: 182700.00 },
  { symbol: "SBIN", currentPrice: 654.30, currentQuantity: 250, optimumQuantity: 300, totalValue: 163575.00 },
  { symbol: "ASIANPAINT", currentPrice: 3245.60, currentQuantity: 70, optimumQuantity: 90, totalValue: 227192.00 },
  { symbol: "MARUTI", currentPrice: 9876.50, currentQuantity: 30, optimumQuantity: 40, totalValue: 296295.00 },
  { symbol: "TATASTEEL", currentPrice: 543.20, currentQuantity: 300, optimumQuantity: 250, totalValue: 162960.00 },
  { symbol: "WIPRO", currentPrice: 432.90, currentQuantity: 200, optimumQuantity: 180, totalValue: 86580.00 },
  { symbol: "AXISBANK", currentPrice: 876.40, currentQuantity: 150, optimumQuantity: 200, totalValue: 131460.00 },
  { symbol: "KOTAKBANK", currentPrice: 1765.30, currentQuantity: 100, optimumQuantity: 120, totalValue: 176530.00 },
  { symbol: "ULTRACEMCO", currentPrice: 8765.40, currentQuantity: 20, optimumQuantity: 30, totalValue: 175308.00 },
  { symbol: "BAJFINANCE", currentPrice: 6543.20, currentQuantity: 40, optimumQuantity: 50, totalValue: 261728.00 },
  { symbol: "HCLTECH", currentPrice: 1234.50, currentQuantity: 120, optimumQuantity: 150, totalValue: 148140.00 },
  { symbol: "SUNPHARMA", currentPrice: 987.60, currentQuantity: 150, optimumQuantity: 130, totalValue: 148140.00 },
  { symbol: "NESTLEIND", currentPrice: 21345.60, currentQuantity: 10, optimumQuantity: 15, totalValue: 213456.00 },
  { symbol: "TITAN", currentPrice: 2345.70, currentQuantity: 80, optimumQuantity: 100, totalValue: 187656.00 },
  { symbol: "ADANIENT", currentPrice: 2456.80, currentQuantity: 90, optimumQuantity: 70, totalValue: 221112.00 },
  { symbol: "POWERGRID", currentPrice: 234.50, currentQuantity: 500, optimumQuantity: 450, totalValue: 117250.00 },
  { symbol: "NTPC", currentPrice: 178.90, currentQuantity: 600, optimumQuantity: 550, totalValue: 107340.00 },
  { symbol: "ONGC", currentPrice: 187.60, currentQuantity: 550, optimumQuantity: 600, totalValue: 103180.00 },
  { symbol: "COALINDIA", currentPrice: 265.40, currentQuantity: 400, optimumQuantity: 450, totalValue: 106160.00 },
  { symbol: "TATAMOTORS", currentPrice: 654.30, currentQuantity: 200, optimumQuantity: 250, totalValue: 130860.00 },
  { symbol: "M&M", currentPrice: 1432.50, currentQuantity: 100, optimumQuantity: 120, totalValue: 143250.00 },
  { symbol: "BAJAJ-AUTO", currentPrice: 4567.80, currentQuantity: 50, optimumQuantity: 60, totalValue: 228390.00 },
  { symbol: "EICHERMOT", currentPrice: 3456.70, currentQuantity: 60, optimumQuantity: 70, totalValue: 207402.00 },
  { symbol: "BRITANNIA", currentPrice: 4567.80, currentQuantity: 40, optimumQuantity: 50, totalValue: 182712.00 },
  { symbol: "HINDPETRO", currentPrice: 345.60, currentQuantity: 300, optimumQuantity: 250, totalValue: 103680.00 },
  { symbol: "BPCL", currentPrice: 432.90, currentQuantity: 250, optimumQuantity: 300, totalValue: 108225.00 },
  { symbol: "IOC", currentPrice: 123.45, currentQuantity: 800, optimumQuantity: 750, totalValue: 98760.00 },
  { symbol: "GAIL", currentPrice: 154.30, currentQuantity: 600, optimumQuantity: 650, totalValue: 92580.00 },
  { symbol: "TECHM", currentPrice: 1234.50, currentQuantity: 100, optimumQuantity: 120, totalValue: 123450.00 },
  { symbol: "LT", currentPrice: 2345.60, currentQuantity: 80, optimumQuantity: 100, totalValue: 187648.00 },
  { symbol: "ADANIPORTS", currentPrice: 876.50, currentQuantity: 150, optimumQuantity: 180, totalValue: 131475.00 },
  { symbol: "DRREDDY", currentPrice: 5678.90, currentQuantity: 30, optimumQuantity: 40, totalValue: 170367.00 },
  { symbol: "CIPLA", currentPrice: 987.60, currentQuantity: 120, optimumQuantity: 150, totalValue: 118512.00 }
]

export default function PortfolioOptimizer() {
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [showOptimization, setShowOptimization] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { toast } = useToast()

  const handleOptimize = async () => {
    setIsOptimizing(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      setShowOptimization(true)
      
      toast({
        title: "Portfolio Optimized",
        description: "Your portfolio has been analyzed and optimized.",
      })
    } catch (error) {
      console.error('Portfolio optimization failed:', error)
      toast({
        title: "Optimization Failed",
        description: "Failed to optimize your portfolio. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsOptimizing(false)
    }
  }

  const filteredStocks = dummyStocks.filter(stock =>
    stock.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (!showOptimization) {
    return (
      <Button onClick={handleOptimize} disabled={isOptimizing}>
        {isOptimizing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Optimizing...
          </>
        ) : (
          'Optimize Portfolio'
        )}
      </Button>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Mojo Stocks Optimised</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Copy className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Tags className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button onClick={handleOptimize} className="bg-orange-500 hover:bg-orange-600">
            Optimize
          </Button>
        </div>
      </div>

      <Input
        placeholder="Search stocks..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="max-w-sm"
      />

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Symbol</TableHead>
              <TableHead className="text-right">Current Price (₹)</TableHead>
              <TableHead className="text-right">Current Quantity</TableHead>
              <TableHead className="text-right">Optimum Quantity</TableHead>
              <TableHead className="text-right">Total Value (₹)</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStocks.map((stock) => (
              <TableRow key={stock.symbol}>
                <TableCell className="font-medium">{stock.symbol}</TableCell>
                <TableCell className="text-right">
                  {stock.currentPrice.toFixed(2)}
                </TableCell>
                <TableCell className="text-right">
                  {stock.currentQuantity}
                </TableCell>
                <TableCell className={`text-right ${
                  stock.optimumQuantity > stock.currentQuantity 
                    ? 'bg-green-50' 
                    : stock.optimumQuantity < stock.currentQuantity 
                    ? 'bg-red-50' 
                    : ''
                }`}>
                  {stock.optimumQuantity}
                </TableCell>
                <TableCell className="text-right">
                  {stock.totalValue.toFixed(2)}
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

