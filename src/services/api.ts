import type { MatchPrediction, Accumulator, AccuracyStats, DailyPredictionsResponse } from '../types';

const API_BASE = 'https://score-predict-api.devsiten.workers.dev';

// Polymarket Event types
export interface PolymarketOutcome {
    name: string;
    probability: number;
    odds: string | null;
}

export interface PolymarketMarket {
    id: string;
    question: string;
    outcomes: PolymarketOutcome[];
}

export interface PolymarketEvent {
    id: string;
    slug: string;
    title: string;
    description: string;
    category: string;
    tags: string[];
    startDate: string;
    endDate: string;
    isLive: boolean;
    status: 'live' | 'upcoming' | 'ended';
    volume: number;
    liquidity: number;
    image: string;
    markets: PolymarketMarket[];
}

export interface EventsResponse {
    count: number;
    events: PolymarketEvent[];
    lastUpdated: string;
}

// Fetch sports events from Polymarket
export async function fetchSportsEvents(): Promise<EventsResponse> {
    try {
        const response = await fetch(`${API_BASE}/api/events`);
        if (!response.ok) throw new Error('Failed to fetch events');
        return response.json();
    } catch (error) {
        console.error('Error fetching events:', error);
        return { count: 0, events: [], lastUpdated: new Date().toISOString() };
    }
}

// Fetch live events only
export async function fetchLiveEvents(): Promise<EventsResponse> {
    try {
        const response = await fetch(`${API_BASE}/api/events/live`);
        if (!response.ok) throw new Error('Failed to fetch live events');
        return response.json();
    } catch (error) {
        console.error('Error fetching live events:', error);
        return { count: 0, events: [], lastUpdated: new Date().toISOString() };
    }
}

// Fetch today's predictions
export async function fetchTodaysPredictions(): Promise<DailyPredictionsResponse> {
    try {
        const response = await fetch(`${API_BASE}/api/predictions/today`);
        if (!response.ok) throw new Error('Failed to fetch predictions');
        return response.json();
    } catch (error) {
        console.error('Error fetching predictions:', error);
        return {
            date: new Date().toISOString().split('T')[0],
            totalAnalyzed: 0,
            publishedCount: 0,
            predictions: [],
        };
    }
}

// Fetch accumulators
export async function fetchAccumulators(): Promise<Accumulator[]> {
    try {
        const response = await fetch(`${API_BASE}/api/accumulators/today`);
        if (!response.ok) throw new Error('Failed to fetch accumulators');
        return response.json();
    } catch (error) {
        console.error('Error fetching accumulators:', error);
        return [];
    }
}

// Fetch accuracy stats
export async function fetchAccuracyStats(): Promise<AccuracyStats | null> {
    try {
        const response = await fetch(`${API_BASE}/api/accuracy`);
        if (!response.ok) throw new Error('Failed to fetch accuracy');
        return response.json();
    } catch (error) {
        console.error('Error fetching accuracy:', error);
        return null;
    }
}

// Utility functions
export function formatConfidence(confidence: number): string {
    return `${(confidence * 100).toFixed(0)}%`;
}

export function formatOdds(odds: number): string {
    return odds.toFixed(2);
}

export function formatVolume(volume: number): string {
    if (volume >= 1000000) return `$${(volume / 1000000).toFixed(1)}M`;
    if (volume >= 1000) return `$${(volume / 1000).toFixed(0)}K`;
    return `$${volume.toFixed(0)}`;
}

export function getMarketDisplayName(market: string): string {
    const names: Record<string, string> = {
        '1x2': 'Match Result',
        'over_2.5': 'Over 2.5 Goals',
        'under_2.5': 'Under 2.5 Goals',
        'btts_yes': 'Both Teams Score',
        'btts_no': 'Clean Sheet',
    };
    return names[market] || market;
}
