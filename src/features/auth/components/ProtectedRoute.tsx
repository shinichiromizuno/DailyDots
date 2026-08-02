import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export const ProtectedRoute = () => {
  const { user, isHydrating } = useAuth()
  const location = useLocation()

  if (isHydrating) {
    return (
      <div className="mx-auto flex min-h-[40vh] w-full max-w-5xl items-center justify-center px-4 text-sm font-semibold text-slate-600 sm:px-6">
        Checking your session...
      </div>
    )
  }

  if (!user) {
    const redirectTo = `${location.pathname}${location.search}${location.hash}`
    return <Navigate to="/auth" replace state={{ redirectTo }} />
  }

  return <Outlet />
}