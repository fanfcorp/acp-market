import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create the refined category structure
  const categories = [
    // I. Core Infrastructure
    {
      name: "Agent Infrastructure & APIs",
      slug: "agent-infrastructure-apis",
      description: "Core infrastructure for building and deploying AI agents, including APIs, frameworks, and foundational tools.",
      icon: "⚙️",
      color: "#3b82f6",
      sortOrder: 1,
      children: []
    },
    {
      name: "Data, Intelligence & Automation",
      slug: "data-intelligence-automation", 
      description: "Data processing, machine learning, and automation tools for intelligent agent behavior.",
      icon: "🧠",
      color: "#8b5cf6",
      sortOrder: 2,
      children: []
    },
    {
      name: "Security, Identity & Trust",
      slug: "security-identity-trust",
      description: "Security frameworks, identity management, and trust mechanisms for secure agent interactions.",
      icon: "🔒",
      color: "#ef4444",
      sortOrder: 3,
      children: []
    },
    {
      name: "Commerce & Transaction Layer",
      slug: "commerce-transaction-layer",
      description: "Payment processing, transaction management, and commerce-specific agent capabilities.",
      icon: "💳",
      color: "#10b981",
      sortOrder: 4,
      children: []
    },

    // II. Experience & Coordination
    {
      name: "CMS & Content Agents",
      slug: "cms-content-agents",
      description: "Content management systems and agents for content creation, curation, and publishing.",
      icon: "📝",
      color: "#f59e0b",
      sortOrder: 5,
      children: []
    },
    {
      name: "Design, Marketing & Creative Agents",
      slug: "design-marketing-creative-agents",
      description: "Design tools, marketing automation, and creative AI agents for visual and creative tasks.",
      icon: "🎨",
      color: "#ec4899",
      sortOrder: 6,
      children: []
    },
    {
      name: "Productivity & Workflow Agents",
      slug: "productivity-workflow-agents",
      description: "Productivity tools and workflow automation agents for business processes.",
      icon: "⚡",
      color: "#06b6d4",
      sortOrder: 7,
      children: []
    },
    {
      name: "Collaboration & Governance",
      slug: "collaboration-governance",
      description: "Collaboration platforms, governance frameworks, and team coordination agents.",
      icon: "🤝",
      color: "#84cc16",
      sortOrder: 8,
      children: []
    },

    // III. Vertical Economies
    {
      name: "Banking & Financial Agents",
      slug: "banking-financial-agents",
      description: "Specialized agents for banking, financial services, and fintech applications.",
      icon: "🏦",
      color: "#6366f1",
      sortOrder: 9,
      children: []
    },
    {
      name: "Insurance & Risk Agents",
      slug: "insurance-risk-agents",
      description: "Insurance processing, risk assessment, and actuarial agents.",
      icon: "🛡️",
      color: "#f97316",
      sortOrder: 10,
      children: []
    },
    {
      name: "E-Commerce & Retail Agents",
      slug: "ecommerce-retail-agents",
      description: "E-commerce platforms, retail automation, and commerce-specific agents.",
      icon: "🛒",
      color: "#14b8a6",
      sortOrder: 11,
      children: []
    },
    {
      name: "Legal & Compliance Agents",
      slug: "legal-compliance-agents",
      description: "Legal research, compliance monitoring, and regulatory agents.",
      icon: "⚖️",
      color: "#64748b",
      sortOrder: 12,
      children: []
    }
  ]

  // Create categories in the database
  for (const categoryData of categories) {
    const { children, ...categoryCreateData } = categoryData
    const category = await prisma.category.upsert({
      where: { slug: categoryData.slug },
      update: {
        name: categoryData.name,
        description: categoryData.description,
        icon: categoryData.icon,
        color: categoryData.color,
        sortOrder: categoryData.sortOrder
      },
      create: categoryCreateData
    })
    console.log(`✅ Created category: ${category.name}`)
  }

  // Create some sample ACP servers for demonstration
  const sampleServers = [
    {
      slug: "stripe-acp-server",
      name: "Stripe ACP Server",
      description: "Official Stripe integration for Agentic Commerce Protocol. Process payments, manage subscriptions, and handle commerce transactions through AI agents.",
      website: "https://stripe.com",
      githubUrl: "https://github.com/stripe/acp-server",
      logoUrl: "https://stripe.com/img/v3/home/social.png",
      primaryCategorySlug: "commerce-transaction-layer",
      sourceCategory: "Payments",
      tags: ["payments", "subscriptions", "commerce", "api"],
      protocolSupport: ["ACP v0.3", "MCP"],
      status: "active",
      featured: true,
      verified: true,
      stars: 2847,
      downloads: 15420,
      documentation: "Complete documentation for integrating Stripe payments with AI agents using ACP.",
      examples: "Examples for subscription management, one-time payments, and refunds.",
      installation: "npm install @stripe/acp-server"
    },
    {
      slug: "openai-whisper-acp",
      name: "OpenAI Whisper ACP",
      description: "Speech-to-text agent using OpenAI's Whisper model. Convert audio files and real-time speech to text with high accuracy.",
      website: "https://openai.com/research/whisper",
      githubUrl: "https://github.com/openai/whisper",
      logoUrl: "https://openai.com/content/images/2022/05/openai-avatar.png",
      primaryCategorySlug: "data-intelligence-automation",
      sourceCategory: "Audio Processing",
      tags: ["speech-to-text", "audio", "ml", "transcription"],
      protocolSupport: ["ACP v0.3", "MCP", "LangGraph"],
      status: "active",
      featured: true,
      verified: true,
      stars: 45672,
      downloads: 89234,
      documentation: "Comprehensive guide for audio processing and speech recognition.",
      examples: "Examples for real-time transcription, batch processing, and multi-language support.",
      installation: "pip install openai-whisper-acp"
    },
    {
      slug: "github-copilot-acp",
      name: "GitHub Copilot ACP",
      description: "AI-powered coding assistant integrated with ACP. Get intelligent code suggestions, refactoring, and debugging assistance.",
      website: "https://github.com/features/copilot",
      githubUrl: "https://github.com/github/copilot-acp",
      logoUrl: "https://github.githubassets.com/images/modules/site/copilot/copilot-logo.png",
      primaryCategorySlug: "agent-infrastructure-apis",
      sourceCategory: "Developer Tools",
      tags: ["coding", "ai-assistant", "development", "ide"],
      protocolSupport: ["ACP v0.3", "MCP"],
      status: "active",
      featured: true,
      verified: true,
      stars: 12345,
      downloads: 67890,
      documentation: "Developer guide for integrating Copilot with ACP workflows.",
      examples: "Code completion, refactoring, and debugging examples.",
      installation: "Install via VS Code extension or GitHub CLI"
    },
    {
      slug: "anthropic-claude-acp",
      name: "Anthropic Claude ACP",
      description: "Advanced AI assistant for complex reasoning, analysis, and creative tasks. Built for safety and helpfulness.",
      website: "https://anthropic.com/claude",
      githubUrl: "https://github.com/anthropics/claude-acp",
      logoUrl: "https://anthropic.com/assets/images/claude-avatar.png",
      primaryCategorySlug: "data-intelligence-automation",
      sourceCategory: "AI Models",
      tags: ["llm", "reasoning", "analysis", "safety"],
      protocolSupport: ["ACP v0.3", "MCP", "LangGraph"],
      status: "active",
      featured: true,
      verified: true,
      stars: 9876,
      downloads: 54321,
      documentation: "Complete API reference and integration guide for Claude.",
      examples: "Examples for text analysis, code generation, and creative writing.",
      installation: "pip install anthropic-claude-acp"
    },
    {
      slug: "slack-bot-acp",
      name: "Slack Bot ACP",
      description: "Enterprise communication agent for Slack. Automate workflows, manage notifications, and integrate with business tools.",
      website: "https://api.slack.com/bot-users",
      githubUrl: "https://github.com/slackapi/slack-bot-acp",
      logoUrl: "https://a.slack-edge.com/80588/marketing/img/icons/icon_slack_hash_colored.png",
      primaryCategorySlug: "collaboration-governance",
      sourceCategory: "Communication",
      tags: ["slack", "communication", "automation", "workflow"],
      protocolSupport: ["ACP v0.3", "MCP"],
      status: "active",
      featured: false,
      verified: true,
      stars: 5432,
      downloads: 32109,
      documentation: "Slack bot development and integration guide.",
      examples: "Examples for message automation, workflow triggers, and team coordination.",
      installation: "npm install slack-bot-acp"
    }
  ]

  // Create sample ACP servers
  for (const serverData of sampleServers) {
    // Get the category ID
    const category = await prisma.category.findUnique({
      where: { slug: serverData.primaryCategorySlug }
    })

    if (category) {
      const { primaryCategorySlug, ...serverCreateData } = serverData
      
      const server = await prisma.aCPServer.upsert({
        where: { slug: serverData.slug },
        update: {
          ...serverCreateData,
          primaryCategoryId: category.id
        },
        create: {
          ...serverCreateData,
          primaryCategoryId: category.id
        }
      })
      console.log(`✅ Created ACP server: ${server.name}`)
    }
  }

  console.log('🎉 Database seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
