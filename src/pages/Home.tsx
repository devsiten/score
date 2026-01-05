import { useState, useEffect } from 'react';
import EventCard from '../components/predictions/EventCard';
import type { PolymarketEvent } from '../services/api';
import { fetchSportsEvents, fetchLiveEvents } from '../services/api';
import './Home.css';

export default function Home() {
    const [events, setEvents] = useState<PolymarketEvent[]>([]);
    const [liveEvents, setLiveEvents] = useState<PolymarketEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'all' | 'live'>('all');

    useEffect(() => {
        async function loadData() {
            try {
                const [eventsData, liveData] = await Promise.all([
                    fetchSportsEvents(),
                    fetchLiveEvents()
                ]);
                setEvents(eventsData.events || []);
                setLiveEvents(liveData.events || []);
            } catch (error) {
                console.error('Failed to load events:', error);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    const displayEvents = activeTab === 'live' ? liveEvents : events;

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
                        <span>Powered by Polymarket</span>
                    </div>
                    <h1 className="hero-title">
                        Sports <span className="text-gradient">Prediction Markets</span>
                    </h1>
                    <p className="hero-subtitle">
                        Real-time sports betting odds from Polymarket.
                        Trade on the outcomes of your favorite sports events.
                    </p>
                    <div className="hero-date">{today}</div>
                </section>

                {/* Stats Overview */}
                <section className="stats-section">
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-value success">{events.length}</div>
                            <div className="stat-label">Active Markets</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-value warning">{liveEvents.length}</div>
                            <div className="stat-label">Live Events</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-value">--</div>
                            <div className="stat-label">Total Volume</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-value">--</div>
                            <div className="stat-label">Markets Closing Soon</div>
                        </div>
                    </div>
                </section>

                {/* Events Section */}
                <section className="events-section">
                    <div className="section-header">
                        <h2>Sports Events</h2>
                        <p className="section-subtitle">
                            Prediction markets for sports from Polymarket
                        </p>
                    </div>

                    {/* Tab Filters */}
                    <div className="filter-tabs">
                        <button
                            className={`filter-tab ${activeTab === 'all' ? 'active' : ''}`}
                            onClick={() => setActiveTab('all')}
                        >
                            All Events ({events.length})
                        </button>
                        <button
                            className={`filter-tab ${activeTab === 'live' ? 'active' : ''}`}
                            onClick={() => setActiveTab('live')}
                        >
                            Live ({liveEvents.length})
                        </button>
                    </div>

                    {loading ? (
                        <div className="loading-state">
                            <div className="loader"></div>
                            <p>Loading events from Polymarket...</p>
                        </div>
                    ) : displayEvents.length > 0 ? (
                        <div className="events-grid">
                            {displayEvents.map((event, index) => (
                                <div
                                    key={event.id}
                                    className="animate-fadeInUp"
                                    style={{ animationDelay: `${index * 0.05}s` }}
                                >
                                    <EventCard event={event} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="empty-state">
                            <div className="empty-icon">No Events</div>
                            <h3>No {activeTab === 'live' ? 'live' : ''} events available</h3>
                            <p>
                                {activeTab === 'live'
                                    ? 'No live events right now. Check the All Events tab for upcoming markets.'
                                    : 'No sports events found. Check back later for new markets.'}
                            </p>
                        </div>
                    )}
                </section>

                {/* Disclaimer */}
                <section className="disclaimer-section">
                    <div className="disclaimer-card">
                        <h4>About Polymarket</h4>
                        <p>
                            Events and odds are sourced from Polymarket, a decentralized prediction market platform.
                            This is not financial advice. Trade responsibly and only risk what you can afford to lose.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}
