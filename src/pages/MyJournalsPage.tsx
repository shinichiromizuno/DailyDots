import { Link } from 'react-router-dom'
import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameMonth,
  parseISO,
  startOfMonth,
  startOfWeek,
} from 'date-fns'
import { MOOD_OPTIONS } from '../features/journal/constants/moods'
import type { JournalEntry } from '../features/journal/types/journal'

interface MyJournalsPageProps {
  entries: JournalEntry[]
  isLoading?: boolean
  errorMessage?: string | null
  onDelete: (date: string) => Promise<void> | void
}

const getMoodText = (value: string): string => {
  const mood = MOOD_OPTIONS.find((option) => option.value === value)
  return mood ? `${mood.emoji} ${mood.label}` : value
}

const getMoodEmoji = (value: string): string | null => {
  const mood = MOOD_OPTIONS.find((option) => option.value === value)
  return mood?.emoji ?? null
}

export const MyJournalsPage = ({ entries, isLoading = false, errorMessage, onDelete }: MyJournalsPageProps) => {
  const referenceDate = entries[0] ? parseISO(entries[0].date) : new Date()
  const monthStart = startOfMonth(referenceDate)
  const monthEnd = endOfMonth(referenceDate)
  const calendarStart = startOfWeek(monthStart)
  const calendarEnd = endOfWeek(monthEnd)
  const calendarDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd })
  const moodByDate = new Map(entries.map((entry) => [entry.date, entry.mood]))
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  if (entries.length === 0) {
    return (
      <section className="space-y-4">
        {errorMessage ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </div>
        ) : null}

        {isLoading ? (
          <div className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-600">
            Loading journals...
          </div>
        ) : null}

        <header className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-black tracking-tight text-slate-900">My Journals</h2>
          </div>
          <Link
            to="/journals/new"
            className="inline-flex rounded-xl bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          >
            Add New Journal
          </Link>
        </header>

        <article className="mx-auto max-w-sm rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-lg font-bold text-slate-900">Mood Calendar</h3>
            <p className="text-sm font-semibold text-slate-600">{format(referenceDate, 'MMMM yyyy')}</p>
          </div>
          <div className="mt-4 grid grid-cols-7 gap-1 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
            {weekDays.map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>
          <ul className="mt-2 grid grid-cols-7 gap-1">
            {calendarDays.map((day) => {
              const dateKey = format(day, 'yyyy-MM-dd')

              return (
                <li key={dateKey}>
                  <Link
                    to={`/journals/new?date=${dateKey}`}
                    aria-label={`Add journal for ${format(day, 'MMMM d')}`}
                    className={`block rounded-lg border p-1 text-center transition hover:bg-cyan-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${
                      isSameMonth(day, monthStart)
                        ? 'border-slate-200 bg-white'
                        : 'border-transparent bg-slate-100/70 text-slate-400'
                    }`}
                  >
                    <p className="text-xs font-semibold">{format(day, 'd')}</p>
                  </Link>
                </li>
              )
            })}
          </ul>
        </article>

        <section className="rounded-3xl border border-dashed border-slate-300 bg-white/80 p-8 text-center shadow-sm">
          <p className="text-slate-600">No entries yet. Start by adding your first journal.</p>
        </section>
      </section>
    )
  }

  return (
    <section className="space-y-4">
      {errorMessage ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </div>
      ) : null}

      {isLoading ? (
        <div className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-600">
          Loading journals...
        </div>
      ) : null}

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

      <article className="mx-auto max-w-sm rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-lg font-bold text-slate-900">Mood Calendar</h3>
          <p className="text-sm font-semibold text-slate-600">{format(referenceDate, 'MMMM yyyy')}</p>
        </div>
        <div className="mt-4 grid grid-cols-7 gap-1 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
          {weekDays.map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>
        <ul className="mt-2 grid grid-cols-7 gap-1">
          {calendarDays.map((day) => {
            const dateKey = format(day, 'yyyy-MM-dd')
            const mood = moodByDate.get(dateKey)
            const isInMonth = isSameMonth(day, monthStart)
            const moodDisplay = mood ? getMoodText(mood) : 'No mood'

            return (
              <li key={dateKey}>
                <Link
                  to={`/journals/new?date=${dateKey}`}
                  aria-label={`${format(day, 'MMMM d')}: ${moodDisplay}`}
                  className={`block rounded-lg border p-1 text-center transition hover:bg-cyan-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${
                    isInMonth
                      ? 'border-slate-200 bg-white'
                      : 'border-transparent bg-slate-100/70 text-slate-400'
                  }`}
                >
                  <p className="text-xs font-semibold">{format(day, 'd')}</p>
                  <p className="mt-0.5 text-sm leading-none">{mood ? getMoodEmoji(mood) : '·'}</p>
                </Link>
              </li>
            )
          })}
        </ul>
      </article>

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
