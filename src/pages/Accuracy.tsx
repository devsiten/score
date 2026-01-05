import { useState } from 'react';
import './Accuracy.css';

interface AccuracyStat {
    range: string;
    total: number;
    correct: number;
    accuracy: number;
}

interface MarketStat {
    market: string;
    displayName: string;
    total: number;
    correct: number;
    accuracy: number;
}

// Mock data
const overallStats = {
    totalPredictions: 1247,
    correctPredictions: 897,
    accuracyRate: 71.9,
    avgConfidence: 73.2,
    profitLoss: 18.4,
};

const confidenceStats: AccuracyStat[] = [
    { range: '80%+', total: 156, correct: 134, accuracy: 85.9 },
    { range: '75-80%', total: 312, correct: 243, accuracy: 77.9 },
    { range: '70-75%', total: 428, correct: 304, accuracy: 71.0 },
    { range: '65-70%', total: 351, correct: 216, accuracy: 61.5 },
];

const marketStats: MarketStat[] = [
    { market: '1x2', displayName: 'Match Result', total: 523, correct: 392, accuracy: 75.0 },
    { market: 'over_2.5', displayName: 'Over 2.5 Goals', total: 298, correct: 224, accuracy: 75.2 },
    { market: 'btts_yes', displayName: 'BTTS Yes', total: 189, correct: 136, accuracy: 72.0 },
    { market: 'btts_no', displayName: 'BTTS No', total: 112, correct: 78, accuracy: 69.6 },
    { market: 'corners', displayName: 'Corners', total: 125, correct: 67, accuracy: 53.6 },
];

const recentResults = [
    { match: 'Liverpool 3-1 Chelsea', prediction: 'Liverpool Win', confidence: 78, correct: true },
    { match: 'Man City 2-0 Villa', prediction: 'Over 2.5', confidence: 72, correct: false },
    { match: 'Arsenal 2-1 Wolves', prediction: 'Arsenal Win', confidence: 81, correct: true },
    { match: 'Bayern 4-0 Darmstadt', prediction: 'Over 2.5', confidence: 85, correct: true },
    { match: 'Dortmund 2-2 Leipzig', prediction: 'BTTS Yes', confidence: 76, correct: true },
    { match: 'PSG 1-0 Monaco', prediction: 'PSG Win', confidence: 74, correct: true },
    { match: 'Inter 2-1 Juventus', prediction: 'BTTS Yes', confidence: 71, correct: true },
    { match: 'Real Madrid 3-0 Getafe', prediction: 'Over 2.5', confidence: 77, correct: true },
];

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
                            <div className="stat-value success">{overallStats.accuracyRate}%</div>
                            <div className="stat-label">Overall Accuracy</div>
                            <div className="stat-detail">
                                {overallStats.correctPredictions} of {overallStats.totalPredictions} correct
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-value">{overallStats.totalPredictions}</div>
                            <div className="stat-label">Total Predictions</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-value">{overallStats.avgConfidence}%</div>
                            <div className="stat-label">Avg Confidence</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-value success">+{overallStats.profitLoss}%</div>
                            <div className="stat-label">ROI (1u stakes)</div>
                        </div>
                    </div>
                </section>

                {/* Accuracy by Confidence */}
                <section className="breakdown-section">
                    <h2>Accuracy by Confidence Level</h2>
                    <p className="section-subtitle">
                        Higher confidence predictions perform better
                    </p>

                    <div className="confidence-breakdown">
                        {confidenceStats.map((stat) => (
                            <div key={stat.range} className="confidence-row">
                                <div className="confidence-range">{stat.range}</div>
                                <div className="confidence-bar-container">
                                    <div
                                        className="confidence-bar"
                                        style={{
                                            width: `${stat.accuracy}%`,
                                            background: stat.accuracy >= 75
                                                ? 'var(--gradient-high)'
                                                : stat.accuracy >= 65
                                                    ? 'var(--gradient-mid)'
                                                    : 'var(--gradient-low)'
                                        }}
                                    ></div>
                                </div>
                                <div className="confidence-stats">
                                    <span className="accuracy-value">{stat.accuracy}%</span>
                                    <span className="accuracy-count">{stat.correct}/{stat.total}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Accuracy by Market */}
                <section className="breakdown-section">
                    <h2>Accuracy by Market Type</h2>
                    <p className="section-subtitle">
                        Performance breakdown by prediction market
                    </p>

                    <div className="market-grid">
                        {marketStats.map((stat) => (
                            <div key={stat.market} className="market-card">
                                <div className="market-header">
                                    <span className="market-name">{stat.displayName}</span>
                                    <span className={`market-accuracy ${stat.accuracy >= 70 ? 'good' : ''}`}>
                                        {stat.accuracy}%
                                    </span>
                                </div>
                                <div className="market-bar-container">
                                    <div
                                        className="market-bar"
                                        style={{ width: `${stat.accuracy}%` }}
                                    ></div>
                                </div>
                                <div className="market-count">
                                    {stat.correct} of {stat.total} correct
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Recent Results */}
                <section className="recent-section">
                    <h2>Recent Results</h2>
                    <p className="section-subtitle">Last 8 settled predictions</p>

                    <div className="recent-results">
                        {recentResults.map((result, index) => (
                            <div key={index} className={`result-row ${result.correct ? 'won' : 'lost'}`}>
                                <div className="result-icon">
                                    {result.correct ? '✓' : '✗'}
                                </div>
                                <div className="result-info">
                                    <div className="result-match">{result.match}</div>
                                    <div className="result-prediction">{result.prediction}</div>
                                </div>
                                <div className="result-confidence">
                                    {result.confidence}%
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Methodology */}
                <section className="methodology-section">
                    <h2>Our Methodology</h2>
                    <div className="methodology-grid">
                        <div className="method-card">
                            <div className="method-icon">📈</div>
                            <h4>7 Statistical Factors</h4>
                            <p>Form, venue, goals, injuries, lineups, H2H, and odds validation combined into one confidence score.</p>
                        </div>
                        <div className="method-card">
                            <div className="method-icon">7</div>
                            <h4>65%+ Threshold</h4>
                            <p>We only publish predictions that reach our minimum confidence threshold. Quality over quantity.</p>
                        </div>
                        <div className="method-card">
                            <div className="method-icon">🔄</div>
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
