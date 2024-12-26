'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { AlertCircle, Loader2 } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"

interface StockSuggestion {
  symbol: string
  name: string
  explanation: string
  riskScore: number
  price: number
}

export default function StockSuggestions() {
  const [riskLevel, setRiskLevel] = useState<number[]>([5])
  const [capital, setCapital] = useState(10000)
  const [isLoading, setIsLoading] = useState(false)
  const [suggestions, setSuggestions] = useState<StockSuggestion[]>([])
  const [selectedStocks, setSelectedStocks] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const getSuggestions = async () => {
    try {
      setIsLoading(true)
      setError(null)
      setSuggestions([])
      setSelectedStocks([])

      const response = await fetch('/api/suggest-stocks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ riskLevel: riskLevel[0], capital }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get suggestions')
      }

      if (!Array.isArray(data)) {
        throw new Error('Invalid response format')
      }

      setSuggestions(data)
      
      toast({
        title: "Suggestions Generated",
        description: "AI has generated stock suggestions based on your risk profile and capital.",
      })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate stock suggestions'
      setError(errorMessage)
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleStockSelection = (symbol: string) => {
    setSelectedStocks(prev => 
      prev.includes(symbol) 
        ? prev.filter(s => s !== symbol)
        : [...prev, symbol]
    )
  }

  const handleAutoInvest = async () => {
    try {
      setIsLoading(true)
      // Implement auto-investment logic here
      // This is a placeholder for the actual API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast({
        title: "Auto-Investment Completed",
        description: `Invested in ${selectedStocks.join(', ')}`,
      })
    } catch (error) {
      toast({
        title: "Auto-Investment Failed",
        description: "There was an error processing your investment.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>AI Stock Suggestions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Available Capital ($)</h3>
            <Input
              type="number"
              value={capital}
              onChange={(e) => setCapital(Number(e.target.value))}
              className="mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">Risk Tolerance</h3>
            <Slider
              value={riskLevel}
              onValueChange={setRiskLevel}
              max={10}
              step={1}
              className="mb-2"
            />
            <div className="flex justify-between mt-2">
              <span className="text-sm text-muted-foreground">Conservative</span>
              <span className="text-sm text-muted-foreground">Aggressive</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Current Risk Level: {riskLevel[0]}/10
            </p>
          </div>

          <Button 
            onClick={getSuggestions}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Suggestions...
              </>
            ) : (
              'Get AI Stock Suggestions'
            )}
          </Button>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {error}
              </AlertDescription>
            </Alert>
          )}

          {suggestions.length > 0 && (
            <div className="mt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Select</TableHead>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Risk Score</TableHead>
                    <TableHead>Price ($)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {suggestions.map((stock) => (
                    <TableRow key={stock.symbol}>
                      <TableCell>
                        <Checkbox
                          checked={selectedStocks.includes(stock.symbol)}
                          onCheckedChange={() => handleStockSelection(stock.symbol)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{stock.symbol}</TableCell>
                      <TableCell>{stock.name}</TableCell>
                      <TableCell>{stock.riskScore}/10</TableCell>
                      <TableCell>{stock.price.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <div className="mt-4 space-y-4">
                {suggestions.map((stock) => (
                  <Card key={stock.symbol}>
                    <CardContent className="pt-4">
                      <h4 className="font-semibold mb-2">{stock.symbol} - {stock.name}</h4>
                      <p className="text-sm text-muted-foreground">{stock.explanation}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Button 
                onClick={handleAutoInvest}
                disabled={isLoading || selectedStocks.length === 0}
                className="w-full mt-4"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing Investment...
                  </>
                ) : (
                  'Auto-Invest in Selected Stocks'
                )}
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

