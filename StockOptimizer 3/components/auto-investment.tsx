'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from 'lucide-react'

export default function AutoInvestment() {
  const [riskLevel, setRiskLevel] = useState(5)
  const [investmentAmount, setInvestmentAmount] = useState(1000)
  const [frequency, setFrequency] = useState('monthly')
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleOptimize = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/optimize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          investmentAmount,
          riskLevel,
          frequency,
        }),
      })

      if (!response.ok) {
        throw new Error('Optimization failed')
      }

      const data = await response.json()
      
      toast({
        title: "Portfolio Optimized",
        description: "Your investment strategy has been created successfully.",
      })

      // Handle the optimized portfolio data
      console.log('Optimized portfolio:', data)
    } catch (error) {
      toast({
        title: "Optimization Failed",
        description: "There was an error optimizing your portfolio. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Auto-Investment Setup</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Investment Amount</h3>
            <Input 
              type="number" 
              placeholder="Enter amount" 
              value={investmentAmount}
              onChange={(e) => setInvestmentAmount(Number(e.target.value))}
              min={0}
            />
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Risk Tolerance</h3>
            <Slider
              value={[riskLevel]}
              onValueChange={(value) => setRiskLevel(value[0])}
              max={10}
              step={1}
              className="mb-2"
            />
            <div className="flex justify-between mt-2">
              <span className="text-sm text-muted-foreground">Low Risk</span>
              <span className="text-sm text-muted-foreground">High Risk</span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Investment Frequency</h3>
            <Select value={frequency} onValueChange={setFrequency}>
              <SelectTrigger>
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="biweekly">Bi-weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            className="w-full" 
            onClick={handleOptimize}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Optimizing...
              </>
            ) : (
              'Start Auto-Investment'
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

