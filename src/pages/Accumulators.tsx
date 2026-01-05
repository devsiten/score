import { useState } from 'react';
import AccumulatorCard from '../components/predictions/AccumulatorCard';
import type { Accumulator } from '../types';
import './Accumulators.css';

// Mock data - same as Home
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
    {
        id: 'a4',
        type: 'correct_score',
        picks: [
            { matchId: 'm1', homeTeam: 'Man City', awayTeam: 'Forest', market: 'correct_score', prediction: '3-0', confidence: 0.12, odds: 8.00, status: 'pending', is2UpFriendly: false },
            { matchId: 'm2', homeTeam: 'Liverpool', awayTeam: 'Burnley', market: 'correct_score', prediction: '3-1', confidence: 0.10, odds: 10.00, status: 'pending', is2UpFriendly: false },
            { matchId: 'm4', homeTeam: 'Bayern', awayTeam: 'Mainz', market: 'correct_score', prediction: '4-0', confidence: 0.08, odds: 12.00, status: 'pending', is2UpFriendly: false },
        ],
        totalOdds: 960.00,
        combinedConfidence: 0.001,
        status: 'pending',
        createdAt: new Date(),
    },
];

export default function Accumulators() {
    const [activeType, setActiveType] = useState<string>('all');

    const filteredAccumulators = activeType === 'all'
        ? mockAccumulators
        : mockAccumulators.filter(a => a.type === activeType);

    return (
        <div className="page accumulators-page">
            <div className="container">
                {/* Hero */}
                <section className="acca-hero">
                    <h1>Today's Accumulators</h1>
                    <p className="hero-subtitle">
                        Auto-generated combinations of our highest confidence picks.
                        Choose your risk level.
                    </p>
                </section>

                {/* Explainer */}
                <section className="acca-explainer">
                    <div className="explainer-grid">
                        <div className="explainer-card safe">
                            <div className="explainer-icon">S</div>
                            <h4>Safe Acca</h4>
                            <p>4 picks, ~3x odds, ~40% hit rate</p>
                        </div>
                        <div className="explainer-card standard">
                            <div className="explainer-icon">M</div>
                            <h4>Standard Acca</h4>
                            <p>6 picks, ~9x odds, ~20% hit rate</p>
                        </div>
                        <div className="explainer-card high">
                            <div className="explainer-icon">H</div>
                            <h4>High Odds Acca</h4>
                            <p>8 picks, ~20x odds, ~10% hit rate</p>
                        </div>
                        <div className="explainer-card score">
                            <div className="explainer-icon">CS</div>
                            <h4>Score Special</h4>
                            <p>3 scores, ~500x+ odds, lottery ticket!</p>
                        </div>
                    </div>
                </section>

                {/* Filter Tabs */}
                <div className="acca-filter-tabs">
                    <button
                        className={`filter-tab ${activeType === 'all' ? 'active' : ''}`}
                        onClick={() => setActiveType('all')}
                    >
                        All Types
                    </button>
                    <button
                        className={`filter-tab ${activeType === 'safe' ? 'active' : ''}`}
                        onClick={() => setActiveType('safe')}
                    >
                        Safe
                    </button>
                    <button
                        className={`filter-tab ${activeType === 'standard' ? 'active' : ''}`}
                        onClick={() => setActiveType('standard')}
                    >
                        Standard
                    </button>
                    <button
                        className={`filter-tab ${activeType === 'high_odds' ? 'active' : ''}`}
                        onClick={() => setActiveType('high_odds')}
                    >
                        High Odds
                    </button>
                    <button
                        className={`filter-tab ${activeType === 'correct_score' ? 'active' : ''}`}
                        onClick={() => setActiveType('correct_score')}
                    >
                        Score Special
                    </button>
                </div>

                {/* Accumulators Grid */}
                <section className="acca-list">
                    <div className="acca-grid">
                        {filteredAccumulators.map((acca, index) => (
                            <div
                                key={acca.id}
                                className="animate-fadeInUp"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <AccumulatorCard accumulator={acca} />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Tips Section */}
                <section className="tips-section">
                    <h3>Accumulator Tips</h3>
                    <div className="tips-grid">
                        <div className="tip-card">
                            <h5>Use 2UP Friendly Picks</h5>
                            <p>Look for the 2UP badge. These picks are safer on Sportybet with early payout.</p>
                        </div>
                        <div className="tip-card">
                            <h5>Don't Mix All Types</h5>
                            <p>Stick to one accumulator type. Mixing safe and risky picks reduces effectiveness.</p>
                        </div>
                        <div className="tip-card">
                            <h5>Stake Wisely</h5>
                            <p>Safe Acca: Normal stake. High Odds: Small stake. Score Special: Very small stake.</p>
                        </div>
                        <div className="tip-card">
                            <h5>Track Results</h5>
                            <p>Check our Track Record page to see which accumulator types perform best.</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
