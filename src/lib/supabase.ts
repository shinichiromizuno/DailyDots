import { createClient } from '@supabase/supabase-js'

const normalizeSupabaseUrl = (value: string | undefined): string => {
  if (!value) {
    return ''
  }

  return value.trim().replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '')
}

const supabaseUrl = normalizeSupabaseUrl(import.meta.env.VITE_SUPABASE_URL)
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() ?? ''
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables are not configured yet.')
}

export const supabase = createClient(supabaseUrl || 'https://placeholder.supabase.co', supabaseAnonKey || 'placeholder-key')
