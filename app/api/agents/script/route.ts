import { NextRequest, NextResponse } from 'next/server'
import { Script } from '@/lib/types'

export async function POST(request: NextRequest) {
  try {
    const { topic, hook } = await request.json()

    if (!topic || !hook) {
      return NextResponse.json(
        { success: false, error: 'Topic and hook are required' },
        { status: 400 }
      )
    }

    // TODO: Replace with Claude generation
    const mockScript: Script = {
      topic,
      hook,
      body: `[00-30s] Let me break down the key insights:

1. First, what's actually happening with ${topic}
2. Why this matters for you as a creator
3. The three things you need to know right now

[30-45s] Live demo / Example / Comparison showing the impact

[45-60s] How to get started immediately`,
      cta: 'Drop a comment if you want a deep dive on this',
      fullScript: `[Hook - 0-5s]
${hook}

[Body - 5-50s]
Let me break down the key insights about ${topic}:

1. What's actually happening: Recent developments show...
2. Why it matters for you: Direct impact on workflows
3. The three critical things to know

Real-world example: This translates to...

[CTA - 50-60s]
${topic} is evolving fast. Drop a comment if you want deeper tutorials on this.`,
    }

    return NextResponse.json({
      success: true,
      script: mockScript,
    })
  } catch (error) {
    console.error('Error in script agent:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to generate script' },
      { status: 500 }
    )
  }
}
