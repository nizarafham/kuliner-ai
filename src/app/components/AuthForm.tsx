'use client'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClient } from '@/utils/supabase/client'

export default function AuthForm() {
  const supabase = createClient()

  return (
    <div className="flex justify-center items-center h-screen">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
            <Auth
                supabaseClient={supabase}
                appearance={{ theme: ThemeSupa }}
                theme="dark"
                showLinks={false}
                providers={['google']}
                redirectTo="http://localhost:3000/auth/callback"
            />
        </div>
    </div>

  )
}
