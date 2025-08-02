import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(request: Request) {
  try {
    const { ingredient } = await request.json()

    if (!ingredient) {
      return NextResponse.json({ error: 'Ingredient is required' }, { status: 400 })
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' })
    const prompt = `Is "${ingredient}" a food ingredient? Answer only with a single word: YES or NO.`
    
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text().trim().toUpperCase()

    const valid = text.includes('YES')

    return NextResponse.json({ valid })
  } catch (error) {
    console.error('Error in validation API:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
