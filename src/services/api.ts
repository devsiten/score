import { MatchPrediction, Accumulator, AccuracyStats, DailyPredictionsResponse } from '../types';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8787';

// Fetch today's predictions
export async function fetchTodaysPredictions(): Promise<DailyPredictionsResponse> {
    const response = await fetch(`${API_BASE}/api/predictions/today`);
    if (!response.ok) throw new Error('Failed to fetch predictions');
    return response.json();
}

// Fetch predictions for a specific date
export async function fetchPredictionsByDate(date: string): Promise<DailyPredictionsResponse> {
    const response = await fetch(`${API_BASE}/api/predictions/${date}`);
    if (!response.ok) throw new Error('Failed to fetch predictions');
    return response.json();
}

// Fetch single match details
export async function fetchMatchDetails(matchId: string): Promise<MatchPrediction> {
    const response = await fetch(`${API_BASE}/api/matches/${matchId}`);
    if (!response.ok) throw new Error('Failed to fetch match details');
    return response.json();
}

// Fetch accuracy stats
export async function fetchAccuracyStats(period?: string): Promise<AccuracyStats> {
    const url = period
        ? `${API_BASE}/api/accuracy?period=${period}`
        : `${API_BASE}/api/accuracy`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch accuracy stats');
    return response.json();
}

// Fetch accumulators
export async function fetchAccumulators(date?: string): Promise<Accumulator[]> {
    const url = date
        ? `${API_BASE}/api/accumulators?date=${date}`
        : `${API_BASE}/api/accumulators/today`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch accumulators');
    return response.json();
}

// Format date for API
export function formatDateForAPI(date: Date): string {
    return date.toISOString().split('T')[0];
}

// Helper to determine confidence level
export function getConfidenceLevel(confidence: number): 'high' | 'mid' | 'low' {
    if (confidence >= 0.75) return 'high';
    if (confidence >= 0.65) return 'mid';
    return 'low';
}

// Format confidence as percentage
export function formatConfidence(confidence: number): string {
    return `${Math.round(confidence * 100)}%`;
}

// Format odds
export function formatOdds(odds: number): string {
    return odds.toFixed(2);
}

// Get market display name
export function getMarketDisplayName(market: string): string {
    const names: Record<string, string> = {
        '1x2': 'Match Result',
        'over_2.5': 'Over 2.5 Goals',
        'under_2.5': 'Under 2.5 Goals',
        'btts_yes': 'Both Teams to Score',
        'btts_no': 'Clean Sheet',
        'corners_over': 'Corners Over',
        'corners_under': 'Corners Under',
        'correct_score': 'Correct Score',
        'double_chance': 'Double Chance',
    };
    return names[market] || market;
}

// Get prediction display text
export function getPredictionDisplay(prediction: string, homeTeam: string, awayTeam: string): string {
    const displays: Record<string, string> = {
        'home_win': `${homeTeam} Win`,
        'away_win': `${awayTeam} Win`,
        'draw': 'Draw',
        'over_2.5': 'Over 2.5 Goals',
        'under_2.5': 'Under 2.5 Goals',
        'btts_yes': 'Both Teams Score',
        'btts_no': 'No (Clean Sheet)',
    };
    return displays[prediction] || prediction;
}

// Calculate time until match
export function getTimeUntilMatch(kickoff: Date): string {
    const now = new Date();
    const diff = kickoff.getTime() - now.getTime();

    if (diff < 0) return 'Started';

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 24) {
        const days = Math.floor(hours / 24);
        return `${days}d ${hours % 24}h`;
    }

    if (hours > 0) {
        return `${hours}h ${minutes}m`;
    }

    return `${minutes}m`;
}
