import type { MatchPrediction } from '../../types';
import ConfidenceMeter from '../ui/ConfidenceMeter';
import {
    getMarketDisplayName,
    getPredictionDisplay,
    getTimeUntilMatch,
    formatOdds
} from '../../services/api';
import './PredictionCard.css';

interface PredictionCardProps {
    prediction: MatchPrediction;
    onClick?: () => void;
}

export default function PredictionCard({ prediction, onClick }: PredictionCardProps) {
    const {
        homeTeam,
        awayTeam,
        league,
        kickoff,
        market,
        prediction: pred,
        confidence,
        odds,
        factors,
        is2UpFriendly,
        is1UpFriendly
    } = prediction;

    const confidenceLevel = confidence >= 0.75 ? 'high' : confidence >= 0.65 ? 'mid' : 'low';
    const kickoffDate = new Date(kickoff);

    return (
        <div
            className={`prediction-card ${confidenceLevel}-confidence`}
            onClick={onClick}
        >
            {/* Header */}
            <div className="prediction-header">
                <div className="prediction-league">
                    <span className="league-name">{league}</span>
                    <span className="match-time">{getTimeUntilMatch(kickoffDate)}</span>
                </div>

                <div className="prediction-badges">
                    {is2UpFriendly && (
                        <span className="badge badge-2up">2UP</span>
                    )}
                    {is1UpFriendly && !is2UpFriendly && (
                        <span className="badge badge-2up">1UP</span>
                    )}
                </div>
            </div>

            {/* Teams */}
            <div className="prediction-teams">
                <div className="team home">
                    <div className="team-logo">
                        {homeTeam.logo ? (
                            <img src={homeTeam.logo} alt={homeTeam.name} />
                        ) : (
                            <div className="team-logo-placeholder">
                                {homeTeam.name.charAt(0)}
                            </div>
                        )}
                    </div>
                    <span className="team-name">{homeTeam.name}</span>
                    <span className="team-form">{homeTeam.form}</span>
                </div>

                <div className="vs-badge">VS</div>

                <div className="team away">
                    <div className="team-logo">
                        {awayTeam.logo ? (
                            <img src={awayTeam.logo} alt={awayTeam.name} />
                        ) : (
                            <div className="team-logo-placeholder">
                                {awayTeam.name.charAt(0)}
                            </div>
                        )}
                    </div>
                    <span className="team-name">{awayTeam.name}</span>
                    <span className="team-form">{awayTeam.form}</span>
                </div>
            </div>

            {/* Prediction */}
            <div className="prediction-content">
                <div className="prediction-info">
                    <div className="prediction-market">
                        {getMarketDisplayName(market)}
                    </div>
                    <div className="prediction-pick">
                        {getPredictionDisplay(pred, homeTeam.name, awayTeam.name)}
                    </div>
                    <div className="prediction-odds">
                        @ <span className="odds-value">{formatOdds(odds)}</span>
                    </div>
                </div>

                <div className="prediction-confidence">
                    <ConfidenceMeter confidence={confidence} size="md" />
                </div>
            </div>

            {/* Factors */}
            <div className="prediction-factors">
                {factors.slice(0, 3).map((factor, index) => (
                    <div
                        key={index}
                        className={`factor-pill ${factor.impact > 0 ? 'positive' : 'negative'}`}
                    >
                        <span className="factor-name">{factor.name}</span>
                        <span className="factor-impact">
                            {factor.impact > 0 ? '+' : ''}{Math.round(factor.impact * 100)}%
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
