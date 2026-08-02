import { Link } from 'react-router-dom'
import { MOOD_OPTIONS } from '../features/journal/constants/moods'
import { JournalForm } from '../features/journal/components/JournalForm'
import type { JournalEntry, JournalInput } from '../features/journal/types/journal'

interface HomePageProps {
  totalCount: number
  latestEntry: JournalEntry | null
  isLoading?: boolean
  errorMessage?: string | null
  onQuickSave: (input: JournalInput) => Promise<void> | void
}

const getMoodLabel = (value: string): string => {
  return MOOD_OPTIONS.find((option) => option.value === value)?.label ?? value
}

const getMoodEmoji = (value: string): string => {
  return MOOD_OPTIONS.find((option) => option.value === value)?.emoji ?? '🙂'
}

export const HomePage = ({ totalCount, latestEntry, isLoading = false, errorMessage, onQuickSave }: HomePageProps) => {
  return (
    <section className="space-y-6">
      <div className="grid gap-4 md:grid-cols-[1.2fr,0.8fr]">
        <article className="rounded-3xl border border-cyan-200 bg-white/90 p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">Today in one place</p>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
            Write one clear moment for each day.
          </h2>
          <p className="mt-3 text-slate-600">
            You can only keep one entry per date. Save again on the same day to update it.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <div className="rounded-2xl bg-cyan-50 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-cyan-700">Total entries</p>
              <p className="text-2xl font-black text-cyan-900">{totalCount}</p>
            </div>
            <Link
              to="/journals"
              className="inline-flex items-center rounded-2xl border border-cyan-300 bg-white px-4 py-3 text-sm font-semibold text-cyan-800 transition hover:bg-cyan-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              Browse all journals
            </Link>
          </div>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Latest entry</p>
          {latestEntry ? (
            <>
              <h3 className="mt-2 text-lg font-bold text-slate-900">{latestEntry.date}</h3>
              <p className="mt-1 text-sm font-medium text-slate-700">
                {getMoodEmoji(latestEntry.mood)} {getMoodLabel(latestEntry.mood)}
              </p>
              <p className="mt-3 line-clamp-5 whitespace-pre-wrap text-sm leading-6 text-slate-700">{latestEntry.text}</p>
              <Link
                to={`/journals/new?date=${latestEntry.date}`}
                className="mt-4 inline-flex items-center rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
              >
                Open and edit
              </Link>
            </>
          ) : (
            <p className="mt-3 text-slate-600">No journal yet. Add your first entry below.</p>
          )}
        </article>
      </div>

      <article>
        <h3 className="mb-3 text-lg font-bold text-slate-900">Quick add</h3>
        {errorMessage ? (
          <div className="mb-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </div>
        ) : null}
        {isLoading ? (
          <div className="mb-3 rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-600">
            Loading entries...
          </div>
        ) : null}
        <JournalForm submitLabel="Save journal" onSubmit={onQuickSave} />
      </article>
    </section>
  )
}
