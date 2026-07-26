import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { DEFAULT_MOOD, MOOD_OPTIONS } from '../constants/moods'
import type { JournalInput } from '../types/journal'

interface JournalFormProps {
  initialValues?: Partial<JournalInput>
  submitLabel: string
  helperText?: string
  onSubmit: (input: JournalInput) => void
}

const getTodayDate = (): string => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export const JournalForm = ({
  initialValues,
  submitLabel,
  helperText,
  onSubmit,
}: JournalFormProps) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<JournalInput>({
    defaultValues: {
      date: initialValues?.date ?? getTodayDate(),
      mood: initialValues?.mood ?? DEFAULT_MOOD,
      text: initialValues?.text ?? '',
    },
  })

  useEffect(() => {
    reset({
      date: initialValues?.date ?? getTodayDate(),
      mood: initialValues?.mood ?? DEFAULT_MOOD,
      text: initialValues?.text ?? '',
    })
  }, [initialValues, reset])

  return (
    <form
      className="space-y-4 rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm backdrop-blur"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-1">
          <span className="block text-sm font-semibold text-slate-700">Date</span>
          <input
            type="date"
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none ring-0 transition focus-visible:border-cyan-500 focus-visible:ring-2 focus-visible:ring-cyan-300"
            {...register('date', { required: 'Date is required.' })}
          />
          {errors.date ? (
            <span className="text-sm text-red-600">{errors.date.message}</span>
          ) : null}
        </label>

        <label className="space-y-1">
          <span className="block text-sm font-semibold text-slate-700">Mood</span>
          <select
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none ring-0 transition focus-visible:border-cyan-500 focus-visible:ring-2 focus-visible:ring-cyan-300"
            {...register('mood', { required: 'Mood is required.' })}
          >
            {MOOD_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.emoji} {option.label}
              </option>
            ))}
          </select>
          {errors.mood ? (
            <span className="text-sm text-red-600">{errors.mood.message}</span>
          ) : null}
        </label>
      </div>

      <label className="space-y-1">
        <span className="block text-sm font-semibold text-slate-700">Journal</span>
        <textarea
          rows={6}
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none ring-0 transition focus-visible:border-cyan-500 focus-visible:ring-2 focus-visible:ring-cyan-300"
          placeholder="Write what happened today..."
          {...register('text', {
            required: 'Journal text is required.',
            minLength: {
              value: 5,
              message: 'Please write at least 5 characters.',
            },
            maxLength: {
              value: 2000,
              message: 'Please keep your journal under 2000 characters.',
            },
          })}
        />
        {errors.text ? (
          <span className="text-sm text-red-600">{errors.text.message}</span>
        ) : null}
      </label>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-600">{helperText ?? 'One entry per day. Saving again updates that day.'}</p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-xl bg-cyan-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:bg-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  )
}
