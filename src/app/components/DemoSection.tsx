'use client'
import type { User } from '@supabase/supabase-js'
import MainApp from '../components/MainApp'
export default function Demo({ user }:{ user: User | null }){ return <MainApp user={user} /> }

