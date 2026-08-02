import { useEffect } from 'react'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import { AppShell } from './components/AppShell'
import { ProtectedRoute } from './features/auth/components/ProtectedRoute'
import { AuthProvider } from './features/auth/context/AuthProvider'
import { useAuth } from './features/auth/hooks/useAuth'
import { useJournalEntries } from './features/journal/hooks/useJournalEntries'
import type { JournalInput } from './features/journal/types/journal'
import { AddJournalPage } from './pages/AddJournalPage'
import { AuthPage } from './pages/AuthPage'
import { HomePage } from './pages/HomePage'
import { MyJournalsPage } from './pages/MyJournalsPage'

const AppRoutes = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { entries, latestEntry, totalCount, isLoading, errorMessage, saveEntry, deleteEntry } = useJournalEntries({
    enabled: Boolean(user),
  })

  useEffect(() => {
    if (location.pathname === '/') {
      document.title = 'Home - Dailydots'
      return
    }

    if (location.pathname === '/journals') {
      document.title = 'My Journals - Dailydots'
      return
    }

    if (location.pathname === '/journals/new') {
      document.title = 'Add New Journal - Dailydots'
      return
    }

    if (location.pathname === '/auth') {
      document.title = 'Sign In - Dailydots'
      return
    }

    document.title = 'Dailydots'
  }, [location.pathname])

  const handleQuickSave = async (input: JournalInput) => {
    await saveEntry(input)
  }

  const handleCreateOrUpdate = async (input: JournalInput) => {
    await saveEntry(input)
    navigate('/journals')
  }

  const handleDelete = async (date: string) => {
    await deleteEntry(date)
  }

  return (
    <Routes>
      <Route path="auth" element={<AuthPage />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<AppShell />}>
          <Route
            index
            element={
              <HomePage
                totalCount={totalCount}
                latestEntry={latestEntry}
                isLoading={isLoading}
                errorMessage={errorMessage}
                onQuickSave={handleQuickSave}
              />
            }
          />
          <Route
            path="journals"
            element={<MyJournalsPage entries={entries} isLoading={isLoading} errorMessage={errorMessage} onDelete={handleDelete} />}
          />
          <Route
            path="journals/new"
            element={<AddJournalPage entries={entries} isLoading={isLoading} errorMessage={errorMessage} onSave={handleCreateOrUpdate} />}
          />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to={user ? '/' : '/auth'} replace />} />
    </Routes>
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
