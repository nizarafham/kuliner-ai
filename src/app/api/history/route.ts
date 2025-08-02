import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async get(name: string) {
          return (await cookieStore).get(name)?.value
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { ingredient, province, recipeName, recipeResult } = await request.json()

    const { data, error } = await supabase
      .from('histories')
      .insert([
        {
          user_id: user.id,
          ingredient,
          province,
          recipe_name: recipeName,
          recipe_result: recipeResult,
        },
      ])

    if (error) {
      throw error
    }

    return NextResponse.json({ message: 'History saved successfully', data })
  } catch (error) {
    console.error('Error saving history:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
