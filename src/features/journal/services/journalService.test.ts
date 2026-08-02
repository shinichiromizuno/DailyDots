import { beforeEach, describe, expect, it, vi } from 'vitest'

const { getAllMock } = vi.hoisted(() => ({
  getAllMock: vi.fn(),
}))

vi.mock('./journalSupabaseService', () => ({
  journalSupabaseService: {
    getAll: getAllMock,
    getByDate: vi.fn(),
    upsert: vi.fn(),
    removeByDate: vi.fn(),
  },
}))

import { journalService } from './journalService'

describe('journalService', () => {
  beforeEach(() => {
    getAllMock.mockReset()
    getAllMock.mockResolvedValue([])
  })

  it('delegates reads to the active journal repository', async () => {
    await journalService.getAll()

    expect(getAllMock).toHaveBeenCalledTimes(1)
  })
})
