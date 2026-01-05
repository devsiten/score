// Prediction Types
export interface Team {
  id: string;
  name: string;
  logo?: string;
  form: string; // e.g., "WWDLW"
  position: number;
  avgGoalsScored: number;
  avgGoalsConceded: number;
  homeWinRate?: number;
  awayWinRate?: number;
  cleanSheets: number;
  scoredInMatches: number; // % of matches they scored
}

export interface MatchPrediction {
  id: string;
  matchId: string;
  homeTeam: Team;
  awayTeam: Team;
  league: string;
  leagueLogo?: string;
  kickoff: Date;
  market: MarketType;
  prediction: string;
  confidence: number;
  odds: number;
  factors: PredictionFactor[];
  is2UpFriendly: boolean;
  is1UpFriendly: boolean;
  status: 'upcoming' | 'live' | 'finished';
  result?: MatchResult;
}

export type MarketType = 
  | '1x2' 
  | 'over_2.5' 
  | 'under_2.5' 
  | 'btts_yes' 
  | 'btts_no' 
  | 'corners_over' 
  | 'corners_under'
  | 'correct_score'
  | 'double_chance';

export interface PredictionFactor {
  name: string;
  impact: number; // +/- percentage
  description: string;
  type: 'form' | 'venue' | 'goals' | 'injury' | 'h2h' | 'odds' | 'lineup';
}

export interface MatchResult {
  homeScore: number;
  awayScore: number;
  isCorrect: boolean;
  settledAt: Date;
}

// Accumulator Types
export interface Accumulator {
  id: string;
  type: 'safe' | 'standard' | 'high_odds' | 'correct_score';
  picks: AccumulatorPick[];
  totalOdds: number;
  combinedConfidence: number;
  status: 'pending' | 'won' | 'lost' | 'partial';
  createdAt: Date;
}

export interface AccumulatorPick {
  matchId: string;
  homeTeam: string;
  awayTeam: string;
  market: MarketType;
  prediction: string;
  confidence: number;
  odds: number;
  status: 'pending' | 'won' | 'lost';
  is2UpFriendly: boolean;
}

// Stats Types
export interface AccuracyStats {
  period: 'daily' | 'weekly' | 'monthly' | 'all_time';
  totalPredictions: number;
  correctPredictions: number;
  accuracyRate: number;
  avgConfidence: number;
  profitLoss?: number;
  byConfidenceRange: ConfidenceRangeStats[];
  byMarket: MarketStats[];
  byLeague: LeagueStats[];
}

export interface ConfidenceRangeStats {
  range: string; // e.g., "70-75%"
  total: number;
  correct: number;
  accuracy: number;
}

export interface MarketStats {
  market: MarketType;
  total: number;
  correct: number;
  accuracy: number;
}

export interface LeagueStats {
  league: string;
  total: number;
  correct: number;
  accuracy: number;
}

// API Response Types
export interface DailyPredictionsResponse {
  date: string;
  predictions: MatchPrediction[];
  accumulators: Accumulator[];
  totalAnalyzed: number;
  publishedCount: number;
}

export interface LeagueInfo {
  id: string;
  name: string;
  country: string;
  logo?: string;
  isActive: boolean;
}
