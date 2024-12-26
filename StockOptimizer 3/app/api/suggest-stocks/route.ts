import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextResponse } from 'next/server'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!)

export async function POST(req: Request) {
  try {
    const { riskLevel, capital } = await req.json()
    
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
    
    const prompt = `As an investment advisor, suggest 5 stocks that would be suitable for an investor with a risk tolerance level of ${riskLevel} out of 10 (where 1 is very conservative and 10 is very aggressive) and a capital of $${capital}. For each stock, provide:
    1. The stock symbol
    2. Company name
    3. A brief explanation of why it fits the risk profile
    4. An estimated risk score (1-10)
    5. A realistic current stock price

    Ensure that the total value of suggested stocks does not exceed the available capital of $${capital}.
    
    Respond with a valid JSON array of objects. Each object should have these exact properties: "symbol", "name", "explanation", "riskScore", and "price". Do not include any markdown formatting or JSON tags in your response. Example format:
    [
      {
        "symbol": "AAPL",
        "name": "Apple Inc.",
        "explanation": "Stable tech company with strong fundamentals",
        "riskScore": 4,
        "price": 150.25
      }
    ]`

    const result = await model.generateContent(prompt)
    const response = await result.response
    let text = response.text()
    
    try {
      // Remove any potential markdown formatting or JSON tags
      text = text.replace(/```json\n?|\n?```/g, '').trim()
      
      // Attempt to parse the JSON response
      const stockSuggestions = JSON.parse(text)
      
      // Validate the response structure
      if (!Array.isArray(stockSuggestions)) {
        throw new Error('Invalid response format: not an array')
      }

      // Validate each suggestion has required properties
      const validSuggestions = stockSuggestions.every(suggestion => 
        suggestion.symbol && 
        suggestion.name && 
        suggestion.explanation && 
        typeof suggestion.riskScore === 'number' &&
        typeof suggestion.price === 'number'
      )

      if (!validSuggestions) {
        throw new Error('Invalid response format: missing required properties')
      }

      // Ensure total value doesn't exceed capital
      const totalValue = stockSuggestions.reduce((sum, stock) => sum + stock.price, 0)
      if (totalValue > capital) {
        throw new Error('Total value of suggested stocks exceeds available capital')
      }

      return NextResponse.json(stockSuggestions)
    } catch (parseError) {
      console.error('Failed to parse AI response:', text)
      return NextResponse.json(
        { error: 'Invalid response from AI model' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Stock suggestion error:', error)
    return NextResponse.json(
      { error: 'Failed to generate stock suggestions' },
      { status: 500 }
    )
  }
}

