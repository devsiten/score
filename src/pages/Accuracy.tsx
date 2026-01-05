import { useState } from 'react';
import './Accuracy.css';

export default function Accuracy() {
    const [timePeriod, setTimePeriod] = useState<'week' | 'month' | 'all'>('month');

    return (
        <div className="page accuracy-page">
            <div className="container">
                {/* Hero */}
                <section className="accuracy-hero">
                    <h1>Track Record</h1>
                    <p className="hero-subtitle">
                        Full transparency on our prediction performance.
                        Every prediction tracked and analyzed.
                    </p>
                </section>

                {/* Period Selector */}
                <div className="period-selector">
                    <button
                        className={`period-btn ${timePeriod === 'week' ? 'active' : ''}`}
                        onClick={() => setTimePeriod('week')}
                    >
                        This Week
                    </button>
                    <button
                        className={`period-btn ${timePeriod === 'month' ? 'active' : ''}`}
                        onClick={() => setTimePeriod('month')}
                    >
                        This Month
                    </button>
                    <button
                        className={`period-btn ${timePeriod === 'all' ? 'active' : ''}`}
                        onClick={() => setTimePeriod('all')}
                    >
                        All Time
                    </button>
                </div>

                {/* Overall Stats */}
                <section className="overall-stats">
                    <div className="stats-grid">
                        <div className="stat-card featured">
                            <div className="stat-value success">--</div>
                            <div className="stat-label">Overall Accuracy</div>
                            <div className="stat-detail">
                                No data yet
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-value">0</div>
                            <div className="stat-label">Total Predictions</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-value">--</div>
                            <div className="stat-label">Avg Confidence</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-value">--</div>
                            <div className="stat-label">ROI (1u stakes)</div>
                        </div>
                    </div>
                </section>

                {/* Empty State for Stats */}
                <section className="breakdown-section">
                    <h2>Accuracy by Confidence Level</h2>
                    <p className="section-subtitle">
                        Higher confidence predictions perform better
                    </p>

                    <div className="empty-state-inline">
                        <p>Accuracy data will appear here once predictions are settled.</p>
                    </div>
                </section>

                {/* Empty State for Market Stats */}
                <section className="breakdown-section">
                    <h2>Accuracy by Market Type</h2>
                    <p className="section-subtitle">
                        Performance breakdown by prediction market
                    </p>

                    <div className="empty-state-inline">
                        <p>Market performance data will appear here once predictions are settled.</p>
                    </div>
                </section>

                {/* Methodology */}
                <section className="methodology-section">
                    <h2>Our Methodology</h2>
                    <div className="methodology-grid">
                        <div className="method-card">
                            <div className="method-icon">7</div>
                            <h4>7 Statistical Factors</h4>
                            <p>Form, venue, goals, injuries, lineups, H2H, and odds validation combined into one confidence score.</p>
                        </div>
                        <div className="method-card">
                            <div className="method-icon">65</div>
                            <h4>65%+ Threshold</h4>
                            <p>We only publish predictions that reach our minimum confidence threshold. Quality over quantity.</p>
                        </div>
                        <div className="method-card">
                            <div className="method-icon">+</div>
                            <h4>Continuous Learning</h4>
                            <p>Algorithm weights are adjusted monthly based on actual performance data.</p>
                        </div>
                        <div className="method-card">
                            <div className="method-icon">2UP</div>
                            <h4>2UP/1UP Tags</h4>
                            <p>We flag matches where favorites are likely to take early leads for Sportybet users.</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
