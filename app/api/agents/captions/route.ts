import { NextRequest, NextResponse } from 'next/server'
import { Caption } from '@/lib/types'

export async function POST(request: NextRequest) {
  try {
    const { script } = await request.json()

    if (!script) {
      return NextResponse.json(
        { success: false, error: 'Script is required' },
        { status: 400 }
      )
    }

    // TODO: Replace with Claude generation
    const mockCaption: Caption = {
      text: `Just dropped a deep dive on the latest AI trends 🔥

This 60-second breakdown covers:
- What's actually happening
- Why it matters for you
- How to get started immediately

Watch till the end for the live demo 👇`,
      hashtags: [
        '#AI',
        '#MachineLearning',
        '#TechTrends',
        '#AIEngineering',
        '#DeepLearning',
        '#ContentCreator',
        '#TechEducation',
        '#ArtificialIntelligence',
      ],
      youtubeDescription: `Join me for a deep dive into the latest AI and tech trends!

In this video, I break down:
- The latest developments in AI
- Why this matters for creators and engineers
- How you can leverage this immediately

Timestamps:
0:00 Hook
0:30 What's happening
1:00 Why it matters
1:30 Live demo
2:00 How to get started

Resources mentioned:
- [Links will be auto-generated based on research]

Drop a comment below with your thoughts on this trend!

#AI #MachineLearning #DeepLearning`,
    }

    return NextResponse.json({
      success: true,
      caption: mockCaption,
    })
  } catch (error) {
    console.error('Error in captions agent:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to generate captions' },
      { status: 500 }
    )
  }
}
