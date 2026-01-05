import type { PolymarketEvent } from '../../services/api';
import { formatVolume } from '../../services/api';
import './EventCard.css';

interface EventCardProps {
    event: PolymarketEvent;
}

export default function EventCard({ event }: EventCardProps) {
    const mainMarket = event.markets[0];

    return (
        <div className={`event-card ${event.isLive ? 'event-live' : ''}`}>
            <div className="event-header">
                {event.isLive && (
                    <span className="live-badge">LIVE</span>
                )}
                <span className="event-category">{event.category}</span>
                <span className="event-volume">{formatVolume(event.volume)}</span>
            </div>

            <h3 className="event-title">{event.title}</h3>

            {mainMarket && mainMarket.outcomes && mainMarket.outcomes.length > 0 && (
                <div className="event-outcomes">
                    {mainMarket.outcomes.slice(0, 3).map((outcome, index) => (
                        <div key={index} className="outcome-row">
                            <span className="outcome-name">{outcome.name}</span>
                            <div className="outcome-stats">
                                <span className="outcome-prob">
                                    {(outcome.probability * 100).toFixed(0)}%
                                </span>
                                {outcome.odds && (
                                    <span className="outcome-odds">@{outcome.odds}</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {event.tags && event.tags.length > 0 && (
                <div className="event-tags">
                    {event.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="event-tag">{tag}</span>
                    ))}
                </div>
            )}

            <a
                href={`https://polymarket.com/event/${event.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="event-link"
            >
                View on Polymarket
            </a>
        </div>
    );
}
