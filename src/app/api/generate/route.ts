import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { z } from 'zod'
import { env } from '../../../utils/env'

const Body = z.object({
  ingredient: z.string().min(2, 'Bahan terlalu pendek'),
  province: z.string().default('Semua')
})

const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY!)

export async function POST(req: Request){
  try{
    const { ingredient, province } = Body.parse(await req.json())
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' })
    const provinceQuery = province === 'Semua' ? 'Indonesia' : province

    const prompt = `Berikan satu resep masakan khas Nusantara dari provinsi ${provinceQuery} dengan bahan utama ${ingredient}. Pilih hidangan tradisional yang benar‑benar populer di provinsi tersebut; sebutkan nama masakan sesuai penamaan daerahnya.

    Pastikan resep menggunakan bumbu dan rempah yang lazim dalam kuliner Indonesia (misal bawang merah, bawang putih, lengkuas, serai, daun jeruk) dan teknik memasak yang autentik. Jika tidak ada hidangan lokal yang menggunakan ${ingredient}, berikan resep umum Indonesia yang tetap mencerminkan cita rasa Nusantara.

    Outputkan *hanya* JSON dengan keys: 
    - recipeName (string), 
    - ingredients (string[]; tiap item sudah mengandung takaran realistis untuk 2 porsi, jelaskan juga bentuk dan ukuran bahan jika relevan), 
    - steps (string[]; berisi langkah-langkah memasak yang lengkap, mulai dari menyiapkan bumbu hingga penyajian, dengan urutan kronologis).

    Jangan sertakan markdown, penjelasan, atau teks lain di luar JSON.`

    const res = await model.generateContent(prompt)
    const raw = res.response.text()
    const jsonStr = raw.replace(/```json/gi,'').replace(/```/g,'').trim()

    let data: unknown
    try{ data = JSON.parse(jsonStr) }catch{
      return NextResponse.json({ error: 'Format resep tidak valid, coba lagi.' }, { status: 502 })
    }

    return NextResponse.json(data)
  }catch(err: any){
    return NextResponse.json({ error: err?.message ?? 'Gagal memproses permintaan.' }, { status: 400 })
  }
}