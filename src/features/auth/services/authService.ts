import type { Session } from '@supabase/supabase-js'
import { isSupabaseConfigured, supabase } from '../../../lib/supabase'

const assertSupabaseConfigured = (): void => {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase environment variables are not configured.')
  }
}

export const authService = {
  async getSession(): Promise<Session | null> {
    if (!isSupabaseConfigured) {
      return null
    }

    const { data, error } = await supabase.auth.getSession()

    if (error) {
      throw new Error(error.message)
    }

    return data.session
  },

  async signIn(params: { email: string; password: string }): Promise<void> {
    assertSupabaseConfigured()

    const { error } = await supabase.auth.signInWithPassword({
      email: params.email,
      password: params.password,
    })

    if (error) {
      throw new Error(error.message)
    }
  },

  async signUp(params: { email: string; password: string }): Promise<void> {
    assertSupabaseConfigured()

    const { error } = await supabase.auth.signUp({
      email: params.email,
      password: params.password,
    })

    if (error) {
      throw new Error(error.message)
    }
  },

  async signOut(): Promise<void> {
    if (!isSupabaseConfigured) {
      return
    }

    const { error } = await supabase.auth.signOut()

    if (error) {
      throw new Error(error.message)
    }
  },
}