import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../features/auth/hooks/useAuth'

const linkStyle = ({ isActive }: { isActive: boolean }): string => {
  if (isActive) {
    return 'rounded-full bg-cyan-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm'
  }

  return 'rounded-full px-3 py-1.5 text-sm font-semibold text-slate-700 transition hover:bg-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300'
}

export const AppShell = () => {
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-sky-50 to-emerald-50 text-slate-900">
      <header className="border-b border-white/60 bg-white/70 backdrop-blur">
        <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">DailyDots</p>
            <h1 className="text-xl font-black tracking-tight text-slate-900 sm:text-2xl">Daily Journal</h1>
            <p className="mt-1 text-xs text-slate-500">{user?.email ?? 'Signed in user'}</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <nav aria-label="Primary" className="flex flex-wrap items-center gap-2">
              <NavLink to="/" className={linkStyle} end>
                Home
              </NavLink>
              <NavLink to="/journals" className={linkStyle}>
                My Journals
              </NavLink>
              <NavLink to="/journals/new" className={linkStyle}>
                Add New Journal
              </NavLink>
            </nav>
            <button
              type="button"
              onClick={() => {
                void handleSignOut()
              }}
              className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
        <Outlet />
      </main>
    </div>
  )
}
