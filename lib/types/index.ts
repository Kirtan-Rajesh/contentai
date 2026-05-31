// Type definitions for the agent system

export interface Trend {
  id: string
  title: string
  url: string
  points: number
  hooks: string[]
  audience: string
  timestamp: Date
  reasoning?: string
}

export interface ContentAngle {
  title: string
  angle: string
  contentIdeas: string[]
}

export interface TechUpdate {
  id: string
  title: string
  source: string
  link: string
  contentAngles: ContentAngle[]
  timestamp: Date
  reasoning?: string
}

export interface DeepResearchResult {
  query: string
  summary: string
  keyFindings: string[]
  contentAngles: string[]
  references: Reference[]
}

export interface Reference {
  title: string
  url: string
  source: string
}

export interface HookOption {
  type: 'question' | 'problem' | 'result' | 'controversy' | 'relatable'
  text: string
}

export interface Script {
  topic: string
  hook: string
  body: string
  cta: string
  fullScript: string
}

export interface Caption {
  text: string
  hashtags: string[]
  youtubeDescription: string
}

export interface AgentState {
  activeTab: 'trends' | 'updates' | 'research' | 'hooks' | 'script' | 'captions' | 'settings'
  loading: boolean
  error: string | null
  selectedTopic: string | null
  selectedHook: HookOption | null
  selectedReasoning: string | null
}
