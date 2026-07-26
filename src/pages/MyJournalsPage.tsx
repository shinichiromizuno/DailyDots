import { Link } from 'react-router-dom'
import { MOOD_OPTIONS } from '../features/journal/constants/moods'
import type { JournalEntry } from '../features/journal/types/journal'

interface MyJournalsPageProps {
  entries: JournalEntry[]
  onDelete: (date: string) => void
}

const getMoodText = (value: string): string => {
  const mood = MOOD_OPTIONS.find((option) => option.value === value)
  return mood ? `${mood.emoji} ${mood.label}` : value
}

export const MyJournalsPage = ({ entries, onDelete }: MyJournalsPageProps) => {
  if (entries.length === 0) {
    return (
      <section className="rounded-3xl border border-dashed border-slate-300 bg-white/80 p-8 text-center shadow-sm">
        <h2 className="text-2xl font-black tracking-tight text-slate-900">My Journals</h2>
        <p className="mt-3 text-slate-600">No entries yet. Start by adding your first journal.</p>
        <Link
          to="/journals/new"
          className="mt-5 inline-flex rounded-xl bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
        >
          Add New Journal
        </Link>
      </section>
    )
  }

  return (
    <section className="space-y-4">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-slate-900">My Journals</h2>
          <p className="text-slate-600">Open, update, or remove saved daily entries.</p>
        </div>
        <Link
          to="/journals/new"
          className="inline-flex rounded-xl bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
        >
          Add New Journal
        </Link>
      </header>

      <ul className="grid gap-4 md:grid-cols-2">
        {entries.map((entry) => (
          <li key={entry.date} className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{entry.date}</p>
            <p className="mt-1 text-sm font-semibold text-cyan-800">{getMoodText(entry.mood)}</p>
            <p className="mt-3 line-clamp-6 whitespace-pre-wrap text-sm leading-6 text-slate-700">{entry.text}</p>

            <div className="mt-4 flex items-center gap-2">
              <Link
                to={`/journals/new?date=${entry.date}`}
                className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
              >
                Edit
              </Link>
              <button
                type="button"
                onClick={() => onDelete(entry.date)}
                className="rounded-lg border border-red-300 px-3 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
