import { useState, useEffect } from 'react';
import './App.css';

interface H2H {
  homeWins: number;
  draws: number;
  awayWins: number;
  total: number;
  homeWinPct: number;
  drawPct: number;
  awayWinPct: number;
}

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
  h2h: H2H | null;
  homeForm: string[];
  awayForm: string[];
  homeInjury: boolean;
  awayInjury: boolean;
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

  const FormDisplay = ({ form, label }: { form: string[]; label: string }) => (
    <div className="form-display">
      <span className="form-label">{label}</span>
      <div className="form-badges">
        {form.map((result, i) => (
          <span key={i} className={`form-badge ${result.toLowerCase()}`}>
            {result}
          </span>
        ))}
      </div>
    </div>
  );

  const H2HDisplay = ({ h2h, homeTeam, awayTeam }: { h2h: H2H; homeTeam: string; awayTeam: string }) => (
    <div className="h2h-display">
      <span className="h2h-title">H2H ({h2h.total} matches)</span>
      <div className="h2h-bar">
        <div className="h2h-segment home" style={{ width: `${h2h.homeWinPct}%` }}>
          {h2h.homeWinPct > 15 && `${h2h.homeWinPct}%`}
        </div>
        <div className="h2h-segment draw" style={{ width: `${h2h.drawPct}%` }}>
          {h2h.drawPct > 15 && `${h2h.drawPct}%`}
        </div>
        <div className="h2h-segment away" style={{ width: `${h2h.awayWinPct}%` }}>
          {h2h.awayWinPct > 15 && `${h2h.awayWinPct}%`}
        </div>
      </div>
      <div className="h2h-labels">
        <span>{homeTeam.split(' ')[0]}</span>
        <span>Draw</span>
        <span>{awayTeam.split(' ')[0]}</span>
      </div>
    </div>
  );

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
                <div key={match.id} className={`match-card ${match.isDerby ? 'derby' : ''} ${match.recommendation.confidence >= 50 ? 'recommended' : ''}`}>
                  <div className="card-top">
                    <span className="time">{formatDate(match.kickoff)} • {formatTime(match.kickoff)}</span>
                    <div className="badges-row">
                      {match.isDerby && <span className="badge derby-badge">DERBY</span>}
                      {match.homeInjury && <span className="badge injury-badge" title={`${match.homeTeam} has injuries`}>🏥 H</span>}
                      {match.awayInjury && <span className="badge injury-badge" title={`${match.awayTeam} has injuries`}>🏥 A</span>}
                    </div>
                  </div>

                  <div className="teams">
                    <span className={`team home ${match.homeInjury ? 'has-injury' : ''}`}>
                      {match.homeTeam}
                    </span>
                    <span className="vs">vs</span>
                    <span className={`team away ${match.awayInjury ? 'has-injury' : ''}`}>
                      {match.awayTeam}
                    </span>
                  </div>

                  {/* H2H Display */}
                  {match.h2h && (
                    <H2HDisplay h2h={match.h2h} homeTeam={match.homeTeam} awayTeam={match.awayTeam} />
                  )}

                  {/* Form Display */}
                  <div className="form-row">
                    {match.homeForm && match.homeForm.length > 0 && (
                      <FormDisplay form={match.homeForm} label="H" />
                    )}
                    {match.awayForm && match.awayForm.length > 0 && (
                      <FormDisplay form={match.awayForm} label="A" />
                    )}
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

                  {match.recommendation.team && match.recommendation.confidence >= 50 && (
                    <div className="recommendation">
                      <span className="rec-team">{match.recommendation.team}</span>
                      <span className={`rec-market ${match.recommendation.market === '1UP' ? 'one-up' : 'two-up'}`}>{match.recommendation.market}</span>
                      <span className="rec-conf">{match.recommendation.confidence}%</span>
                    </div>
                  )}

                  {match.recommendation.reasons.length > 0 && (
                    <div className="reasons">
                      {match.recommendation.reasons.map((reason, i) => (
                        <span key={i} className="reason-tag">{reason}</span>
                      ))}
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
