import type { Accumulator } from '../../types';
import { formatOdds } from '../../services/api';
import './AccumulatorCard.css';

interface AccumulatorCardProps {
    accumulator: Accumulator;
    onClick?: () => void;
}

export default function AccumulatorCard({ accumulator, onClick }: AccumulatorCardProps) {
    const { type, picks, totalOdds, combinedConfidence } = accumulator;

    const typeConfig = {
        safe: {
            icon: 'S',
            label: 'Safe Acca',
            color: 'success',
            subtitle: 'High probability, steady returns'
        },
        standard: {
            icon: 'M',
            label: 'Standard Acca',
            color: 'warning',
            subtitle: 'Balanced risk and reward'
        },
        high_odds: {
            icon: 'H',
            label: 'High Odds Acca',
            color: 'danger',
            subtitle: 'Higher risk, bigger potential'
        },
        correct_score: {
            icon: 'CS',
            label: 'Score Special',
            color: 'info',
            subtitle: 'Jackpot potential'
        },
    };

    const config = typeConfig[type];
    const successRate = Math.round(combinedConfidence * 100);

    return (
        <div className={`acca-card acca-${config.color}`} onClick={onClick}>
            <div className="acca-header">
                <div className="acca-type">
                    <div className={`acca-type-icon ${type}`}>
                        {config.icon}
                    </div>
                    <div className="acca-type-info">
                        <div className="acca-type-label">{config.label}</div>
                        <div className="acca-type-subtitle">{config.subtitle}</div>
                    </div>
                </div>

                <div className="acca-stats">
                    <div className="acca-odds">{formatOdds(totalOdds)}x</div>
                    <div className="acca-success-rate">{successRate}% hit rate</div>
                </div>
            </div>

            <div className="acca-picks">
                {picks.map((pick, index) => (
                    <div key={index} className="acca-pick">
                        <div className="acca-pick-check">✓</div>
                        <div className="acca-pick-info">
                            <div className="acca-pick-match">
                                {pick.homeTeam} vs {pick.awayTeam}
                            </div>
                            <div className="acca-pick-prediction">
                                {pick.prediction}
                            </div>
                        </div>
                        <div className="acca-pick-meta">
                            <div className="acca-pick-odds">@{formatOdds(pick.odds)}</div>
                            {pick.is2UpFriendly && (
                                <span className="acca-pick-2up">2UP</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="acca-footer">
                <div className="acca-picks-count">
                    {picks.length} selections
                </div>
                <div className="acca-view-btn">
                    View Details →
                </div>
            </div>
        </div>
    );
}
