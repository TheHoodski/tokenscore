// src/components/TokenAnalyzer.tsx
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface AnalysisResult {
  token_name: string;
  final_score: number;
  risk_level: string;
  detailed_scores: {
    [key: string]: number;
  };
  analysis: string;
}

export default function TokenAnalyzer() {
  const [tokenAddress, setTokenAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState('');

  const analyzeToken = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tokenAddress }),
      });

      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setResult(data);
      }
    } catch (err) {
      setError('Failed to analyze token');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-4">Solana Token Analyzer</h1>
        
        <div className="flex gap-2 mb-4">
          <Input
            placeholder="Enter token address..."
            value={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value)}
          />
          <Button 
            onClick={analyzeToken}
            disabled={loading || !tokenAddress}
          >
            {loading ? 'Analyzing...' : 'Analyze'}
          </Button>
        </div>

        {error && (
          <div className="text-red-500 bg-red-50 p-3 rounded mb-4">
            {error}
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded">
              <h2 className="text-xl font-bold">{result.token_name}</h2>
              <div className="text-3xl font-bold mt-2">
                Score: {Math.round(result.final_score)}/100
              </div>
              <div className="text-lg">Risk Level: {result.risk_level}</div>
            </div>

            <div>
              <h3 className="font-bold mb-2">Detailed Scores:</h3>
              {Object.entries(result.detailed_scores).map(([metric, score]) => (
                <div key={metric} className="flex justify-between py-1">
                  <span>{metric.replace(/_/g, ' ')}:</span>
                  <span className="font-medium">{Math.round(score)}/20</span>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 p-4 rounded">
              <h3 className="font-bold mb-2">Analysis:</h3>
              <p>{result.analysis}</p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}