import type { NewsSourceKind } from '@tech-brief-ai/domain';

export interface SourceDefinition {
  readonly slug: string;
  readonly name: string;
  readonly kind: NewsSourceKind;
  readonly homepageUrl: string;
  readonly feedUrl: string | null;
  readonly enabled: boolean;
}

export const sourceDefinitions = [
  {
    slug: 'openai',
    name: 'OpenAI',
    kind: 'rss',
    homepageUrl: 'https://openai.com/news/',
    feedUrl: 'https://openai.com/news/rss.xml',
    enabled: true
  },
  {
    slug: 'anthropic',
    name: 'Anthropic',
    kind: 'rss',
    homepageUrl: 'https://www.anthropic.com/news',
    feedUrl: 'https://www.anthropic.com/news/rss.xml',
    enabled: true
  },
  {
    slug: 'google-ai',
    name: 'Google AI',
    kind: 'rss',
    homepageUrl: 'https://blog.google/technology/ai/',
    feedUrl: 'https://blog.google/technology/ai/rss/',
    enabled: true
  },
  {
    slug: 'meta-ai',
    name: 'Meta AI',
    kind: 'rss',
    homepageUrl: 'https://ai.meta.com/blog/',
    feedUrl: 'https://ai.meta.com/blog/rss/',
    enabled: true
  },
  {
    slug: 'mistral-ai',
    name: 'Mistral AI',
    kind: 'rss',
    homepageUrl: 'https://mistral.ai/news/',
    feedUrl: 'https://mistral.ai/news/rss.xml',
    enabled: true
  },
  {
    slug: 'hugging-face',
    name: 'Hugging Face',
    kind: 'rss',
    homepageUrl: 'https://huggingface.co/blog',
    feedUrl: 'https://huggingface.co/blog/feed.xml',
    enabled: true
  },
  {
    slug: 'dev-to',
    name: 'Dev.to',
    kind: 'rss',
    homepageUrl: 'https://dev.to/',
    feedUrl: 'https://dev.to/feed',
    enabled: true
  },
  {
    slug: 'hacker-news',
    name: 'Hacker News',
    kind: 'hacker-news',
    homepageUrl: 'https://news.ycombinator.com/',
    feedUrl: null,
    enabled: true
  },
  {
    slug: 'github-trending',
    name: 'GitHub Trending',
    kind: 'github',
    homepageUrl: 'https://github.com/trending',
    feedUrl: null,
    enabled: true
  },
  {
    slug: 'github-releases',
    name: 'GitHub Releases',
    kind: 'github',
    homepageUrl: 'https://github.com/',
    feedUrl: null,
    enabled: true
  },
  {
    slug: 'techcrunch',
    name: 'TechCrunch',
    kind: 'rss',
    homepageUrl: 'https://techcrunch.com/',
    feedUrl: 'https://techcrunch.com/feed/',
    enabled: true
  },
  {
    slug: 'the-verge',
    name: 'The Verge',
    kind: 'rss',
    homepageUrl: 'https://www.theverge.com/',
    feedUrl: 'https://www.theverge.com/rss/index.xml',
    enabled: true
  },
  {
    slug: 'ars-technica',
    name: 'Ars Technica',
    kind: 'rss',
    homepageUrl: 'https://arstechnica.com/',
    feedUrl: 'https://feeds.arstechnica.com/arstechnica/index',
    enabled: true
  },
  {
    slug: 'wired',
    name: 'Wired',
    kind: 'rss',
    homepageUrl: 'https://www.wired.com/',
    feedUrl: 'https://www.wired.com/feed/rss',
    enabled: true
  },
  {
    slug: 'aws',
    name: 'AWS',
    kind: 'rss',
    homepageUrl: 'https://aws.amazon.com/blogs/aws/',
    feedUrl: 'https://aws.amazon.com/blogs/aws/feed/',
    enabled: true
  },
  {
    slug: 'google-cloud',
    name: 'Google Cloud',
    kind: 'rss',
    homepageUrl: 'https://cloud.google.com/blog/',
    feedUrl: 'https://cloudblog.withgoogle.com/rss/',
    enabled: true
  },
  {
    slug: 'azure',
    name: 'Azure',
    kind: 'rss',
    homepageUrl: 'https://azure.microsoft.com/blog/',
    feedUrl: 'https://azure.microsoft.com/blog/feed/',
    enabled: true
  },
  {
    slug: 'cloudflare',
    name: 'Cloudflare',
    kind: 'rss',
    homepageUrl: 'https://blog.cloudflare.com/',
    feedUrl: 'https://blog.cloudflare.com/rss/',
    enabled: true
  },
  {
    slug: 'vercel',
    name: 'Vercel',
    kind: 'rss',
    homepageUrl: 'https://vercel.com/blog',
    feedUrl: 'https://vercel.com/atom',
    enabled: true
  },
  {
    slug: 'expo',
    name: 'Expo',
    kind: 'rss',
    homepageUrl: 'https://expo.dev/blog',
    feedUrl: 'https://expo.dev/blog/rss.xml',
    enabled: true
  },
  {
    slug: 'react-native',
    name: 'React Native',
    kind: 'rss',
    homepageUrl: 'https://reactnative.dev/blog',
    feedUrl: 'https://reactnative.dev/blog/rss.xml',
    enabled: true
  },
  {
    slug: 'next-js',
    name: 'Next.js',
    kind: 'rss',
    homepageUrl: 'https://nextjs.org/blog',
    feedUrl: 'https://nextjs.org/feed.xml',
    enabled: true
  },
  {
    slug: 'docker',
    name: 'Docker',
    kind: 'rss',
    homepageUrl: 'https://www.docker.com/blog/',
    feedUrl: 'https://www.docker.com/blog/feed/',
    enabled: true
  },
  {
    slug: 'kubernetes',
    name: 'Kubernetes',
    kind: 'rss',
    homepageUrl: 'https://kubernetes.io/blog/',
    feedUrl: 'https://kubernetes.io/feed.xml',
    enabled: true
  },
  {
    slug: 'product-hunt',
    name: 'Product Hunt',
    kind: 'api',
    homepageUrl: 'https://www.producthunt.com/',
    feedUrl: null,
    enabled: false
  },
  {
    slug: 'y-combinator',
    name: 'Y Combinator',
    kind: 'rss',
    homepageUrl: 'https://www.ycombinator.com/blog',
    feedUrl: 'https://www.ycombinator.com/blog/feed',
    enabled: true
  },
  {
    slug: 'reddit-programming',
    name: 'Reddit Programming',
    kind: 'reddit',
    homepageUrl: 'https://www.reddit.com/r/programming/',
    feedUrl: 'https://www.reddit.com/r/programming/.rss',
    enabled: true
  },
  {
    slug: 'youtube-developer-channels',
    name: 'YouTube Developer Channels',
    kind: 'youtube',
    homepageUrl: 'https://www.youtube.com/',
    feedUrl: null,
    enabled: false
  }
] satisfies readonly SourceDefinition[];
