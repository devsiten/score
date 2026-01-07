import { useState, useEffect } from 'react';
import './App.css';

// Types
interface Prediction {
  id: string;
  homeTeam: string;
  awayTeam: string;
  league: string;
  kickoff: string;
  selectedTeam: string;
  market: '1UP' | '2UP';
  confidence: number;
  reasoning: string[];
  factors: {
    scoredFirstPct: number;
    opponentConcedesFirstPct: number;
    avgFirstGoalMinute: number;
  };
}

interface ApiResponse {
  date: string;
  lastUpdated: string;
  statsLastUpdated: string;
  totalFixtures: number;
  predictionsCount: number;
  predictions: Prediction[];
}

const API_BASE = 'https://score-predict-api.devsiten.workers.dev';

function App() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPredictions() {
      try {
        const response = await fetch(`${API_BASE}/api/predictions`);
        if (!response.ok) throw new Error('Failed to fetch predictions');
        const result = await response.json();
        setData(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPredictions();
  }, []);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  };

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">⚡</span>
            <span className="logo-text">1UP Predict</span>
          </div>
          <div className="header-badge">
            <span className="pulse"></span>
            <span>Personal Dashboard</span>
          </div>
        </div>
      </header>

      <main className="main">
        {/* Hero */}
        <section className="hero">
          <h1 className="hero-title">
            Early Lead <span className="gradient-text">Predictions</span>
          </h1>
          <p className="hero-subtitle">
            1UP/2UP picks based on first-goal dominance analysis
          </p>
          <div className="hero-date">{today}</div>
        </section>

        {/* Stats */}
        {data && (
          <section className="stats-bar">
            <div className="stat">
              <span className="stat-value">{data.totalFixtures}</span>
              <span className="stat-label">Fixtures</span>
            </div>
            <div className="stat">
              <span className="stat-value highlight">{data.predictionsCount}</span>
              <span className="stat-label">Picks</span>
            </div>
            <div className="stat">
              <span className="stat-value">{data.predictions.filter(p => p.market === '1UP').length}</span>
              <span className="stat-label">1UP</span>
            </div>
            <div className="stat">
              <span className="stat-value">{data.predictions.filter(p => p.market === '2UP').length}</span>
              <span className="stat-label">2UP</span>
            </div>
          </section>
        )}

        {/* Content */}
        <section className="content">
          {loading && (
            <div className="loading">
              <div className="spinner"></div>
              <p>Loading predictions...</p>
            </div>
          )}

          {error && (
            <div className="error">
              <p>⚠️ {error}</p>
            </div>
          )}

          {data && data.predictions.length === 0 && (
            <div className="empty">
              <div className="empty-icon">📊</div>
              <h3>No picks today</h3>
              <p>No matches passed the first-goal dominance filters. This is expected behavior – quality over quantity.</p>
            </div>
          )}

          {data && data.predictions.length > 0 && (
            <div className="predictions-grid">
              {data.predictions.map((pred, index) => (
                <div
                  key={pred.id}
                  className="prediction-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Card Header */}
                  <div className="card-header">
                    <span className="league-badge">{pred.league}</span>
                    <span className="kickoff">{formatTime(pred.kickoff)}</span>
                  </div>

                  {/* Teams */}
                  <div className="teams">
                    <span className={`team ${pred.selectedTeam === pred.homeTeam ? 'selected' : ''}`}>
                      {pred.homeTeam}
                    </span>
                    <span className="vs">vs</span>
                    <span className={`team ${pred.selectedTeam === pred.awayTeam ? 'selected' : ''}`}>
                      {pred.awayTeam}
                    </span>
                  </div>

                  {/* Market & Confidence */}
                  <div className="prediction-info">
                    <div className={`market-badge market-${pred.market.toLowerCase()}`}>
                      {pred.market}
                    </div>
                    <div className="confidence">
                      <div className="confidence-bar">
                        <div
                          className="confidence-fill"
                          style={{ width: `${pred.confidence}%` }}
                        ></div>
                      </div>
                      <span className="confidence-value">{pred.confidence}%</span>
                    </div>
                  </div>

                  {/* Selected Team */}
                  <div className="selected-team">
                    <span className="label">Pick:</span>
                    <span className="team-name">{pred.selectedTeam}</span>
                  </div>

                  {/* Reasoning */}
                  <div className="reasoning">
                    {pred.reasoning.map((reason, i) => (
                      <div key={i} className="reason">
                        <span className="reason-icon">✓</span>
                        <span>{reason}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>Personal analysis tool • Not financial advice • Quality over quantity</p>
        {data && (
          <p className="last-updated">
            Last updated: {new Date(data.lastUpdated).toLocaleString()}
          </p>
        )}
      </footer>
    </div>
  );
}

export default App;
