import type { JournalMood } from '../types/journal'

export interface MoodOption {
  value: JournalMood
  label: string
  emoji: string
}

export const MOOD_OPTIONS: MoodOption[] = [
  { value: 'happy', label: 'Happy', emoji: '😄' },
  { value: 'calm', label: 'Calm', emoji: '😌' },
  { value: 'sad', label: 'Sad', emoji: '😔' },
  { value: 'angry', label: 'Angry', emoji: '😤' },
  { value: 'anxious', label: 'Anxious', emoji: '😰' },
]

export const DEFAULT_MOOD: JournalMood = 'calm'
