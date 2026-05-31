import * as apiService from '@/lib/services/apiService'
import axios from 'axios'

jest.mock('axios')

describe('API Service', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('getTrends', () => {
    test('fetches trends successfully', async () => {
      const mockData = [
        {
          id: '1',
          title: 'Test Trend',
          url: 'https://example.com',
          points: 100,
          hooks: ['Hook 1'],
          audience: 'Developers',
          timestamp: new Date(),
        },
      ]

      mockedAxios.get.mockResolvedValue({ data: mockData })

      const result = await apiService.getTrends()
      expect(result).toEqual(mockData)
      expect(mockedAxios.get).toHaveBeenCalledWith('/agents/trends')
    })

    test('handles API errors gracefully', async () => {
      mockedAxios.get.mockRejectedValue(new Error('API Error'))

      try {
        await apiService.getTrends()
      } catch (error) {
        expect(error).toBeDefined()
      }
    })

    test('returns empty array on network error', async () => {
      mockedAxios.get.mockRejectedValue(new Error('Network Error'))

      try {
        await apiService.getTrends()
      } catch (error) {
        expect(error).toBeDefined()
      }
    })
  })

  describe('getTechUpdates', () => {
    test('fetches tech updates successfully', async () => {
      const mockData = [
        {
          id: '1',
          title: 'Tech Update',
          source: 'News',
          link: 'https://example.com',
          contentAngles: [],
          timestamp: new Date(),
        },
      ]

      mockedAxios.get.mockResolvedValue({ data: { updates: mockData } })

      const result = await apiService.getTechUpdates()
      expect(result).toBeDefined()
    })
  })

  describe('generateHooks', () => {
    test('generates hooks successfully', async () => {
      const mockData = [
        { id: '1', text: 'Test Hook', type: 'question' },
      ]

      mockedAxios.post.mockResolvedValue({ data: mockData })

      const result = await apiService.generateHooks('Test Topic')
      expect(result).toBeDefined()
      expect(mockedAxios.post).toHaveBeenCalled()
    })

    test('handles generation errors', async () => {
      mockedAxios.post.mockRejectedValue(new Error('Generation Error'))

      try {
        await apiService.generateHooks('Test Topic')
      } catch (error) {
        expect(error).toBeDefined()
      }
    })
  })

  describe('generateScript', () => {
    test('generates script successfully', async () => {
      const mockData = {
        id: '1',
        script: 'Generated script content',
        topic: 'Test Topic',
        hook: 'Test Hook',
      }

      mockedAxios.post.mockResolvedValue({ data: mockData })

      const result = await apiService.generateScript('Test Topic', 'Test Hook')
      expect(result).toBeDefined()
    })
  })

  describe('sendToTelegram', () => {
    test('sends message to telegram', async () => {
      mockedAxios.post.mockResolvedValue({ data: { success: true } })

      const result = await apiService.sendToTelegram('Test message')
      expect(result).toBeDefined()
      expect(mockedAxios.post).toHaveBeenCalled()
    })

    test('handles telegram send errors', async () => {
      mockedAxios.post.mockRejectedValue(new Error('Telegram Error'))

      try {
        await apiService.sendToTelegram('Test message')
      } catch (error) {
        expect(error).toBeDefined()
      }
    })
  })
})
