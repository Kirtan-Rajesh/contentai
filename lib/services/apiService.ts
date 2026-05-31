import axios from 'axios'
import {
  Trend,
  TechUpdate,
  DeepResearchResult,
  HookOption,
  Script,
  Caption,
} from '@/lib/types'

const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api'

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 30000,
})

// Trend Analyzer
export async function getTrends(): Promise<Trend[]> {
  const response = await apiClient.get('/agents/trends')
  return response.data.trends
}

// Tech Updates
export async function getTechUpdates(): Promise<TechUpdate[]> {
  const response = await apiClient.get('/agents/updates')
  return response.data.updates
}

// Deep Research
export async function deepResearch(query: string): Promise<DeepResearchResult> {
  const response = await apiClient.post('/agents/research', { query })
  return response.data.result
}

// Hook Generator
export async function generateHooks(topic: string): Promise<HookOption[]> {
  const response = await apiClient.post('/agents/hooks', { topic })
  return response.data.hooks
}

// Script Maker
export async function generateScript(topic: string, hook: string): Promise<Script> {
  const response = await apiClient.post('/agents/script', { topic, hook })
  return response.data.script
}

// Caption Agent
export async function generateCaption(script: string): Promise<Caption> {
  const response = await apiClient.post('/agents/captions', { script })
  return response.data.caption
}

// Telegram notification
export async function sendToTelegram(message: string): Promise<void> {
  await apiClient.post('/telegram/send', { message })
}

export default apiClient
