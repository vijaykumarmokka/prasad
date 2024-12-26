'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import StockList from '@/components/stock-list'
import PortfolioOptimizer from '@/components/portfolio-optimizer'
import { LineChart, ResponsiveContainer, Line, XAxis, YAxis, Tooltip } from 'recharts'
import { ArrowUpRight, ArrowDownRight, TrendingUp, Wallet, AlertTriangle, Search } from 'lucide-react'
import StockSuggestions from '@/components/stock-suggestions'

// Dummy stock data
const dummyStocks = [
  { id: '1', symbol: 'AAPL', name: 'Apple Inc.', price: 185.64, change: 2.34 },
  { id: '2', symbol: 'MSFT', name: 'Microsoft Corp.', price: 374.58, change: -1.23 },
  { id: '3', symbol: 'GOOGL', name: 'Alphabet Inc.', price: 134.99, change: 0.45 },
  { id: '4', symbol: 'AMZN', name: 'Amazon.com Inc.', price: 154.07, change: 1.67 },
  { id: '5', symbol: 'META', name: 'Meta Platforms Inc.', price: 350.36, change: 3.21 },
  { id: '6', symbol: 'TSLA', name: 'Tesla Inc.', price: 248.48, change: -2.78 },
  { id: '7', symbol: 'NVDA', name: 'NVIDIA Corp.', price: 495.22, change: 4.56 },
  { id: '8', symbol: 'JPM', name: 'JPMorgan Chase & Co.', price: 167.40, change: 0.89 },
  { id: '9', symbol: 'V', name: 'Visa Inc.', price: 264.17, change: 1.12 },
  { id: '10', symbol: 'WMT', name: 'Walmart Inc.', price: 157.89, change: -0.34 },
  // Add more dummy stocks as needed
]

// Portfolio stocks
const portfolioStocks = [
  { id: '1', symbol: 'AAPL', name: 'Apple Inc.', quantity: 10, value: 1856.40 },
  { id: '2', symbol: 'MSFT', name: 'Microsoft Corp.', quantity: 5, value: 1872.90 },
  { id: '3', symbol: 'GOOGL', name: 'Alphabet Inc.', quantity: 8, value: 1079.92 },
]

const performanceData = [
  { date: 'Jan', value: 1000 },
  { date: 'Feb', value: 1200 },
  { date: 'Mar', value: 1100 },
  { date: 'Apr', value: 1400 },
  { date: 'May', value: 1300 },
  { date: 'Jun', value: 1600 },
]

export default function Dashboard() {
  const [stocks, setStocks] = useState(dummyStocks)
  const [searchQuery, setSearchQuery] = useState('')
  const [wishlists, setWishlists] = useState([
    { id: 1, name: 'Wishlist 1', stocks: [] },
    { id: 2, name: 'Wishlist 2', stocks: [] },
    { id: 3, name: 'Wishlist 3', stocks: [] },
    { id: 4, name: 'Wishlist 4', stocks: [] },
    { id: 5, name: 'Wishlist 5', stocks: [] },
  ])
  const [showAiSuggestions, setShowAiSuggestions] = useState(false)
  const { toast } = useToast()

  const filteredStocks = stocks.filter(stock =>
    stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    stock.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const addToWishlist = (stockId: string, wishlistId: number) => {
    setWishlists(wishlists.map(wishlist => 
      wishlist.id === wishlistId
        ? { ...wishlist, stocks: [...wishlist.stocks, stockId] }
        : wishlist
    ))
    toast({
      title: "Stock Added",
      description: `Stock added to ${wishlists.find(w => w.id === wishlistId)?.name}`,
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Investment Dashboard</h1>
      
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Portfolio Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
                  <Wallet className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$12,345.67</div>
                  <div className="flex items-center text-sm text-green-600">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    +2.5%
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Return</CardTitle>
                  <TrendingUp className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+$1,234.56</div>
                  <div className="flex items-center text-sm text-red-600">
                    <ArrowDownRight className="h-4 w-4 mr-1" />
                    -0.8% today
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Risk Level</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Moderate</div>
                  <div className="text-sm text-gray-500">Balanced risk-return</div>
                </CardContent>
              </Card>
            </div>
            <div className="mt-6">
              <PortfolioOptimizer />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Portfolio Holdings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {portfolioStocks.map((stock) => (
                <div key={stock.id} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">{stock.symbol}</div>
                    <div className="text-sm text-gray-500">{stock.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">${stock.value.toFixed(2)}</div>
                    <div className="text-sm text-gray-500">{stock.quantity} shares</div>
                  </div>
                </div>
              ))}
              <Button 
                className="w-full mt-4"
                onClick={() => setShowAiSuggestions(true)}
              >
                Get AI Stock Suggestions
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {showAiSuggestions && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>AI Stock Suggestions</CardTitle>
          </CardHeader>
          <CardContent>
            <StockSuggestions />
          </CardContent>
        </Card>
      )}
      
      <Card>
        <CardHeader>
          <CardTitle>Stocks and Wishlists</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search stocks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
          <Tabs defaultValue="all-stocks">
            <TabsList>
              <TabsTrigger value="all-stocks">All Stocks</TabsTrigger>
              {wishlists.map(wishlist => (
                <TabsTrigger key={wishlist.id} value={`wishlist-${wishlist.id}`}>
                  {wishlist.name}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="all-stocks">
              <StockList
                stocks={filteredStocks}
                onAddToWishlist={(stockId) => {
                  const wishlistId = prompt('Enter wishlist number (1-5):')
                  if (wishlistId && parseInt(wishlistId) >= 1 && parseInt(wishlistId) <= 5) {
                    addToWishlist(stockId, parseInt(wishlistId))
                  }
                }}
              />
            </TabsContent>
            {wishlists.map(wishlist => (
              <TabsContent key={wishlist.id} value={`wishlist-${wishlist.id}`}>
                <StockList
                  stocks={stocks.filter(stock => wishlist.stocks.includes(stock.id))}
                  showAddToWishlist={false}
                />
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Portfolio Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#3b82f6"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

