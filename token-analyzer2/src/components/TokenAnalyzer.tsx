'use client';

import { useState } from 'react';

export default function TokenAnalyzer() {
  const [tokenAddress, setTokenAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    console.log('Starting analysis for token:', tokenAddress);

    try {
      const response = await fetch('http://localhost:8000/analyze-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tokenAddress })
      });

      console.log('Response status:', response.status);
      
      const text = await response.text();
      console.log('Raw response text:', text);

      try {
        const data = JSON.parse(text);
        console.log('Parsed response data:', data);

        if (data.error) {
          setError(data.error);
        } else {
          setResult(data);
        }
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        setError('Failed to parse server response');
      }
    } catch (err) {
      console.error('Network error:', err);
      setError('Failed to connect to analysis server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={tokenAddress}
          onChange={(e) => setTokenAddress(e.target.value)}
          placeholder="Enter token address"
          style={{ 
            padding: '8px', 
            marginRight: '10px', 
            width: '300px',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
        <button 
          type="submit" 
          disabled={loading}
          style={{
            padding: '8px 16px',
            backgroundColor: loading ? '#ccc' : '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Analyzing...' : 'Analyze'}
        </button>
      </form>

      {error && (
        <div style={{ color: 'red', marginBottom: '20px', padding: '10px', backgroundColor: '#fff1f0', borderRadius: '4px' }}>
          {error}
        </div>
      )}

      {result && (
        <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '4px' }}>
          <h2 style={{ marginBottom: '10px' }}>{result.token_name}</h2>
          
          <div style={{ marginBottom: '10px' }}>
            <strong>Score:</strong> {Math.round(result.final_score)}/100
          </div>
          
          <div style={{ marginBottom: '10px' }}>
            <strong>Risk Level:</strong> {result.risk_level}
          </div>

          {result.detailed_scores && (
            <div style={{ marginTop: '20px' }}>
              <h3 style={{ marginBottom: '10px' }}>Detailed Scores:</h3>
              {Object.entries(result.detailed_scores).map(([key, value]: [string, any]) => (
                <div key={key} style={{ marginBottom: '5px' }}>
                  <strong>{key.replace(/_/g, ' ')}:</strong> {Math.round(value)}/20
                </div>
              ))}
            </div>
          )}

          {result.analysis && (
            <div style={{ marginTop: '20px' }}>
              <h3 style={{ marginBottom: '10px' }}>Analysis:</h3>
              <p>{result.analysis}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
