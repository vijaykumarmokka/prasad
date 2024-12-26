'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LineChart, Settings, TrendingUp } from 'lucide-react'
import StockSuggestions from '@/components/stock-suggestions'
import Link from 'next/link'

export default function Invest() {
  const [investmentType, setInvestmentType] = useState<'diy' | 'auto' | null>(null)

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Choose Your Investment Strategy</h1>
          <Link href="/dashboard">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2">
          <Card 
            className={`cursor-pointer transition-all hover:shadow-lg ${
              investmentType === 'diy' ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => setInvestmentType('diy')}
          >
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-blue-100 p-3 mb-4">
                <TrendingUp className="h-6 w-6 text-blue-500" />
              </div>
              <CardTitle>AI-Powered Stock Selection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 mb-4">Get personalized stock suggestions based on your risk tolerance and capital using AI.</p>
              <Button variant={investmentType === 'diy' ? 'default' : 'outline'} className="w-full">
                Select AI Advisor
              </Button>
            </CardContent>
          </Card>

          <Card 
            className={`cursor-pointer transition-all hover:shadow-lg ${
              investmentType === 'auto' ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => setInvestmentType('auto')}
          >
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-green-100 p-3 mb-4">
                <Settings className="h-6 w-6 text-green-500" />
              </div>
              <CardTitle>Auto-Investment</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 mb-4">Let our AI optimize your investments automatically based on your preferences.</p>
              <Button variant={investmentType === 'auto' ? 'default' : 'outline'} className="w-full">
                Select Auto
              </Button>
            </CardContent>
          </Card>
        </div>

        {investmentType && <StockSuggestions />}
      </div>
    </div>
  )
}

