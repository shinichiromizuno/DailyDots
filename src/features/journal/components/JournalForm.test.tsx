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
})
