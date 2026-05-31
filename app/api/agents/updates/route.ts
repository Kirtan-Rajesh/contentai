import { NextResponse } from 'next/server'
import axios from 'axios'
import { TechUpdate } from '@/lib/types'

const fallbackUpdates: TechUpdate[] = [
  {
    id: 'tech-1',
    title: 'OpenAI Releases GPT-4 Turbo Updates',
    source: 'OpenAI Blog',
    link: 'https://openai.com',
    contentAngles: [
      {
        title: 'Speed Improvements',
        angle:
          'GPT-4 Turbo is 3x faster - this matters for creators because real-time generation = more engagement in live streams',
        contentIdeas: [
          'Breakdown: How it works',
          'Demo: Live streaming with AI',
          'Comparison: Speed test',
        ],
      },
      {
        title: 'Cost Reduction',
        angle:
          '50% cheaper API calls - independent creators can now build AI tools profitably',
        contentIdeas: [
          'Tutorial: Budget AI apps',
          'Case study: ROI analysis',
          'Tools roundup',
        ],
      },
    ],
    timestamp: new Date(),
    reasoning:
      'The update is significant because it makes high-quality AI generation more affordable and faster for creators, which can directly improve video scripting and content workflows.',
  },
  {
    id: 'tech-2',
    title: 'DeepSeek Releases New MoE Model',
    source: 'arXiv',
    link: 'https://arxiv.org',
    contentAngles: [
      {
        title: 'Architecture Innovation',
        angle:
          'New MoE design beats Transformer on efficiency - critical for on-device AI and mobile deployment',
        contentIdeas: [
          'Technical deep dive',
          'Live demo',
          'Why it matters for your phone',
        ],
      },
    ],
    timestamp: new Date(Date.now() - 86400000),
    reasoning:
      'This model update matters because it highlights a shift toward efficient AI that can run on consumer devices, making advanced tools more accessible to creators and developers alike.',
  },
  {
    id: 'tech-3',
    title: 'Anthropic Claude 3 Haiku Released',
    source: 'Anthropic',
    link: 'https://anthropic.com',
    contentAngles: [
      {
        title: 'Fastest Model Yet',
        angle: 'Claude 3 Haiku hits API costs lower than GPT-3.5 while matching GPT-4 quality on many tasks',
        contentIdeas: [
          'Benchmark comparison',
          'Use case deep dive',
          'Migration guide from GPT-3.5',
        ],
      },
    ],
    timestamp: new Date(Date.now() - 172800000),
    reasoning:
      'The release signals competition driving innovation in LLM efficiency, giving creators more options for AI infrastructure.',
  },
]

// Fetch tech news from news APIs
async function fetchTechNewsUpdates(): Promise<TechUpdate[]> {
  try {
    // Using free NewsAPI endpoint for tech news
    const response = await axios.get(
      'https://newsapi.org/v2/everything?q=AI%20OR%20machine%20learning&language=en&sortBy=publishedAt&pageSize=5'
    ).catch(() => null)

    if (response?.data?.articles) {
      return response.data.articles.slice(0, 5).map((article: any) => ({
        id: `news-${article.url}`,
        title: article.title,
        source: article.source.name,
        link: article.url,
        contentAngles: [
          {
            title: 'Breaking News',
            angle: article.description,
            contentIdeas: [
              'React quickly to news',
              'Interview angle',
              'Implications for creators',
            ],
          },
        ],
        timestamp: new Date(article.publishedAt),
        reasoning: `This news is trending because ${article.description?.slice(0, 60)}...`,
      }))
    }
    return []
  } catch (error) {
    console.error('Error fetching tech news:', error)
    return []
  }
}

// Fetch latest research papers
async function fetchResearchPapers(): Promise<TechUpdate[]> {
  try {
    const response = await axios.get(
      'https://export.arxiv.org/api/query?search_query=cat:cs.AI+AND+submittedDate:[202505010000+TO+202505312359]&start=0&max_results=5&sortBy=submittedDate&sortOrder=descending'
    )

    const entries = response.data.feed.entry || []
    return entries.map((entry: any) => ({
      id: `arxiv-${entry.id.split('/').pop()}`,
      title: entry.title,
      source: 'arXiv',
      link: entry.id,
      contentAngles: [
        {
          title: 'Research Breakdown',
          angle: `New paper: ${entry.title.slice(0, 60)}...`,
          contentIdeas: [
            'Explain like I\'m 5 video',
            'Implementation walkthrough',
            'Commercial applications',
          ],
        },
      ],
      timestamp: new Date(entry.published),
      reasoning:
        'Academic research represents the cutting edge of AI development that will power products in 6-12 months.',
    }))
  } catch (error) {
    console.error('Error fetching research papers:', error)
    return []
  }
}

// Fetch GitHub releases (major version updates)
async function fetchGitHubReleases(): Promise<TechUpdate[]> {
  try {
    // Fallback: fetch specific popular repos' releases
    const repos = ['openai/whisper', 'openai/gpt-4', 'huggingface/transformers']
    const releasePromises = repos.map(repo =>
      axios.get(`https://api.github.com/repos/${repo}/releases?per_page=1`).catch(() => null)
    )

    const responses = await Promise.all(releasePromises)
    const releases: TechUpdate[] = []

    responses.forEach((resp, idx) => {
      if (resp?.data?.[0]) {
        const release = resp.data[0]
        releases.push({
          id: `github-${release.id}`,
          title: `${repos[idx].split('/')[1]}: ${release.name}`,
          source: 'GitHub',
          link: release.html_url,
          contentAngles: [
            {
              title: 'Feature Update',
              angle: release.body?.slice(0, 100) || 'New release available',
              contentIdeas: [
                'What\'s new breakdown',
                'Migration guide',
                'Use case tutorial',
              ],
            },
          ],
          timestamp: new Date(release.published_at),
          reasoning: `This release matters because it brings new capabilities for developers building AI products.`,
        })
      }
    })

    return releases
  } catch (error) {
    console.error('Error fetching GitHub releases:', error)
    return []
  }
}

// Fetch tweets/posts from tech leaders (using fallback since no free Twitter API)
async function fetchTechLeaderPosts(): Promise<TechUpdate[]> {
  const mockLeaderUpdates: TechUpdate[] = [
    {
      id: 'tweet-1',
      title: 'Sam Altman: AI is the most powerful technology humanity has created',
      source: 'X (Twitter)',
      link: 'https://x.com',
      contentAngles: [
        {
          title: 'Vision Take',
          angle: 'Industry leaders predict AI adoption will accelerate in 2024',
          contentIdeas: [
            'Leadership commentary',
            'Industry predictions',
            'Opportunities emerging',
          ],
        },
      ],
      timestamp: new Date(Date.now() - 259200000),
      reasoning:
        'Tech leader insights signal where the industry is headed and what to prepare for.',
    },
  ]
  return mockLeaderUpdates
}

// Main fetch function - will integrate with Claude web search
async function fetchTechUpdates(): Promise<TechUpdate[]> {
  try {
    const [newsUpdates, papers, releases, leaderPosts] = await Promise.all([
      fetchTechNewsUpdates(),
      fetchResearchPapers(),
      fetchGitHubReleases(),
      fetchTechLeaderPosts(),
    ])

    const allUpdates = [
      ...newsUpdates,
      ...papers,
      ...releases,
      ...leaderPosts,
    ].filter((item) => item.title)

    return allUpdates.length > 0 ? allUpdates.slice(0, 10) : fallbackUpdates
  } catch (error) {
    console.error('Error fetching tech updates:', error)
    return fallbackUpdates
  }
}

export async function GET() {
  try {
    const updates = await fetchTechUpdates()

    return NextResponse.json({
      success: true,
      updates,
      count: updates.length,
    })
  } catch (error) {
    console.error('Error in updates agent:', error)
    return NextResponse.json(
      {
        success: true,
        updates: fallbackUpdates,
        error: 'Using fallback data',
      },
      { status: 200 }
    )
  }
}
