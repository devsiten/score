import { useState } from 'react';
import AccumulatorCard from '../components/predictions/AccumulatorCard';
import type { Accumulator } from '../types';
import './Accumulators.css';

export default function Accumulators() {
    const [activeType, setActiveType] = useState<string>('all');
    const [accumulators] = useState<Accumulator[]>([]);

    const filteredAccumulators = activeType === 'all'
        ? accumulators
        : accumulators.filter(a => a.type === activeType);

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
                    {filteredAccumulators.length > 0 ? (
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
                    ) : (
                        <div className="empty-state">
                            <div className="empty-icon">No Accumulators</div>
                            <h3>No accumulators available</h3>
                            <p>Accumulators will be generated once today's predictions are published.</p>
                        </div>
                    )}
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
