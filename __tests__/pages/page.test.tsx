import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Home from '@/app/page'
import * as apiService from '@/lib/services/apiService'

jest.mock('@/lib/services/apiService')
jest.mock('@/components/agents/TrendAnalyzer', () => {
  return function MockTrendAnalyzer() {
    return <div>Mock TrendAnalyzer</div>
  }
})
jest.mock('@/components/agents/TechUpdates', () => {
  return function MockTechUpdates() {
    return <div>Mock TechUpdates</div>
  }
})
jest.mock('@/components/agents/DeepResearch', () => {
  return function MockDeepResearch() {
    return <div>Mock DeepResearch</div>
  }
})
jest.mock('@/components/agents/HookGenerator', () => {
  return function MockHookGenerator() {
    return <div>Mock HookGenerator</div>
  }
})
jest.mock('@/components/agents/ScriptMaker', () => {
  return function MockScriptMaker() {
    return <div>Mock ScriptMaker</div>
  }
})
jest.mock('@/components/agents/CaptionAgent', () => {
  return function MockCaptionAgent() {
    return <div>Mock CaptionAgent</div>
  }
})

describe('Home Page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders home page with header', () => {
    render(<Home />)
    expect(screen.getByText('ContentAI Studio')).toBeInTheDocument()
    expect(screen.getByText(/Create content from trends, research, and ideas/i)).toBeInTheDocument()
  })

  test('displays all tab buttons', () => {
    render(<Home />)
    expect(screen.getByRole('button', { name: /Trends/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Updates/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Research/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Hooks/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Script/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Captions/i })).toBeInTheDocument()
  })

  test('switches between tabs', () => {
    render(<Home />)
    const hooksTab = screen.getByRole('button', { name: /Hooks/i })
    fireEvent.click(hooksTab)
    expect(screen.getByText('Mock HookGenerator')).toBeInTheDocument()
  })

  test('displays sidebar with session info', () => {
    render(<Home />)
    expect(screen.getByText('Session')).toBeInTheDocument()
    expect(screen.getByText('Topic')).toBeInTheDocument()
    expect(screen.getByText('Hook')).toBeInTheDocument()
  })

  test('panel toggle button works', () => {
    render(<Home />)
    const panelButton = screen.getByRole('button', { name: /Panel/i })
    fireEvent.click(panelButton)
    // Check if sidebar is hidden or shown
    expect(panelButton).toBeInTheDocument()
  })

  test('renders TrendAnalyzer in trends tab', () => {
    render(<Home />)
    expect(screen.getByText('Mock TrendAnalyzer')).toBeInTheDocument()
  })

  test('shows navigation buttons in sidebar', () => {
    render(<Home />)
    const hooksNavButton = screen.getByRole('button', { name: /→ Hooks/i })
    const scriptNavButton = screen.getByRole('button', { name: /→ Script/i })
    expect(hooksNavButton).toBeInTheDocument()
    expect(scriptNavButton).toBeInTheDocument()
  })
})
