import { NextResponse } from 'next/server'
import { createSupabaseServer } from '@/utils/supabase/server'

export async function POST(request: Request){
  const supabase = createSupabaseServer()
  const { data: { user } } = await supabase.auth.getUser()
  if(!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { ingredient, province, recipeName, recipeResult } = await request.json()
  const { data, error } = await supabase.from('histories').insert([{ 
    user_id: user.id, ingredient, province, recipe_name: recipeName, recipe_result: recipeResult 
  }])
  if(error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ ok:true, data })
}