import { useState, useEffect } from 'react';
import './App.css';

interface MatchAnalysis {
  id: string;
  homeTeam: string;
  awayTeam: string;
  league: string;
  kickoff: string;
  homeStats: { scoredFirstPct: number; concededFirstPct: number; avgFirstGoalMinute: number };
  awayStats: { scoredFirstPct: number; concededFirstPct: number; avgFirstGoalMinute: number };
  home1UpScore: number;
  away1UpScore: number;
  home2UpScore: number;
  away2UpScore: number;
  recommendation: { team: string | null; market: '1UP' | '2UP' | null; confidence: number; reasons: string[] };
  isDerby: boolean;
}

interface ApiResponse {
  lastUpdated: string;
  totalMatches: number;
  leagues: string[];
  byLeague: Record<string, MatchAnalysis[]>;
}

const API_BASE = 'https://score-predict-api.devsiten.workers.dev';

const LEAGUE_ORDER = [
  'Premier League', 'La Liga', 'Bundesliga', 'Serie A', 'Ligue 1',
  'Champions League', 'Europa League', 'Conference League'
];

function App() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeLeague, setActiveLeague] = useState<string>('all');

  useEffect(() => {
    async function fetchMatches() {
      try {
        const response = await fetch(`${API_BASE}/api/matches`);
        if (!response.ok) throw new Error('Failed to fetch');
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

  const formatTime = (d: string) => new Date(d).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  const formatDate = (d: string) => new Date(d).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
  const getScoreClass = (s: number) => s >= 60 ? 'high' : s >= 50 ? 'medium' : 'low';

  const leagues = data ? LEAGUE_ORDER.filter(l => data.byLeague[l]?.length > 0) : [];

  const filteredLeagues = activeLeague === 'all'
    ? leagues
    : leagues.filter(l => l === activeLeague);

  return (
    <div className="app">
      <header className="header">
        <div className="logo">⚡ 1UP Analysis</div>
        {data && <span className="total">{data.totalMatches} matches</span>}
      </header>

      <main className="main">
        {/* League Tabs */}
        <div className="league-tabs">
          <button
            className={`tab ${activeLeague === 'all' ? 'active' : ''}`}
            onClick={() => setActiveLeague('all')}
          >
            All Leagues
          </button>
          {leagues.map(league => (
            <button
              key={league}
              className={`tab ${activeLeague === league ? 'active' : ''}`}
              onClick={() => setActiveLeague(league)}
            >
              {league}
            </button>
          ))}
        </div>

        {loading && <div className="loading"><div className="spinner"></div>Loading...</div>}
        {error && <div className="error">⚠️ {error}</div>}

        {data && filteredLeagues.map(league => (
          <section key={league} className="league-section">
            <h2 className="league-title">{league}</h2>
            <div className="matches-grid">
              {data.byLeague[league]?.map(match => (
                <div key={match.id} className={`match-card ${match.isDerby ? 'derby' : ''} ${match.recommendation.confidence >= 70 ? 'recommended' : ''}`}>
                  <div className="card-top">
                    <span className="time">{formatDate(match.kickoff)} • {formatTime(match.kickoff)}</span>
                    {match.isDerby && <span className="badge derby-badge">DERBY</span>}
                  </div>

                  <div className="teams">
                    <span className="team home">{match.homeTeam}</span>
                    <span className="vs">vs</span>
                    <span className="team away">{match.awayTeam}</span>
                  </div>

                  <div className="stats-table">
                    <div className="stat-row header">
                      <span></span><span>HOME</span><span>AWAY</span>
                    </div>
                    <div className="stat-row">
                      <span>Scores 1st</span>
                      <span className={getScoreClass(match.homeStats.scoredFirstPct)}>{match.homeStats.scoredFirstPct}%</span>
                      <span className={getScoreClass(match.awayStats.scoredFirstPct)}>{match.awayStats.scoredFirstPct}%</span>
                    </div>
                    <div className="stat-row">
                      <span>Concedes 1st</span>
                      <span className={getScoreClass(match.homeStats.concededFirstPct)}>{match.homeStats.concededFirstPct}%</span>
                      <span className={getScoreClass(match.awayStats.concededFirstPct)}>{match.awayStats.concededFirstPct}%</span>
                    </div>
                    <div className="stat-row">
                      <span>Avg 1st Goal</span>
                      <span>{match.homeStats.avgFirstGoalMinute}'</span>
                      <span>{match.awayStats.avgFirstGoalMinute}'</span>
                    </div>
                  </div>

                  <div className="scores-row">
                    <div className="score-item">
                      <span className="label">H 1UP</span>
                      <span className={`value ${getScoreClass(match.home1UpScore)}`}>{match.home1UpScore}%</span>
                    </div>
                    <div className="score-item">
                      <span className="label">A 1UP</span>
                      <span className={`value ${getScoreClass(match.away1UpScore)}`}>{match.away1UpScore}%</span>
                    </div>
                    <div className="score-item">
                      <span className="label">H 2UP</span>
                      <span className={`value ${getScoreClass(match.home2UpScore)}`}>{match.home2UpScore}%</span>
                    </div>
                    <div className="score-item">
                      <span className="label">A 2UP</span>
                      <span className={`value ${getScoreClass(match.away2UpScore)}`}>{match.away2UpScore}%</span>
                    </div>
                  </div>

                  {match.recommendation.team && match.recommendation.confidence >= 70 && (
                    <div className="recommendation">
                      <span className="rec-team">{match.recommendation.team}</span>
                      <span className={`rec-market ${match.recommendation.market?.toLowerCase()}`}>{match.recommendation.market}</span>
                      <span className="rec-conf">{match.recommendation.confidence}%</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>

      <footer className="footer">
        Personal analysis tool • {data && `Updated: ${new Date(data.lastUpdated).toLocaleString()}`}
      </footer>
    </div>
  );
}

export default App;
