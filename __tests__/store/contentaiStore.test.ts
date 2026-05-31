import { renderHook, act } from '@testing-library/react'
import { useContentAIStore } from '@/lib/store/contentaiStore'

describe('ContentAI Store', () => {
  beforeEach(() => {
    // Reset store state before each test
    const { result } = renderHook(() => useContentAIStore())
    act(() => {
      result.current.resetStore?.()
    })
  })

  test('initializes with default values', () => {
    const { result } = renderHook(() => useContentAIStore())
    expect(result.current.activeTab).toBe('trends')
    expect(result.current.selectedTopic).toBeNull()
    expect(result.current.selectedHook).toBeNull()
    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBeNull()
  })

  test('sets active tab', () => {
    const { result } = renderHook(() => useContentAIStore())
    act(() => {
      result.current.setActiveTab('hooks')
    })
    expect(result.current.activeTab).toBe('hooks')
  })

  test('sets selected topic', () => {
    const { result } = renderHook(() => useContentAIStore())
    act(() => {
      result.current.setSelectedTopic('AI Trends')
    })
    expect(result.current.selectedTopic).toBe('AI Trends')
  })

  test('sets selected hook', () => {
    const { result } = renderHook(() => useContentAIStore())
    const mockHook = { id: '1', text: 'Test Hook', type: 'question' }
    act(() => {
      result.current.setSelectedHook(mockHook)
    })
    expect(result.current.selectedHook).toEqual(mockHook)
  })

  test('sets loading state', () => {
    const { result } = renderHook(() => useContentAIStore())
    act(() => {
      result.current.setLoading(true)
    })
    expect(result.current.loading).toBe(true)
  })

  test('sets error state', () => {
    const { result } = renderHook(() => useContentAIStore())
    act(() => {
      result.current.setError('Test error')
    })
    expect(result.current.error).toBe('Test error')
  })

  test('sets trends', () => {
    const { result } = renderHook(() => useContentAIStore())
    const mockTrends = [
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
    act(() => {
      result.current.setTrends(mockTrends)
    })
    expect(result.current.trends).toEqual(mockTrends)
  })

  test('sets tech updates', () => {
    const { result } = renderHook(() => useContentAIStore())
    const mockUpdates = [
      {
        id: '1',
        title: 'Test Update',
        source: 'News',
        link: 'https://example.com',
        contentAngles: [],
        timestamp: new Date(),
      },
    ]
    act(() => {
      result.current.setTechUpdates(mockUpdates)
    })
    expect(result.current.techUpdates).toEqual(mockUpdates)
  })

  test('sets hooks', () => {
    const { result } = renderHook(() => useContentAIStore())
    const mockHooks = [{ id: '1', text: 'Test Hook', type: 'question' }]
    act(() => {
      result.current.setHooks(mockHooks)
    })
    expect(result.current.hooks).toEqual(mockHooks)
  })

  test('clears error', () => {
    const { result } = renderHook(() => useContentAIStore())
    act(() => {
      result.current.setError('Test error')
    })
    expect(result.current.error).toBe('Test error')
    act(() => {
      result.current.setError(null)
    })
    expect(result.current.error).toBeNull()
  })

  test('sets script result', () => {
    const { result } = renderHook(() => useContentAIStore())
    const mockScript = {
      id: '1',
      script: 'Test script',
      topic: 'Test Topic',
      hook: 'Test Hook',
    }
    act(() => {
      result.current.setScriptResult(mockScript)
    })
    expect(result.current.scriptResult).toEqual(mockScript)
  })

  test('sets captions', () => {
    const { result } = renderHook(() => useContentAIStore())
    const mockCaption = {
      id: '1',
      instagramCaption: 'Test caption',
      hashtags: ['#test'],
      youtubeDescription: 'Test description',
    }
    act(() => {
      result.current.setCaptions(mockCaption)
    })
    expect(result.current.captions).toEqual(mockCaption)
  })
})
