import { createContext } from 'react'
import type { Session, User } from '@supabase/supabase-js'

export interface AuthContextValue {
  user: User | null
  session: Session | null
  isHydrating: boolean
  errorMessage: string | null
  signIn: (params: { email: string; password: string }) => Promise<void>
  signUp: (params: { email: string; password: string }) => Promise<void>
  signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined)