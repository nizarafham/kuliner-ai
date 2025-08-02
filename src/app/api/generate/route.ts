import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(request: Request) {
  try {
    const { ingredient, province } = await request.json()

    if (!ingredient || !province) {
      return NextResponse.json({ error: 'Ingredient and province are required' }, { status: 400 })
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' })
    const provinceQuery = province === 'Semua' ? 'Indonesia' : province
    const prompt = `Berikan satu resep masakan khas dari ${provinceQuery} berbahan dasar ${ingredient}. Jika tidak ada, berikan resep umum dari Indonesia. Format jawaban sebagai JSON object dengan key: "recipeName", "ingredients" (sebuah array string, masing-masing item berisi takaran untuk 2 porsi), dan "steps" (sebuah array string).`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text().replace(/```json/g, '').replace(/```/g, '');


    try {
        const recipeJson = JSON.parse(text);
        return NextResponse.json(recipeJson);
    } catch (e) {
        console.error("Failed to parse Gemini's response as JSON:", text);
        return NextResponse.json({ error: "Failed to get a valid recipe format." }, { status: 500 });
    }

  } catch (error) {
    console.error('Error in generation API:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
