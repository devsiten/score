import { useState, useEffect } from 'react';
import PredictionCard from '../components/predictions/PredictionCard';
import AccumulatorCard from '../components/predictions/AccumulatorCard';
import type { MatchPrediction, Accumulator } from '../types';
import './Home.css';

// Mock data for demonstration - will be replaced with API calls
const mockPredictions: MatchPrediction[] = [
    {
        id: '1',
        matchId: 'm1',
        homeTeam: {
            id: 't1',
            name: 'Manchester City',
            form: 'WWWDW',
            position: 1,
            avgGoalsScored: 2.8,
            avgGoalsConceded: 0.6,
            cleanSheets: 8,
            scoredInMatches: 95,
        },
        awayTeam: {
            id: 't2',
            name: 'Nottingham Forest',
            form: 'LDLWL',
            position: 15,
            avgGoalsScored: 1.1,
            avgGoalsConceded: 1.8,
            cleanSheets: 3,
            scoredInMatches: 65,
        },
        league: 'Premier League',
        kickoff: new Date(Date.now() + 3600000 * 4),
        market: '1x2',
        prediction: 'home_win',
        confidence: 0.82,
        odds: 1.28,
        factors: [
            { name: 'Home Form', impact: 0.15, description: 'City excellent at home', type: 'form' },
            { name: 'Goal Diff', impact: 0.10, description: 'City +2.2 goals/game advantage', type: 'goals' },
            { name: 'Position Gap', impact: 0.05, description: '14 places apart', type: 'form' },
        ],
        is2UpFriendly: true,
        is1UpFriendly: true,
        status: 'upcoming',
    },
    {
        id: '2',
        matchId: 'm2',
        homeTeam: {
            id: 't3',
            name: 'Liverpool',
            form: 'WWWWW',
            position: 2,
            avgGoalsScored: 2.5,
            avgGoalsConceded: 0.8,
            cleanSheets: 7,
            scoredInMatches: 100,
        },
        awayTeam: {
            id: 't4',
            name: 'Burnley',
            form: 'LLLLD',
            position: 19,
            avgGoalsScored: 0.8,
            avgGoalsConceded: 2.2,
            cleanSheets: 2,
            scoredInMatches: 55,
        },
        league: 'Premier League',
        kickoff: new Date(Date.now() + 3600000 * 6),
        market: 'over_2.5',
        prediction: 'over_2.5',
        confidence: 0.78,
        odds: 1.45,
        factors: [
            { name: 'Liverpool Attack', impact: 0.12, description: '2.5 goals/game average', type: 'goals' },
            { name: 'Burnley Defense', impact: 0.10, description: 'Concede 2.2/game', type: 'goals' },
            { name: 'H2H History', impact: 0.03, description: 'Last 5: avg 3.4 goals', type: 'h2h' },
        ],
        is2UpFriendly: true,
        is1UpFriendly: true,
        status: 'upcoming',
    },
    {
        id: '3',
        matchId: 'm3',
        homeTeam: {
            id: 't5',
            name: 'Arsenal',
            form: 'WWDWW',
            position: 3,
            avgGoalsScored: 2.1,
            avgGoalsConceded: 0.9,
            cleanSheets: 6,
            scoredInMatches: 90,
        },
        awayTeam: {
            id: 't6',
            name: 'Brighton',
            form: 'WDWLD',
            position: 8,
            avgGoalsScored: 1.6,
            avgGoalsConceded: 1.2,
            cleanSheets: 4,
            scoredInMatches: 80,
        },
        league: 'Premier League',
        kickoff: new Date(Date.now() + 3600000 * 8),
        market: '1x2',
        prediction: 'home_win',
        confidence: 0.71,
        odds: 1.55,
        factors: [
            { name: 'Home Form', impact: 0.08, description: 'Strong at Emirates', type: 'venue' },
            { name: 'Squad Depth', impact: 0.05, description: 'Full strength available', type: 'lineup' },
            { name: 'Injuries', impact: -0.03, description: 'Brighton missing 1 key player', type: 'injury' },
        ],
        is2UpFriendly: false,
        is1UpFriendly: true,
        status: 'upcoming',
    },
    {
        id: '4',
        matchId: 'm4',
        homeTeam: {
            id: 't7',
            name: 'Bayern Munich',
            form: 'WWWWW',
            position: 1,
            avgGoalsScored: 3.1,
            avgGoalsConceded: 0.7,
            cleanSheets: 9,
            scoredInMatches: 100,
        },
        awayTeam: {
            id: 't8',
            name: 'Mainz',
            form: 'LDWLL',
            position: 12,
            avgGoalsScored: 1.3,
            avgGoalsConceded: 1.6,
            cleanSheets: 3,
            scoredInMatches: 70,
        },
        league: 'Bundesliga',
        kickoff: new Date(Date.now() + 3600000 * 5),
        market: 'over_2.5',
        prediction: 'over_2.5',
        confidence: 0.79,
        odds: 1.40,
        factors: [
            { name: 'Bayern Attack', impact: 0.14, description: '3.1 goals/game at home', type: 'goals' },
            { name: 'Mainz Defense', impact: 0.08, description: 'Concede 1.6/game away', type: 'goals' },
        ],
        is2UpFriendly: true,
        is1UpFriendly: true,
        status: 'upcoming',
    },
    {
        id: '5',
        matchId: 'm5',
        homeTeam: {
            id: 't9',
            name: 'Dortmund',
            form: 'WDWWL',
            position: 4,
            avgGoalsScored: 2.0,
            avgGoalsConceded: 1.3,
            cleanSheets: 4,
            scoredInMatches: 85,
        },
        awayTeam: {
            id: 't10',
            name: 'Leverkusen',
            form: 'WWWDW',
            position: 2,
            avgGoalsScored: 2.3,
            avgGoalsConceded: 1.0,
            cleanSheets: 5,
            scoredInMatches: 90,
        },
        league: 'Bundesliga',
        kickoff: new Date(Date.now() + 3600000 * 7),
        market: 'btts_yes',
        prediction: 'btts_yes',
        confidence: 0.76,
        odds: 1.65,
        factors: [
            { name: 'Both Score Often', impact: 0.12, description: 'Both teams score 85%+ games', type: 'goals' },
            { name: 'Open Game', impact: 0.06, description: 'H2H: BTTS in 7/10', type: 'h2h' },
        ],
        is2UpFriendly: false,
        is1UpFriendly: false,
        status: 'upcoming',
    },
];

const mockAccumulators: Accumulator[] = [
    {
        id: 'a1',
        type: 'safe',
        picks: [
            { matchId: 'm1', homeTeam: 'Man City', awayTeam: 'Forest', market: '1x2', prediction: 'City Win', confidence: 0.82, odds: 1.28, status: 'pending', is2UpFriendly: true },
            { matchId: 'm2', homeTeam: 'Liverpool', awayTeam: 'Burnley', market: '1x2', prediction: 'Liverpool Win', confidence: 0.85, odds: 1.22, status: 'pending', is2UpFriendly: true },
            { matchId: 'm4', homeTeam: 'Bayern', awayTeam: 'Mainz', market: '1x2', prediction: 'Bayern Win', confidence: 0.80, odds: 1.30, status: 'pending', is2UpFriendly: true },
            { matchId: 'm6', homeTeam: 'PSG', awayTeam: 'Nantes', market: '1x2', prediction: 'PSG Win', confidence: 0.79, odds: 1.32, status: 'pending', is2UpFriendly: true },
        ],
        totalOdds: 2.68,
        combinedConfidence: 0.44,
        status: 'pending',
        createdAt: new Date(),
    },
    {
        id: 'a2',
        type: 'standard',
        picks: [
            { matchId: 'm1', homeTeam: 'Man City', awayTeam: 'Forest', market: '1x2', prediction: 'City Win', confidence: 0.82, odds: 1.28, status: 'pending', is2UpFriendly: true },
            { matchId: 'm2', homeTeam: 'Liverpool', awayTeam: 'Burnley', market: 'over_2.5', prediction: 'Over 2.5', confidence: 0.78, odds: 1.45, status: 'pending', is2UpFriendly: false },
            { matchId: 'm4', homeTeam: 'Bayern', awayTeam: 'Mainz', market: 'over_2.5', prediction: 'Over 2.5', confidence: 0.79, odds: 1.40, status: 'pending', is2UpFriendly: false },
            { matchId: 'm5', homeTeam: 'Dortmund', awayTeam: 'Leverkusen', market: 'btts_yes', prediction: 'BTTS Yes', confidence: 0.76, odds: 1.65, status: 'pending', is2UpFriendly: false },
            { matchId: 'm3', homeTeam: 'Arsenal', awayTeam: 'Brighton', market: '1x2', prediction: 'Arsenal Win', confidence: 0.71, odds: 1.55, status: 'pending', is2UpFriendly: false },
            { matchId: 'm7', homeTeam: 'Real Madrid', awayTeam: 'Getafe', market: '1x2', prediction: 'Madrid Win', confidence: 0.80, odds: 1.30, status: 'pending', is2UpFriendly: true },
        ],
        totalOdds: 8.92,
        combinedConfidence: 0.22,
        status: 'pending',
        createdAt: new Date(),
    },
    {
        id: 'a3',
        type: 'high_odds',
        picks: [
            { matchId: 'm1', homeTeam: 'Man City', awayTeam: 'Forest', market: '1x2', prediction: 'City Win', confidence: 0.82, odds: 1.28, status: 'pending', is2UpFriendly: true },
            { matchId: 'm2', homeTeam: 'Liverpool', awayTeam: 'Burnley', market: 'over_2.5', prediction: 'Over 2.5', confidence: 0.78, odds: 1.45, status: 'pending', is2UpFriendly: false },
            { matchId: 'm4', homeTeam: 'Bayern', awayTeam: 'Mainz', market: 'over_2.5', prediction: 'Over 2.5', confidence: 0.79, odds: 1.40, status: 'pending', is2UpFriendly: false },
            { matchId: 'm5', homeTeam: 'Dortmund', awayTeam: 'Leverkusen', market: 'btts_yes', prediction: 'BTTS Yes', confidence: 0.76, odds: 1.65, status: 'pending', is2UpFriendly: false },
            { matchId: 'm3', homeTeam: 'Arsenal', awayTeam: 'Brighton', market: '1x2', prediction: 'Arsenal Win', confidence: 0.71, odds: 1.55, status: 'pending', is2UpFriendly: false },
            { matchId: 'm7', homeTeam: 'Real Madrid', awayTeam: 'Getafe', market: '1x2', prediction: 'Madrid Win', confidence: 0.80, odds: 1.30, status: 'pending', is2UpFriendly: true },
            { matchId: 'm8', homeTeam: 'Inter', awayTeam: 'Lecce', market: '1x2', prediction: 'Inter Win', confidence: 0.74, odds: 1.45, status: 'pending', is2UpFriendly: false },
            { matchId: 'm9', homeTeam: 'Napoli', awayTeam: 'Udinese', market: 'btts_yes', prediction: 'BTTS Yes', confidence: 0.70, odds: 1.75, status: 'pending', is2UpFriendly: false },
        ],
        totalOdds: 22.65,
        combinedConfidence: 0.12,
        status: 'pending',
        createdAt: new Date(),
    },
];

export default function Home() {
    const [predictions, setPredictions] = useState<MatchPrediction[]>([]);
    const [accumulators, setAccumulators] = useState<Accumulator[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState<string>('all');

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setPredictions(mockPredictions);
            setAccumulators(mockAccumulators);
            setLoading(false);
        }, 500);
    }, []);

    const filteredPredictions = activeFilter === 'all'
        ? predictions
        : activeFilter === '2up'
            ? predictions.filter(p => p.is2UpFriendly)
            : predictions.filter(p => p.market === activeFilter);

    const today = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="page home-page">
            <div className="container">
                {/* Hero Section */}
                <section className="hero">
                    <div className="hero-badge">
                        <span className="hero-badge-dot"></span>
                        <span>Updated every hour</span>
                    </div>
                    <h1 className="hero-title">
                        Today's <span className="text-gradient">High-Confidence</span> Picks
                    </h1>
                    <p className="hero-subtitle">
                        AI-powered football predictions with 70%+ accuracy.
                        Only the best opportunities, backed by data.
                    </p>
                    <div className="hero-date">{today}</div>
                </section>

                {/* Stats Overview */}
                <section className="stats-section">
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-value success">{predictions.length}</div>
                            <div className="stat-label">Today's Picks</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-value">45</div>
                            <div className="stat-label">Matches Analyzed</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-value success">72%</div>
                            <div className="stat-label">This Week's Accuracy</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-value">{predictions.filter(p => p.is2UpFriendly).length}</div>
                            <div className="stat-label">2UP Friendly</div>
                        </div>
                    </div>
                </section>

                {/* Accumulators Section */}
                <section className="accumulators-section">
                    <div className="section-header">
                        <h2>Today's Accumulators</h2>
                        <p className="section-subtitle">Auto-generated combinations of our best picks</p>
                    </div>

                    <div className="accumulators-grid">
                        {accumulators.map((acca) => (
                            <AccumulatorCard key={acca.id} accumulator={acca} />
                        ))}
                    </div>
                </section>

                {/* Predictions Section */}
                <section className="predictions-section">
                    <div className="section-header">
                        <h2>Individual Predictions</h2>
                        <p className="section-subtitle">All high-confidence picks for today</p>
                    </div>

                    {/* Filter Tabs */}
                    <div className="filter-tabs">
                        <button
                            className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
                            onClick={() => setActiveFilter('all')}
                        >
                            All Picks
                        </button>
                        <button
                            className={`filter-tab ${activeFilter === '2up' ? 'active' : ''}`}
                            onClick={() => setActiveFilter('2up')}
                        >
                            2UP Friendly
                        </button>
                        <button
                            className={`filter-tab ${activeFilter === '1x2' ? 'active' : ''}`}
                            onClick={() => setActiveFilter('1x2')}
                        >
                            Match Result
                        </button>
                        <button
                            className={`filter-tab ${activeFilter === 'over_2.5' ? 'active' : ''}`}
                            onClick={() => setActiveFilter('over_2.5')}
                        >
                            Over 2.5
                        </button>
                        <button
                            className={`filter-tab ${activeFilter === 'btts_yes' ? 'active' : ''}`}
                            onClick={() => setActiveFilter('btts_yes')}
                        >
                            BTTS
                        </button>
                    </div>

                    {loading ? (
                        <div className="loading-state">
                            <div className="loader"></div>
                            <p>Analyzing matches...</p>
                        </div>
                    ) : (
                        <div className="predictions-grid">
                            {filteredPredictions.map((prediction, index) => (
                                <div
                                    key={prediction.id}
                                    className="animate-fadeInUp"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <PredictionCard prediction={prediction} />
                                </div>
                            ))}
                        </div>
                    )}

                    {!loading && filteredPredictions.length === 0 && (
                        <div className="empty-state">
                            <div className="empty-icon">🔍</div>
                            <h3>No predictions for this filter</h3>
                            <p>Try a different category or check back later.</p>
                        </div>
                    )}
                </section>

                {/* Disclaimer */}
                <section className="disclaimer-section">
                    <div className="disclaimer-card">
                        <h4>Important Disclaimer</h4>
                        <p>
                            These predictions are based on statistical analysis and are not guaranteed outcomes.
                            Past performance does not guarantee future results. Please bet responsibly.
                            Never stake more than you can afford to lose.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}
