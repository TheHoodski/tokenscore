import TokenAnalyzer from '@/components/TokenAnalyzer'; // Changed to default import

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Solana Token Analyzer
      </h1>
      <TokenAnalyzer />
    </main>
  );
}
