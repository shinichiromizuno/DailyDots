import { useCallback, useEffect, useMemo, useState } from 'react'
import { journalService } from '../services/journalService'
import type { JournalEntry, JournalInput } from '../types/journal'

interface UseJournalEntriesOptions {
  enabled?: boolean
}

export const useJournalEntries = ({ enabled = true }: UseJournalEntriesOptions = {}) => {
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const refreshEntries = useCallback(async () => {
    if (!enabled) {
      return
    }

    setIsLoading(true)
    setErrorMessage(null)

    try {
      const nextEntries = await journalService.getAll()
      setEntries(nextEntries)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Failed to load entries.')
    } finally {
      setIsLoading(false)
    }
  }, [enabled])

  const saveEntry = useCallback(async (input: JournalInput) => {
    if (!enabled) {
      throw new Error('Journal entries are unavailable while signed out.')
    }

    setErrorMessage(null)

    try {
      const saved = await journalService.upsert(input)

      setEntries((current) => {
        const withoutCurrentDate = current.filter((entry) => entry.date !== saved.date)
        return [saved, ...withoutCurrentDate].sort((a, b) => b.date.localeCompare(a.date))
      })

      return saved
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to save entry.'
      setErrorMessage(message)
      throw error
    }
  }, [enabled])

  const deleteEntry = useCallback(async (date: string) => {
    if (!enabled) {
      return
    }

    setErrorMessage(null)

    try {
      await journalService.removeByDate(date)
      setEntries((current) => current.filter((entry) => entry.date !== date))
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to delete entry.'
      setErrorMessage(message)
      throw error
    }
  }, [enabled])

  useEffect(() => {
    if (!enabled) {
      return
    }

    let isCancelled = false

    const loadEntries = async () => {
      setIsLoading(true)
      setErrorMessage(null)

      try {
        const nextEntries = await journalService.getAll()

        if (!isCancelled) {
          setEntries(nextEntries)
        }
      } catch (error) {
        if (!isCancelled) {
          setErrorMessage(error instanceof Error ? error.message : 'Failed to load entries.')
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false)
        }
      }
    }

    void loadEntries()

    return () => {
      isCancelled = true
    }
  }, [enabled])

  const visibleEntries = useMemo(() => {
    return enabled ? entries : []
  }, [enabled, entries])

  const totalCount = visibleEntries.length
  const latestEntry = visibleEntries[0] ?? null
  const visibleIsLoading = enabled ? isLoading : false
  const visibleErrorMessage = enabled ? errorMessage : null

  const moodStats = useMemo(() => {
    return visibleEntries.reduce<Record<string, number>>((accumulator, entry) => {
      accumulator[entry.mood] = (accumulator[entry.mood] ?? 0) + 1
      return accumulator
    }, {})
  }, [visibleEntries])

  return {
    entries: visibleEntries,
    latestEntry,
    moodStats,
    totalCount,
    isLoading: visibleIsLoading,
    errorMessage: visibleErrorMessage,
    saveEntry,
    deleteEntry,
    refreshEntries,
  }
}
