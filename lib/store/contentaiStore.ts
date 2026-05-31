import { create } from 'zustand'
import {
  AgentState,
  Trend,
  TechUpdate,
  DeepResearchResult,
  HookOption,
  Script,
  Caption,
} from '@/lib/types'

interface ContentAIStore extends AgentState {
  trends: Trend[]
  updates: TechUpdate[]
  researchResult: DeepResearchResult | null
  hookOptions: HookOption[]
  scriptResult: Script | null
  captionResult: Caption | null

  // Actions
  setActiveTab: (tab: AgentState['activeTab']) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setSelectedTopic: (topic: string | null) => void
  setSelectedHook: (hook: HookOption | null) => void
  setSelectedReasoning: (reasoning: string | null) => void
  setTrends: (trends: Trend[]) => void
  setUpdates: (updates: TechUpdate[]) => void
  setResearchResult: (result: DeepResearchResult | null) => void
  setHookOptions: (options: HookOption[]) => void
  setScriptResult: (script: Script | null) => void
  setCaptionResult: (caption: Caption | null) => void
  resetState: () => void
}

const initialState: AgentState = {
  activeTab: 'trends',
  loading: false,
  error: null,
  selectedTopic: null,
  selectedHook: null,
  selectedReasoning: null,
}

export const useContentAIStore = create<ContentAIStore>((set) => ({
  ...initialState,
  trends: [],
  updates: [],
  researchResult: null,
  hookOptions: [],
  scriptResult: null,
  captionResult: null,

  setActiveTab: (tab) => set({ activeTab: tab }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setSelectedTopic: (topic) => set({ selectedTopic: topic }),
  setSelectedHook: (hook) => set({ selectedHook: hook }),
  setSelectedReasoning: (reasoning) => set({ selectedReasoning: reasoning }),
  setTrends: (trends) => set({ trends }),
  setUpdates: (updates) => set({ updates }),
  setResearchResult: (result) => set({ researchResult: result }),
  setHookOptions: (options) => set({ hookOptions: options }),
  setScriptResult: (script) => set({ scriptResult: script }),
  setCaptionResult: (caption) => set({ captionResult: caption }),
  resetState: () => set(initialState),
}))
