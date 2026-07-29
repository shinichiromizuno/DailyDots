import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { JournalForm } from './JournalForm'

describe('JournalForm', () => {
  it('shows a live character counter for the journal entry', async () => {
    const user = userEvent.setup()

    render(<JournalForm submitLabel="Save journal" onSubmit={() => undefined} />)

    const textarea = screen.getByLabelText(/journal/i)
    expect(screen.getByText('0 / 2000')).toBeInTheDocument()

    await user.type(textarea, 'hello')

    expect(screen.getByText('5 / 2000')).toBeInTheDocument()
  })

  it('preserves user input when initial values are re-rendered with the same values', async () => {
    const user = userEvent.setup()
    const initialValues = {
      date: '2024-01-01',
      mood: 'calm' as const,
      text: 'seed entry',
    }

    const { rerender } = render(
      <JournalForm initialValues={initialValues} submitLabel="Save journal" onSubmit={() => undefined} />,
    )

    const textarea = screen.getByLabelText(/journal/i)
    await user.clear(textarea)
    await user.type(textarea, 'updated entry')

    expect(textarea).toHaveValue('updated entry')

    rerender(
      <JournalForm initialValues={initialValues} submitLabel="Save journal" onSubmit={() => undefined} />,
    )

    expect(textarea).toHaveValue('updated entry')
  })
})
