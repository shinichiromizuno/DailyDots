import { useCallback, useMemo, useState } from 'react'
import { journalStorageService } from '../services/journalStorageService'
import type { JournalEntry, JournalInput } from '../types/journal'

export const useJournalEntries = () => {
  const [entries, setEntries] = useState<JournalEntry[]>(() => {
    return journalStorageService.getAll()
  })

  const refreshEntries = useCallback(() => {
    setEntries(journalStorageService.getAll())
  }, [])

  const saveEntry = useCallback((input: JournalInput) => {
    const saved = journalStorageService.upsert(input)

    setEntries((current) => {
      const withoutCurrentDate = current.filter((entry) => entry.date !== saved.date)
      return [saved, ...withoutCurrentDate].sort((a, b) => b.date.localeCompare(a.date))
    })

    return saved
  }, [])

  const deleteEntry = useCallback((date: string) => {
    journalStorageService.removeByDate(date)
    setEntries((current) => current.filter((entry) => entry.date !== date))
  }, [])

  const totalCount = entries.length
  const latestEntry = entries[0] ?? null

  const moodStats = useMemo(() => {
    return entries.reduce<Record<string, number>>((accumulator, entry) => {
      accumulator[entry.mood] = (accumulator[entry.mood] ?? 0) + 1
      return accumulator
    }, {})
  }, [entries])

  return {
    entries,
    latestEntry,
    moodStats,
    totalCount,
    saveEntry,
    deleteEntry,
    refreshEntries,
  }
}
