import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { DEFAULT_MOOD } from '../features/journal/constants/moods'
import { JournalForm } from '../features/journal/components/JournalForm'
import type { JournalEntry, JournalInput } from '../features/journal/types/journal'

interface AddJournalPageProps {
  entries: JournalEntry[]
  onSave: (input: JournalInput) => void
}

const getTodayDate = (): string => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export const AddJournalPage = ({ entries, onSave }: AddJournalPageProps) => {
  const [searchParams] = useSearchParams()
  const dateInQuery = searchParams.get('date')
  const defaultDate = dateInQuery ?? getTodayDate()

  const currentEntry = useMemo(() => {
    return entries.find((entry) => entry.date === defaultDate) ?? null
  }, [defaultDate, entries])

  return (
    <section className="space-y-4">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">Add or update</p>
        <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">Add New Journal</h2>
        <p className="mt-2 text-slate-600">
          If an entry already exists for the selected date, saving will update that existing journal.
        </p>
      </header>

      <JournalForm
        initialValues={{
          date: currentEntry?.date ?? defaultDate,
          mood: currentEntry?.mood ?? DEFAULT_MOOD,
          text: currentEntry?.text ?? '',
        }}
        helperText={
          currentEntry
            ? `An entry already exists for ${currentEntry.date}. Saving will overwrite it.`
            : 'No entry exists for this date yet. Saving will create one.'
        }
        submitLabel={currentEntry ? 'Update journal' : 'Create journal'}
        onSubmit={onSave}
      />
    </section>
  )
}
