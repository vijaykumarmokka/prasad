import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

interface Stock {
  id: string
  symbol: string
  name: string
  price: number
  change: number
}

interface StockListProps {
  stocks: Stock[]
  onAddToWishlist?: (stockId: string) => void
  showAddToWishlist?: boolean
}

export default function StockList({ stocks, onAddToWishlist, showAddToWishlist = true }: StockListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12">Select</TableHead>
          <TableHead>Symbol</TableHead>
          <TableHead>Name</TableHead>
          <TableHead className="text-right">Price</TableHead>
          <TableHead className="text-right">Change</TableHead>
          {showAddToWishlist && <TableHead>Action</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {stocks.map((stock) => (
          <TableRow key={stock.id}>
            <TableCell>
              <Checkbox />
            </TableCell>
            <TableCell className="font-medium">{stock.symbol}</TableCell>
            <TableCell>{stock.name}</TableCell>
            <TableCell className="text-right">${stock.price.toFixed(2)}</TableCell>
            <TableCell className={`text-right ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
            </TableCell>
            {showAddToWishlist && (
              <TableCell>
                <Button onClick={() => onAddToWishlist?.(stock.id)} size="sm">
                  Add to Wishlist
                </Button>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

