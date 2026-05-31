import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import TrendAnalyzer from '@/components/agents/TrendAnalyzer'
import * as apiService from '@/lib/services/apiService'
import { useContentAIStore } from '@/lib/store/contentaiStore'

// Mock the API service
jest.mock('@/lib/services/apiService', () => ({
  getTrends: jest.fn(),
  sendToTelegram: jest.fn(),
}))

// Mock the store
jest.mock('@/lib/store/contentaiStore', () => ({
  useContentAIStore: jest.fn(),
}))

// Mock useTextStream hook
jest.mock('@/lib/utils/useTextStream', () => ({
  useTextStream: jest.fn((text) => text),
}))

describe('TrendAnalyzer Component', () => {
  const mockTrends = [
    {
      id: '1',
      title: 'Test Trend 1',
      url: 'https://example.com/1',
      points: 100,
      hooks: ['Hook 1', 'Hook 2', 'Hook 3'],
      audience: 'Developers',
      timestamp: new Date(),
      reasoning: 'Test reasoning',
    },
    {
      id: '2',
      title: 'Test Trend 2',
      url: 'https://example.com/2',
      points: 50,
      hooks: ['Hook A', 'Hook B'],
      audience: 'Creators',
      timestamp: new Date(),
      reasoning: 'More reasoning',
    },
  ]

  const mockStore = {
    setLoading: jest.fn(),
    setError: jest.fn(),
    loading: false,
    error: null,
    trends: mockTrends,
    setTrends: jest.fn(),
    selectedTopic: null,
    setSelectedTopic: jest.fn(),
    selectedReasoning: null,
    setSelectedReasoning: jest.fn(),
    setActiveTab: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useContentAIStore as jest.Mock).mockReturnValue(mockStore)
    ;(apiService.getTrends as jest.Mock).mockResolvedValue(mockTrends)
    ;(apiService.sendToTelegram as jest.Mock).mockResolvedValue(true)
  })

  test('renders TrendAnalyzer component', () => {
    render(<TrendAnalyzer />)
    expect(screen.getByText(/Trending Topics/i)).toBeInTheDocument()
  })

  test('displays refresh trends button', () => {
    render(<TrendAnalyzer />)
    const refreshButton = screen.getByRole('button', { name: /Refresh Trends/i })
    expect(refreshButton).toBeInTheDocument()
  })

  test('calls getTrends on component mount', async () => {
    render(<TrendAnalyzer />)
    await waitFor(() => {
      expect(apiService.getTrends).toHaveBeenCalled()
    })
  })

  test('refresh trends button triggers fetch', async () => {
    render(<TrendAnalyzer />)
    const refreshButton = screen.getByRole('button', { name: /Refresh Trends/i })
    fireEvent.click(refreshButton)
    await waitFor(() => {
      expect(apiService.getTrends).toHaveBeenCalledTimes(2) // once on mount, once on click
    })
  })

  test('displays trends from store', () => {
    render(<TrendAnalyzer />)
    expect(screen.getByText('Test Trend 1')).toBeInTheDocument()
    expect(screen.getByText('Test Trend 2')).toBeInTheDocument()
  })

  test('handles select trend action', () => {
    render(<TrendAnalyzer />)
    const useThisTopicButtons = screen.getAllByRole('button', { name: /Use this topic/i })
    fireEvent.click(useThisTopicButtons[0])
    expect(mockStore.setSelectedTopic).toHaveBeenCalledWith('Test Trend 1')
  })

  test('handles error state', async () => {
    ;(apiService.getTrends as jest.Mock).mockRejectedValue(
      new Error('API Error')
    )
    render(<TrendAnalyzer />)
    await waitFor(() => {
      expect(mockStore.setError).toHaveBeenCalled()
    })
  })

  test('displays audience badge for each trend', () => {
    render(<TrendAnalyzer />)
    expect(screen.getByText('Developers')).toBeInTheDocument()
    expect(screen.getByText('Creators')).toBeInTheDocument()
  })

  test('handles send to telegram', async () => {
    render(<TrendAnalyzer />)
    const telegramButtons = screen.getAllByRole('button', { name: /Send to Telegram/i })
    fireEvent.click(telegramButtons[0])
    await waitFor(() => {
      expect(apiService.sendToTelegram).toHaveBeenCalled()
    })
  })

  test('shows loading state during fetch', async () => {
    ;(useContentAIStore as jest.Mock).mockReturnValue({
      ...mockStore,
      loading: true,
    })
    render(<TrendAnalyzer />)
    expect(screen.getByRole('button', { name: /Loading/i })).toBeInTheDocument()
  })

  test('disables buttons when loading', () => {
    ;(useContentAIStore as jest.Mock).mockReturnValue({
      ...mockStore,
      loading: true,
    })
    render(<TrendAnalyzer />)
    const buttons = screen.getAllByRole('button')
    buttons.forEach((button) => {
      if (button.textContent?.includes('Use this topic') || button.textContent?.includes('Send to Telegram')) {
        expect(button).toBeDisabled()
      }
    })
  })
})
