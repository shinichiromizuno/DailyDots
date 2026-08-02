import type { JournalEntry, JournalInput } from '../types/journal'
import { isSupabaseConfigured, supabase } from '../../../lib/supabase'
import { journalStorageService } from './journalStorageService'

const TABLE_NAME = 'journal_entries'

const requireUserId = async (): Promise<string> => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error) {
    throw new Error(error.message)
  }

  if (!user) {
    throw new Error('You need to sign in before accessing journals.')
  }

  return user.id
}

const mapRowToEntry = (row: Record<string, unknown>): JournalEntry => {
  return {
    date: String(row.entry_date ?? ''),
    mood: String(row.mood ?? 'calm') as JournalEntry['mood'],
    text: String(row.text ?? ''),
    updatedAt: String(row.updated_at ?? new Date().toISOString()),
  }
}

export const journalSupabaseService = {
  async getAll(): Promise<JournalEntry[]> {
    if (!isSupabaseConfigured) {
      return journalStorageService.getAll()
    }

    const userId = await requireUserId()

    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('entry_date, mood, text, updated_at')
      .eq('user_id', userId)
      .order('entry_date', { ascending: false })

    if (error) {
      throw new Error(error.message)
    }

    return (data ?? []).map((row) => mapRowToEntry(row as Record<string, unknown>))
  },

  async getByDate(date: string): Promise<JournalEntry | null> {
    if (!isSupabaseConfigured) {
      return journalStorageService.getByDate(date)
    }

    const userId = await requireUserId()

    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('entry_date, mood, text, updated_at')
      .eq('user_id', userId)
      .eq('entry_date', date)
      .maybeSingle()

    if (error) {
      throw new Error(error.message)
    }

    return data ? mapRowToEntry(data as Record<string, unknown>) : null
  },

  async upsert(input: JournalInput): Promise<JournalEntry> {
    if (!isSupabaseConfigured) {
      return journalStorageService.upsert(input)
    }

    const userId = await requireUserId()
    const cleanedText = input.text.trim()
    const now = new Date().toISOString()

    const { data: existingRow, error: existingError } = await supabase
      .from(TABLE_NAME)
      .select('entry_date')
      .eq('user_id', userId)
      .eq('entry_date', input.date)
      .maybeSingle()

    if (existingError) {
      throw new Error(existingError.message)
    }

    if (existingRow) {
      const { data, error } = await supabase
        .from(TABLE_NAME)
        .update({
          mood: input.mood,
          text: cleanedText,
          updated_at: now,
        })
        .eq('user_id', userId)
        .eq('entry_date', input.date)
        .select('entry_date, mood, text, updated_at')
        .single()

      if (error) {
        throw new Error(error.message)
      }

      return mapRowToEntry(data as Record<string, unknown>)
    }

    const { data, error } = await supabase
      .from(TABLE_NAME)
      .insert({
        user_id: userId,
        entry_date: input.date,
        mood: input.mood,
        text: cleanedText,
        updated_at: now,
        created_at: now,
      })
      .select('entry_date, mood, text, updated_at')
      .single()

    if (error) {
      throw new Error(error.message)
    }

    return mapRowToEntry(data as Record<string, unknown>)
  },

  async removeByDate(date: string): Promise<void> {
    if (!isSupabaseConfigured) {
      journalStorageService.removeByDate(date)
      return
    }

    const userId = await requireUserId()

    const { error } = await supabase
      .from(TABLE_NAME)
      .delete()
      .eq('user_id', userId)
      .eq('entry_date', date)

    if (error) {
      throw new Error(error.message)
    }
  },
}
