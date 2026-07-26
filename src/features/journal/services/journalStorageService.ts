import { compareDesc, isValid, parseISO } from 'date-fns'
import type { JournalEntry, JournalInput } from '../types/journal'

const STORAGE_KEY = 'daily-dots-journals'

const sortByDateDesc = (entries: JournalEntry[]): JournalEntry[] => {
  return [...entries].sort((a, b) => {
    const byDate = compareDesc(parseISO(a.date), parseISO(b.date))

    if (byDate !== 0) {
      return byDate
    }

    return compareDesc(parseISO(a.updatedAt), parseISO(b.updatedAt))
  })
}

const isDateKey = (value: string): boolean => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false
  }

  const parsed = parseISO(value)
  return isValid(parsed)
}

const parseStorage = (raw: string | null): JournalEntry[] => {
  if (!raw) {
    return []
  }

  try {
    const parsed = JSON.parse(raw) as unknown

    if (!Array.isArray(parsed)) {
      return []
    }

    const normalized = parsed.filter((item): item is JournalEntry => {
      if (typeof item !== 'object' || item === null) {
        return false
      }

      const candidate = item as Partial<JournalEntry>

      return (
        typeof candidate.date === 'string' &&
        isDateKey(candidate.date) &&
        typeof candidate.mood === 'string' &&
        typeof candidate.text === 'string' &&
        typeof candidate.updatedAt === 'string'
      )
    })

    return sortByDateDesc(normalized)
  } catch {
    return []
  }
}

const writeStorage = (entries: JournalEntry[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sortByDateDesc(entries)))
}

export const journalStorageService = {
  getAll(): JournalEntry[] {
    return parseStorage(localStorage.getItem(STORAGE_KEY))
  },

  getByDate(date: string): JournalEntry | null {
    if (!isDateKey(date)) {
      return null
    }

    const entries = this.getAll()
    return entries.find((entry) => entry.date === date) ?? null
  },

  upsert(input: JournalInput): JournalEntry {
    if (!isDateKey(input.date)) {
      throw new Error('Date must be in YYYY-MM-DD format.')
    }

    const cleaned: JournalEntry = {
      date: input.date,
      mood: input.mood,
      text: input.text.trim(),
      updatedAt: new Date().toISOString(),
    }

    const entries = this.getAll()
    const withoutCurrentDate = entries.filter((entry) => entry.date !== cleaned.date)
    const nextEntries = sortByDateDesc([cleaned, ...withoutCurrentDate])

    writeStorage(nextEntries)

    return cleaned
  },

  removeByDate(date: string): void {
    if (!isDateKey(date)) {
      return
    }

    const entries = this.getAll()
    const nextEntries = entries.filter((entry) => entry.date !== date)

    writeStorage(nextEntries)
  },
}
