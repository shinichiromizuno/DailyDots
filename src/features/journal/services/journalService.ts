import type { JournalEntry, JournalInput } from '../types/journal'
import { journalSupabaseService } from './journalSupabaseService'

export const journalService = {
  async getAll(): Promise<JournalEntry[]> {
    return journalSupabaseService.getAll()
  },

  async getByDate(date: string): Promise<JournalEntry | null> {
    return journalSupabaseService.getByDate(date)
  },

  async upsert(input: JournalInput): Promise<JournalEntry> {
    return journalSupabaseService.upsert(input)
  },

  async removeByDate(date: string): Promise<void> {
    return journalSupabaseService.removeByDate(date)
  },
}
