import { createSupabaseServer } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const supabase = await createSupabaseServer()

  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    await supabase.auth.signOut()
  }

  // Revalidate a specific path to reflect the user's logged-out state
  revalidatePath('/', 'layout')

  return NextResponse.redirect(new URL('/login', req.url), {
    status: 302,
  })
}
