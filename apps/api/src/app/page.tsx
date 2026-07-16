import { appConfig } from '@tech-brief-ai/config';

export default function HomePage() {
  return (
    <main>
      <h1>{appConfig.name}</h1>
      <p>Backend service is ready for Phase 2.</p>
    </main>
  );
}
