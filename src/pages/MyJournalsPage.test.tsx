import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { MyJournalsPage } from './MyJournalsPage'

describe('MyJournalsPage', () => {
  it('shows mood calendar cells with saved moods', () => {
    render(
      <MemoryRouter>
        <MyJournalsPage
          entries={[
            {
              date: '2026-07-15',
              mood: 'happy',
              text: 'Great day',
              updatedAt: '2026-07-15T09:00:00.000Z',
            },
          ]}
          onDelete={vi.fn()}
        />
      </MemoryRouter>
    )

    expect(screen.getByRole('heading', { name: 'Mood Calendar' })).toBeInTheDocument()
    expect(screen.getByText('July 2026')).toBeInTheDocument()
    expect(screen.getByLabelText('July 15: 😄 Happy')).toBeInTheDocument()
  })

  it('shows mood calendar even when there are no entries', () => {
    render(
      <MemoryRouter>
        <MyJournalsPage entries={[]} onDelete={vi.fn()} />
      </MemoryRouter>
    )

    expect(screen.getByRole('heading', { name: 'Mood Calendar' })).toBeInTheDocument()
    expect(screen.getByText('No entries yet. Start by adding your first journal.')).toBeInTheDocument()
  })
})
