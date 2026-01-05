import { useState, useEffect } from 'react';
import PredictionCard from '../components/predictions/PredictionCard';
import AccumulatorCard from '../components/predictions/AccumulatorCard';
import type { MatchPrediction, Accumulator } from '../types';
import { fetchTodaysPredictions, fetchAccumulators } from '../services/api';
import './Home.css';

export default function Home() {
    const [predictions, setPredictions] = useState<MatchPrediction[]>([]);
    const [accumulators, setAccumulators] = useState<Accumulator[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState<string>('all');

    useEffect(() => {
        async function loadData() {
            try {
                const [predData, accaData] = await Promise.all([
                    fetchTodaysPredictions(),
                    fetchAccumulators()
                ]);
                setPredictions(predData.predictions || []);
                setAccumulators(accaData || []);
            } catch (error) {
                console.error('Failed to load predictions:', error);
                setPredictions([]);
                setAccumulators([]);
            } finally {
                setLoading(false);
            }
        }
        loadData();
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
                            <div className="stat-value">--</div>
                            <div className="stat-label">Matches Analyzed</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-value success">--</div>
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

                    {accumulators.length > 0 ? (
                        <div className="accumulators-grid">
                            {accumulators.map((acca) => (
                                <AccumulatorCard key={acca.id} accumulator={acca} />
                            ))}
                        </div>
                    ) : (
                        <div className="empty-state-inline">
                            <p>No accumulators available yet. Check back when predictions are published.</p>
                        </div>
                    )}
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
                            <p>Loading predictions...</p>
                        </div>
                    ) : filteredPredictions.length > 0 ? (
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
                    ) : (
                        <div className="empty-state">
                            <div className="empty-icon">No Predictions</div>
                            <h3>No predictions available</h3>
                            <p>Predictions will appear here when matches are analyzed. Check back later today.</p>
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
