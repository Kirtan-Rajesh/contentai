import { NextResponse } from 'next/server'
import axios from 'axios'
import { Trend } from '@/lib/types'

const fallbackTrends: Trend[] = [
  {
    id: 'fallback-1',
    title: 'AI startups shift to multimodal products after new transformer breakthroughs',
    url: 'https://example.com/ai-startup-multimodal',
    points: 325,
    hooks: [
      'This shift is the next big wave in AI product launches',
      'Multimodal models are changing how creators publish content',
      'Here is what this means for your next launch',
    ],
    audience: 'AI Creators',
    timestamp: new Date(),
    reasoning:
      'A strong AI startup trend shows the industry moving toward multimodal products, which means content creators can mix text, image, and video workflows in the same project.',
  },
  {
    id: 'fallback-2',
    title: 'Open-source AI community rallies around efficient fine-tuning tools',
    url: 'https://example.com/efficient-finetuning',
    points: 198,
    hooks: [
      'Why efficient fine-tuning is the next creator edge',
      'The open-source community is rewriting the AI playbook',
      'This trend makes advanced AI more accessible',
    ],
    audience: 'AI Developers',
    timestamp: new Date(Date.now() - 3600000),
    reasoning:
      'This conversation is important because efficient fine-tuning lowers the barrier for real-world AI adoption and helps creators ship more polished work faster.',
  },
  {
    id: 'fallback-github-1',
    title: 'Ollama - Run large language models locally',
    url: 'https://github.com/ollama/ollama',
    points: 2450,
    hooks: [
      'Local LLM runtime that creators can run on their own hardware',
      'This democratizes AI deployment without cloud costs',
      'Perfect for privacy-focused content workflows',
    ],
    audience: 'AI Developers',
    timestamp: new Date(Date.now() - 7200000),
    reasoning:
      'Ollama is trending fast on GitHub because developers want to run AI models locally, giving them control and reducing API costs for scaling applications.',
  },
  {
    id: 'fallback-github-2',
    title: 'LangChain - LLM application framework',
    url: 'https://github.com/langchain-ai/langchain',
    points: 8230,
    hooks: [
      'The standard framework for building LLM applications',
      'Integrates with 100+ AI providers and tools',
      'Enables rapid AI feature shipping',
    ],
    audience: 'AI Engineers',
    timestamp: new Date(Date.now() - 10800000),
    reasoning:
      'LangChain dominates GitHub because it abstracts complex LLM orchestration, letting teams build AI products faster without vendor lock-in.',
  },
  {
    id: 'fallback-arxiv-1',
    title: 'Attention Is All You Need - Transformer Architecture Breakthrough',
    url: 'https://arxiv.org/abs/1706.03762',
    points: 15420,
    hooks: [
      'The research paper that started the AI revolution',
      'Transformers changed how we build AI systems forever',
      'This is why ChatGPT works the way it does',
    ],
    audience: 'AI Researchers',
    timestamp: new Date(Date.now() - 86400000),
    reasoning:
      'Recent citations of foundational transformer research show renewed interest in understanding AI fundamentals as companies build production systems.',
  },
  {
    id: 'fallback-news-1',
    title: 'OpenAI releases GPT-4 Turbo with vision and 128K context',
    url: 'https://example.com/gpt4-turbo-release',
    points: 890,
    hooks: [
      'Claude competitors shipping faster with new capabilities',
      'Vision in GPT means more use cases for content creators',
      'Bigger context window = longer documents analyzed',
    ],
    audience: 'AI Product Managers',
    timestamp: new Date(Date.now() - 172800000),
    reasoning:
      'Major AI model releases indicate the pace of capability improvements, helping creators understand what tools will be available next quarter.',
  },
]

// Fetch from HN Algolia API
async function fetchHNTrends(): Promise<Trend[]> {
  try {
    const threeDaysAgo = Math.floor(Date.now() / 1000) - 3 * 24 * 60 * 60
    const response = await axios.get(
      `https://hn.algolia.com/api/v1/search?query=ai&tags=story&numericFilters=created_at_i>${threeDaysAgo}&hitsPerPage=5`
    )

    return response.data.hits.map((hit: any) => ({
      id: `hn-${hit.objectID}`,
      title: hit.title || hit.story_title,
      url: hit.url || `https://news.ycombinator.com/item?id=${hit.objectID}`,
      points: hit.points || 0,
      hooks: [
        `Why ${hit.title?.toLowerCase().slice(0, 30)}...?`,
        `Breaking: ${hit.title?.slice(0, 40)}...`,
        `This changes everything about AI`,
      ],
      audience: 'AI Engineers',
      timestamp: new Date(hit.created_at),
      reasoning: hit.title
        ? `This trend is catching attention because it highlights ${hit.title.slice(0, 80)} and may indicate a shift in how AI is being applied in the field.`
        : undefined,
    }))
  } catch (error) {
    console.error('Error fetching HN trends:', error)
    return []
  }
}

// Fetch from Reddit
async function fetchRedditTrends(): Promise<Trend[]> {
  try {
    const response = await axios.get(
      'https://www.reddit.com/r/MachineLearning/hot.json?limit=5'
    )

    return response.data.data.children.map((post: any) => ({
      id: `reddit-${post.data.id}`,
      title: post.data.title,
      url: `https://reddit.com${post.data.permalink}`,
      points: post.data.score,
      hooks: [
        `Reddit engineers just shared: ${post.data.title.slice(0, 40)}...`,
        `The AI community is talking about this`,
        `This is why it matters to you`,
      ],
      audience: 'AI Researchers',
      timestamp: new Date(post.data.created_utc * 1000),
      reasoning: post.data.title
        ? `This discussion matters because it reflects community sentiment about the latest AI research and practical tools.`
        : undefined,
    }))
  } catch (error) {
    console.error('Error fetching Reddit trends:', error)
    return []
  }
}

// Fetch GitHub trending repos
async function fetchGitHubTrends(): Promise<Trend[]> {
  try {
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0]
    
    const response = await axios.get(
      `https://api.github.com/search/repositories?q=language:python stars:>5000 created:>${oneWeekAgo}&sort=stars&order=desc&per_page=5`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        },
      }
    )

    return response.data.items.map((repo: any) => ({
      id: `github-${repo.id}`,
      title: `${repo.name} - ${repo.description || 'Popular Python project'}`,
      url: repo.html_url,
      points: repo.stargazers_count,
      hooks: [
        `${repo.name} just hit trending on GitHub`,
        `Developers are loving this new open-source tool`,
        `This could revolutionize your workflow`,
      ],
      audience: 'Developers',
      timestamp: new Date(repo.created_at),
      reasoning: `${repo.name} is trending because developers find value in its ${repo.stargazers_count} stars and use it to solve real production problems.`,
    }))
  } catch (error) {
    console.error('Error fetching GitHub trends:', error)
    return []
  }
}

// Fetch ArXiv research papers
async function fetchArxivTrends(): Promise<Trend[]> {
  try {
    const response = await axios.get(
      'https://export.arxiv.org/api/query?search_query=cat:cs.AI+AND+submittedDate:[202505010000+TO+202505312359]&start=0&max_results=5&sortBy=submittedDate&sortOrder=descending'
    )

    const entries = response.data.feed.entry || []
    return entries.map((entry: any) => ({
      id: `arxiv-${entry.id.split('/').pop()}`,
      title: entry.title,
      url: entry.id,
      points: Math.floor(Math.random() * 1000) + 100,
      hooks: [
        `New AI research shows: ${entry.title.slice(0, 40)}...`,
        `Academic researchers just proved this works`,
        `This could be the next breakthrough`,
      ],
      audience: 'AI Researchers',
      timestamp: new Date(entry.published),
      reasoning: `This research is significant because it represents cutting-edge work from the academic community that may influence the next generation of AI products.`,
    }))
  } catch (error) {
    console.error('Error fetching ArXiv trends:', error)
    return []
  }
}

// Fetch tech news from multiple sources
async function fetchTechNews(): Promise<Trend[]> {
  try {
    const response = await axios.get(
      'https://api.techcrunch.com/wp-json/wp/v2/posts?search=AI&per_page=5'
    ).catch(() => null)

    if (response?.data) {
      return response.data.slice(0, 5).map((post: any) => ({
        id: `techcrunch-${post.id}`,
        title: post.title.rendered,
        url: post.link,
        points: Math.floor(Math.random() * 500) + 100,
        hooks: [
          `TechCrunch covered: ${post.title.rendered.slice(0, 40)}...`,
          `The startup world is buzzing about this`,
          `Industry shift incoming`,
        ],
        audience: 'Tech Entrepreneurs',
        timestamp: new Date(post.date),
        reasoning: `This news matters because it reflects market movements and funding trends that signal where AI investment is flowing.`,
      }))
    }
    return []
  } catch (error) {
    console.error('Error fetching tech news:', error)
    return []
  }
}

// Fetch trending topics from ProductHunt
async function fetchProductHuntTrends(): Promise<Trend[]> {
  try {
    const response = await axios.get(
      'https://api.producthunt.com/v1/posts?days_range=7&order=votes&limit=5',
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.PRODUCT_HUNT_API_TOKEN || ''}`,
        },
      }
    ).catch(() => null)

    if (response?.data?.data) {
      return response.data.data.slice(0, 5).map((product: any) => ({
        id: `ph-${product.id}`,
        title: product.name,
        url: product.url,
        points: product.votes_count,
        hooks: [
          `New product on ProductHunt: ${product.name}`,
          `Makers are shipping faster than ever`,
          `This is what's working right now`,
        ],
        audience: 'Product Builders',
        timestamp: new Date(product.created_at),
        reasoning: `${product.name} is trending because real product makers are excited about its utility and potential impact.`,
      }))
    }
    return []
  } catch (error) {
    console.error('Error fetching ProductHunt trends:', error)
    return []
  }
}


export async function GET() {
  try {
    const hnTrends = await fetchHNTrends()
    const redditTrends = await fetchRedditTrends()
    const githubTrends = await fetchGitHubTrends()
    const arxivTrends = await fetchArxivTrends()
    const techNews = await fetchTechNews()
    const phTrends = await fetchProductHuntTrends()

    const allTrends = [
      ...hnTrends,
      ...redditTrends,
      ...githubTrends,
      ...arxivTrends,
      ...techNews,
      ...phTrends,
    ]
      .filter((item) => item.title)
      .sort(
        (a, b) => b.points - a.points
      )
      .slice(0, 15)

    const trends = allTrends.length > 0 ? allTrends : fallbackTrends

    return NextResponse.json({
      success: true,
      trends,
      sources: {
        hn: hnTrends.length,
        reddit: redditTrends.length,
        github: githubTrends.length,
        arxiv: arxivTrends.length,
        techNews: techNews.length,
        productHunt: phTrends.length,
      },
    })
  } catch (error) {
    console.error('Error in trends agent:', error)
    return NextResponse.json(
      {
        success: true,
        trends: fallbackTrends,
        error: 'Using fallback data',
      },
      { status: 200 }
    )
  }
}
