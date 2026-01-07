import { useState, useEffect } from 'react';
import './App.css';

// Types
interface MatchAnalysis {
  id: string;
  homeTeam: string;
  awayTeam: string;
  league: string;
  kickoff: string;
  homeStats: {
    scoredFirstPct: number;
    concededFirstPct: number;
    avgFirstGoalMinute: number;
  };
  awayStats: {
    scoredFirstPct: number;
    concededFirstPct: number;
    avgFirstGoalMinute: number;
  };
  home1UpScore: number;
  away1UpScore: number;
  home2UpScore: number;
  away2UpScore: number;
  recommendation: {
    team: string | null;
    market: '1UP' | '2UP' | null;
    confidence: number;
    reasons: string[];
  };
  isDerby: boolean;
  isEuropean: boolean;
}

interface ApiResponse {
  lastUpdated: string;
  dateRange: { from: string; to: string };
  totalMatches: number;
  matches: MatchAnalysis[];
}

const API_BASE = 'https://score-predict-api.devsiten.workers.dev';

function App() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'recommended'>('all');

  useEffect(() => {
    async function fetchMatches() {
      try {
        const response = await fetch(`${API_BASE}/api/matches`);
        if (!response.ok) throw new Error('Failed to fetch matches');
        const result = await response.json();
        setData(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchMatches();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  };

  const getScoreClass = (score: number) => {
    if (score >= 60) return 'score-high';
    if (score >= 50) return 'score-medium';
    return 'score-low';
  };

  const filteredMatches = data?.matches.filter(m =>
    filter === 'all' || (m.recommendation.team && m.recommendation.confidence >= 50)
  ) || [];

  // Group matches by date
  const groupedMatches: Record<string, MatchAnalysis[]> = {};
  filteredMatches.forEach(match => {
    const dateKey = formatDate(match.kickoff);
    if (!groupedMatches[dateKey]) groupedMatches[dateKey] = [];
    groupedMatches[dateKey].push(match);
  });

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">⚡</span>
            <span className="logo-text">1UP Analysis</span>
          </div>
          <div className="header-info">
            {data && <span>{data.totalMatches} matches</span>}
          </div>
        </div>
      </header>

      <main className="main">
        {/* Filters */}
        <div className="filter-bar">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Matches
          </button>
          <button
            className={`filter-btn ${filter === 'recommended' ? 'active' : ''}`}
            onClick={() => setFilter('recommended')}
          >
            Recommended Only
          </button>
        </div>

        {/* Legend */}
        <div className="legend">
          <span className="legend-item">
            <span className="legend-dot high"></span> 60%+
          </span>
          <span className="legend-item">
            <span className="legend-dot medium"></span> 50-59%
          </span>
          <span className="legend-item">
            <span className="legend-dot low"></span> &lt;50%
          </span>
        </div>

        {/* Loading / Error */}
        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading matches...</p>
          </div>
        )}

        {error && (
          <div className="error">
            <p>⚠️ {error}</p>
          </div>
        )}

        {/* Matches */}
        {data && Object.entries(groupedMatches).map(([date, matches]) => (
          <div key={date} className="date-group">
            <h2 className="date-header">{date}</h2>
            <div className="matches-list">
              {matches.map((match) => (
                <div
                  key={match.id}
                  className={`match-card ${match.isDerby ? 'derby' : ''} ${match.recommendation.confidence >= 60 ? 'highlighted' : ''}`}
                >
                  {/* Match Header */}
                  <div className="match-header">
                    <span className="league">{match.league}</span>
                    <span className="time">{formatTime(match.kickoff)}</span>
                    {match.isDerby && <span className="derby-badge">DERBY</span>}
                    {match.isEuropean && <span className="euro-badge">EUR</span>}
                  </div>

                  {/* Teams Row */}
                  <div className="teams-row">
                    <div className="team-col home">
                      <span className="team-name">{match.homeTeam}</span>
                    </div>
                    <div className="vs-col">VS</div>
                    <div className="team-col away">
                      <span className="team-name">{match.awayTeam}</span>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="stats-grid">
                    <div className="stats-header">
                      <span></span>
                      <span>HOME</span>
                      <span>AWAY</span>
                    </div>
                    <div className="stats-row">
                      <span className="stat-label">Scores 1st</span>
                      <span className={`stat-value ${getScoreClass(match.homeStats.scoredFirstPct)}`}>
                        {match.homeStats.scoredFirstPct.toFixed(0)}%
                      </span>
                      <span className={`stat-value ${getScoreClass(match.awayStats.scoredFirstPct)}`}>
                        {match.awayStats.scoredFirstPct.toFixed(0)}%
                      </span>
                    </div>
                    <div className="stats-row">
                      <span className="stat-label">Concedes 1st</span>
                      <span className={`stat-value ${getScoreClass(match.homeStats.concededFirstPct)}`}>
                        {match.homeStats.concededFirstPct.toFixed(0)}%
                      </span>
                      <span className={`stat-value ${getScoreClass(match.awayStats.concededFirstPct)}`}>
                        {match.awayStats.concededFirstPct.toFixed(0)}%
                      </span>
                    </div>
                    <div className="stats-row">
                      <span className="stat-label">Avg 1st Goal</span>
                      <span className="stat-value">{match.homeStats.avgFirstGoalMinute}'</span>
                      <span className="stat-value">{match.awayStats.avgFirstGoalMinute}'</span>
                    </div>
                  </div>

                  {/* 1UP/2UP Scores */}
                  <div className="scores-grid">
                    <div className="score-box">
                      <span className="score-label">Home 1UP</span>
                      <span className={`score-value ${getScoreClass(match.home1UpScore)}`}>
                        {match.home1UpScore}%
                      </span>
                    </div>
                    <div className="score-box">
                      <span className="score-label">Away 1UP</span>
                      <span className={`score-value ${getScoreClass(match.away1UpScore)}`}>
                        {match.away1UpScore}%
                      </span>
                    </div>
                    <div className="score-box">
                      <span className="score-label">Home 2UP</span>
                      <span className={`score-value ${getScoreClass(match.home2UpScore)}`}>
                        {match.home2UpScore}%
                      </span>
                    </div>
                    <div className="score-box">
                      <span className="score-label">Away 2UP</span>
                      <span className={`score-value ${getScoreClass(match.away2UpScore)}`}>
                        {match.away2UpScore}%
                      </span>
                    </div>
                  </div>

                  {/* Recommendation */}
                  {match.recommendation.team && match.recommendation.confidence >= 50 && (
                    <div className="recommendation">
                      <div className="rec-header">
                        <span className="rec-team">{match.recommendation.team}</span>
                        <span className={`rec-market ${match.recommendation.market?.toLowerCase()}`}>
                          {match.recommendation.market}
                        </span>
                        <span className={`rec-confidence ${getScoreClass(match.recommendation.confidence)}`}>
                          {match.recommendation.confidence}%
                        </span>
                      </div>
                      {match.recommendation.reasons.length > 0 && (
                        <div className="rec-reasons">
                          {match.recommendation.reasons.map((r, i) => (
                            <span key={i} className="reason">✓ {r}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {data && filteredMatches.length === 0 && (
          <div className="empty">
            <p>No matches found</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>Personal analysis • Use your own judgment</p>
        {data && <p className="updated">Updated: {new Date(data.lastUpdated).toLocaleString()}</p>}
      </footer>
    </div>
  );
}

export default App;
