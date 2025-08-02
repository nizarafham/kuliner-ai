// app/components/AuthForm.tsx
'use client'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { ViewType } from '@supabase/auth-ui-shared'

interface AuthFormProps {
  viewType?: ViewType
}

export default function AuthForm({ viewType = 'sign_in' }: AuthFormProps) {
  const supabase = createClient()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth event:', event, session?.user?.email)
        
        if (event === 'SIGNED_IN' && session) {
          setLoading(true)
          setTimeout(() => {
            router.push('/')
            router.refresh()
          }, 500)
        }
        
        if (event === 'SIGNED_OUT') {
          router.refresh()
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [supabase.auth, router])

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Mengalihkan...</p>
      </div>
    )
  }

  return (
    <Auth
      supabaseClient={supabase}
      view={viewType}
      appearance={{ 
        theme: ThemeSupa,
        variables: {
          default: {
            colors: {
              brand: '#3b82f6',
              brandAccent: '#1d4ed8',
            }
          }
        },
        className: {
          container: 'w-full',
          button: 'w-full px-4 py-2 rounded-md font-medium',
          input: 'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
        }
      }}
      theme="light"
      showLinks={false}
      providers={['google']}
      redirectTo={`${typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'}/auth/callback`}
      localization={{
        variables: {
          sign_in: {
            email_label: 'Email',
            password_label: 'Password',
            button_label: 'Masuk',
            loading_button_label: 'Sedang masuk...',
            social_provider_text: 'Masuk dengan {{provider}}',
          },
          sign_up: {
            email_label: 'Email',
            password_label: 'Password',
            button_label: 'Daftar',
            loading_button_label: 'Sedang mendaftar...',
            social_provider_text: 'Daftar dengan {{provider}}',
            confirmation_text: 'Periksa email Anda untuk link konfirmasi',
          }
        }
      }}
    />
  )
}