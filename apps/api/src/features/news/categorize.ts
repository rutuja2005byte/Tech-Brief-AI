import type { BriefCategory } from '@tech-brief-ai/domain';

const categoryKeywords: Record<BriefCategory, readonly string[]> = {
  ai: ['ai', 'llm', 'model', 'openai', 'anthropic', 'mistral', 'hugging face', 'machine learning'],
  cloud: ['cloud', 'aws', 'azure', 'gcp', 'serverless', 'cloudflare'],
  'developer-tools': ['developer', 'github', 'cli', 'sdk', 'api', 'tooling', 'release'],
  frontend: ['react', 'next.js', 'javascript', 'typescript', 'frontend', 'web'],
  infrastructure: ['docker', 'kubernetes', 'postgres', 'redis', 'database', 'infra'],
  mobile: ['mobile', 'expo', 'react native', 'ios', 'android'],
  product: ['product', 'launch', 'startup', 'growth', 'market'],
  security: ['security', 'vulnerability', 'privacy', 'breach', 'zero-day'],
  startups: ['startup', 'yc', 'funding', 'seed', 'series a', 'product hunt']
};

export function inferCategories(text: string) {
  const normalizedText = text.toLowerCase();
  const matches = Object.entries(categoryKeywords)
    .filter(([, keywords]) => keywords.some((keyword) => normalizedText.includes(keyword)))
    .map(([category]) => category as BriefCategory);

  return matches.length > 0 ? matches : (['developer-tools'] as const);
}
