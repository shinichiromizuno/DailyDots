export type JournalMood = 'happy' | 'calm' | 'sad' | 'angry' | 'anxious'

export interface JournalEntry {
  date: string
  mood: JournalMood
  text: string
  updatedAt: string
}

export interface JournalInput {
  date: string
  mood: JournalMood
  text: string
}
