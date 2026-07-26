import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { DEFAULT_MOOD, MOOD_OPTIONS } from '../constants/moods'
import type { JournalInput } from '../types/journal'

interface DateOption {
  value: string
  label: string
}

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

const getPastWeekDateOptions = (): ReadonlyArray<DateOption> => {
  const formatter = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date()
    date.setDate(date.getDate() - index)

    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const value = `${year}-${month}-${day}`

    const relativeLabel = index === 0 ? 'Today' : index === 1 ? 'Yesterday' : null

    return {
      value,
      label: relativeLabel ? `${relativeLabel} (${formatter.format(date)})` : formatter.format(date),
    }
  })
}

const PAST_WEEK_DATE_OPTIONS = getPastWeekDateOptions()

export const JournalForm = ({
  initialValues,
  submitLabel,
  helperText,
  onSubmit,
}: JournalFormProps) => {
  const {
    register,
    setValue,
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
        <div className="space-y-2">
          <label className="space-y-1">
            <span className="block text-sm font-semibold text-slate-700">Date</span>
            <input
              type="date"
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none ring-0 transition focus-visible:border-cyan-500 focus-visible:ring-2 focus-visible:ring-cyan-300"
              {...register('date', { required: 'Date is required.' })}
            />
          </label>

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Past week</p>
            <div className="flex flex-wrap gap-2">
              {PAST_WEEK_DATE_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    setValue('date', option.value, {
                      shouldDirty: true,
                      shouldValidate: true,
                      shouldTouch: true,
                    })
                  }}
                  className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-semibold text-slate-700 transition hover:border-cyan-300 hover:text-cyan-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {errors.date ? (
            <span className="text-sm text-red-600">{errors.date.message}</span>
          ) : null}
        </div>

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
