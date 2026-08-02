import { useState } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useAuth } from '../features/auth/hooks/useAuth'

type AuthMode = 'signin' | 'signup'

interface AuthFormInput {
  email: string
  password: string
}

interface AuthLocationState {
  redirectTo?: string
}

const getModeLabel = (mode: AuthMode): string => {
  return mode === 'signin' ? 'Sign in' : 'Create account'
}

export const AuthPage = () => {
  const [mode, setMode] = useState<AuthMode>('signin')
  const [localErrorMessage, setLocalErrorMessage] = useState<string | null>(null)
  const { user, isHydrating, errorMessage, signIn, signUp } = useAuth()
  const location = useLocation()
  const locationState = location.state as AuthLocationState | null
  const redirectTo = locationState?.redirectTo ?? '/'

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormInput>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  if (isHydrating) {
    return (
      <div className="mx-auto flex min-h-[60vh] w-full max-w-xl items-center justify-center px-4 text-sm font-semibold text-slate-600 sm:px-6">
        Loading authentication...
      </div>
    )
  }

  if (user) {
    return <Navigate to={redirectTo} replace />
  }

  const onSubmit = async (input: AuthFormInput) => {
    setLocalErrorMessage(null)

    try {
      if (mode === 'signin') {
        await signIn(input)
        return
      }

      await signUp(input)
    } catch (error) {
      setLocalErrorMessage(error instanceof Error ? error.message : 'Authentication failed.')
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 via-amber-50 to-emerald-50 px-4 py-10 sm:px-6">
      <section className="mx-auto w-full max-w-xl space-y-5 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur sm:p-8">
        <header className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">DailyDots</p>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">Welcome back</h1>
          <p className="text-sm text-slate-600">Sign in to keep your journals private and synced across devices.</p>
        </header>

        <div className="inline-flex rounded-2xl border border-slate-300 bg-slate-50 p-1">
          <button
            type="button"
            onClick={() => setMode('signin')}
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${
              mode === 'signin' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sign in
          </button>
          <button
            type="button"
            onClick={() => setMode('signup')}
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${
              mode === 'signup' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Create account
          </button>
        </div>

        {errorMessage || localErrorMessage ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {localErrorMessage ?? errorMessage}
          </div>
        ) : null}

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <label className="space-y-1">
            <span className="block text-sm font-semibold text-slate-700">Email</span>
            <input
              type="email"
              autoComplete="email"
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none transition focus-visible:border-cyan-500 focus-visible:ring-2 focus-visible:ring-cyan-300"
              {...register('email', {
                required: 'Email is required.',
              })}
            />
            {errors.email ? <span className="text-sm text-red-600">{errors.email.message}</span> : null}
          </label>

          <label className="space-y-1">
            <span className="block text-sm font-semibold text-slate-700">Password</span>
            <input
              type="password"
              autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none transition focus-visible:border-cyan-500 focus-visible:ring-2 focus-visible:ring-cyan-300"
              {...register('password', {
                required: 'Password is required.',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters.',
                },
              })}
            />
            {errors.password ? <span className="text-sm text-red-600">{errors.password.message}</span> : null}
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center rounded-xl bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 disabled:cursor-not-allowed disabled:bg-cyan-300"
          >
            {isSubmitting ? 'Submitting...' : getModeLabel(mode)}
          </button>
        </form>

        <p className="text-xs text-slate-500">
          By continuing, your journals are stored per account with Supabase Auth and Row Level Security.
        </p>

        <p className="text-xs text-slate-500">
          Back to app: <Link to="/" className="font-semibold text-cyan-700 underline underline-offset-2">Home</Link>
        </p>
      </section>
    </main>
  )
}