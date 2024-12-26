import { NextResponse } from 'next/server'

const PORTFOLIO_OPTIMIZER_API = 'https://api.portfoliooptimizer.io/v1'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { investmentAmount, riskLevel, frequency } = body

    // Call to Portfolio Optimizer API
    const response = await fetch(`${PORTFOLIO_OPTIMIZER_API}/optimize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.PORTFOLIO_OPTIMIZER_API_KEY}`
      },
      body: JSON.stringify({
        capital: investmentAmount,
        risk_tolerance: riskLevel / 10, // Convert 1-10 scale to 0-1
        investment_frequency: frequency,
        optimization_strategy: 'modern_portfolio_theory'
      })
    })

    if (!response.ok) {
      throw new Error('Portfolio optimization failed')
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Portfolio optimization error:', error)
    return NextResponse.json(
      { error: 'Failed to optimize portfolio' },
      { status: 500 }
    )
  }
}

