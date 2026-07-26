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
import { useJournalEntries } from './features/journal/hooks/useJournalEntries'
import type { JournalInput } from './features/journal/types/journal'
import { AddJournalPage } from './pages/AddJournalPage'
import { HomePage } from './pages/HomePage'
import { MyJournalsPage } from './pages/MyJournalsPage'

const AppRoutes = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { entries, latestEntry, totalCount, saveEntry, deleteEntry } = useJournalEntries()

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

    document.title = 'Dailydots'
  }, [location.pathname])

  const handleQuickSave = (input: JournalInput) => {
    saveEntry(input)
  }

  const handleCreateOrUpdate = (input: JournalInput) => {
    saveEntry(input)
    navigate('/journals')
  }

  const handleDelete = (date: string) => {
    deleteEntry(date)
  }

  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route
          index
          element={
            <HomePage
              totalCount={totalCount}
              latestEntry={latestEntry}
              onQuickSave={handleQuickSave}
            />
          }
        />
        <Route
          path="journals"
          element={<MyJournalsPage entries={entries} onDelete={handleDelete} />}
        />
        <Route
          path="journals/new"
          element={<AddJournalPage entries={entries} onSave={handleCreateOrUpdate} />}
        />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
