import { NextRequest, NextResponse } from 'next/server'
import { DeepResearchResult, Reference } from '@/lib/types'

const summaryTemplates = [
  'Research on "${query}": This topic combines cutting-edge research with practical implications. The latest developments show significant progress in efficiency, performance, and scalability.',
  'Deep analysis of "${query}": Emerging results point to a strong shift in how teams approach innovation, adoption, and product fit.',
  'Investigation into "${query}": The latest updates reveal an interesting balance between speed, cost, and user impact.',
]

const findingsTemplates = [
  'Finding 1: Recent breakthrough in model architecture efficiency',
  'Finding 2: Open-source implementations now available',
  'Finding 3: Real-world applications showing 40% performance improvements',
  'Finding 4: Integration with existing tools becoming seamless',
  'Finding 5: New benchmarks show measurable gains in latency and throughput',
  'Finding 6: Adoption is accelerating in creator and developer communities',
]

const angleTemplates = [
  '"Why ${query} matters in 2025 - the 2-minute breakdown"',
  '"We compared ${query} with alternatives - here is what won"',
  '"Building with ${query}: Live demo in 60 seconds"',
  '"The hidden advantage of ${query} nobody is talking about"',
  '"How ${query} can reshape your content workflow today"',
]

const referenceTemplates: Reference[] = [
  {
    title: 'Research Paper: Architecture Innovations',
    url: 'https://arxiv.org',
    source: 'arXiv',
  },
  {
    title: 'Technical Blog: Implementation Guide',
    url: 'https://medium.com',
    source: 'Medium',
  },
  {
    title: 'GitHub: Open Source Implementation',
    url: 'https://github.com',
    source: 'GitHub',
  },
  {
    title: 'Industry Report: Trends and Adoption',
    url: 'https://techcrunch.com',
    source: 'TechCrunch',
  },
  {
    title: 'Community Notes: Practical Use Cases',
    url: 'https://dev.to',
    source: 'DEV',
  },
]

const shuffle = <T,>(items: T[]): T[] => [...items].sort(() => Math.random() - 0.5)
const chooseRandom = <T,>(items: T[]): T => items[Math.floor(Math.random() * items.length)]

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json()

    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Query is required' },
        { status: 400 }
      )
    }

    const selectedFindings = shuffle(findingsTemplates).slice(0, 4)
    const selectedAngles = shuffle(angleTemplates).slice(0, 3).map((template) =>
      template.replace(/\$\{query\}/g, query)
    )
    const selectedRefs = shuffle(referenceTemplates).slice(0, 3)

    const mockResult: DeepResearchResult = {
      query,
      summary: chooseRandom(summaryTemplates).replace(/\$\{query\}/g, query),
      keyFindings: selectedFindings,
      contentAngles: selectedAngles,
      references: selectedRefs,
    }

    return NextResponse.json({
      success: true,
      result: mockResult,
    })
  } catch (error) {
    console.error('Error in research agent:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process research request' },
      { status: 500 }
    )
  }
}
