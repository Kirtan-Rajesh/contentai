import { NextRequest, NextResponse } from 'next/server'
import { HookOption } from '@/lib/types'

const hookPool: Record<HookOption['type'], string[]> = {
  question: [
    'What if ${topic} changes everything about how we build AI?',
    'Could ${topic} be the missing piece creators are ignoring?',
    'What would happen if ${topic} became the new standard?',
  ],
  problem: [
    'The problem with current ${topic} nobody talks about...',
    'Why ${topic} is causing hidden issues for teams right now.',
    'The unseen risk of ${topic} in your next launch.',
  ],
  result: [
    'I tested ${topic} for 2 weeks. Here is the real outcome.',
    'After using ${topic}, I found one surprising result.',
    'This is what happened when we applied ${topic} to a live workflow.',
  ],
  controversy: [
    '${topic} just killed the entire previous approach.',
    'Why some experts say ${topic} is the last thing you should trust.',
    'Controversy: ${topic} is reshaping the rules of the game.',
  ],
  relatable: [
    'Every AI engineer needs to know about ${topic}. Here is why.',
    'If you are building with AI, ${topic} should be on your radar.',
    'Creators who understand ${topic} are already ahead.',
  ],
}

const chooseRandom = <T,>(items: T[]): T => items[Math.floor(Math.random() * items.length)]

export async function POST(request: NextRequest) {
  try {
    const { topic } = await request.json()

    if (!topic || typeof topic !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Topic is required' },
        { status: 400 }
      )
    }

    const mockHooks: HookOption[] = (Object.keys(hookPool) as HookOption['type'][]).map(
      (type) => ({
        type,
        text: chooseRandom(hookPool[type]).replace(/\$\{topic\}/g, topic),
      })
    )

    return NextResponse.json({
      success: true,
      hooks: mockHooks,
    })
  } catch (error) {
    console.error('Error in hooks agent:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to generate hooks' },
      { status: 500 }
    )
  }
}
