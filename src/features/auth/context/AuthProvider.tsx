import type { Session } from '@supabase/supabase-js'
import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../../../lib/supabase'
import { authService } from '../services/authService'
import { AuthContext } from './AuthContext'

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [session, setSession] = useState<Session | null>(null)
  const [isHydrating, setIsHydrating] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const hydrateSession = async () => {
      setIsHydrating(true)

      try {
        const initialSession = await authService.getSession()

        if (isMounted) {
          setSession(initialSession)
          setErrorMessage(null)
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage(error instanceof Error ? error.message : 'Failed to initialize session.')
        }
      } finally {
        if (isMounted) {
          setIsHydrating(false)
        }
      }
    }

    void hydrateSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!isMounted) {
        return
      }

      setSession(nextSession)
      setErrorMessage(null)
      setIsHydrating(false)
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [])

  const signIn = async (params: { email: string; password: string }) => {
    setErrorMessage(null)
    await authService.signIn(params)
  }

  const signUp = async (params: { email: string; password: string }) => {
    setErrorMessage(null)
    await authService.signUp(params)
  }

  const signOut = async () => {
    setErrorMessage(null)
    await authService.signOut()
  }

  const value = useMemo(() => {
    return {
      user: session?.user ?? null,
      session,
      isHydrating,
      errorMessage,
      signIn,
      signUp,
      signOut,
    }
  }, [session, isHydrating, errorMessage])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}