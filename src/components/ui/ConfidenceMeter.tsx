import './ConfidenceMeter.css';

interface ConfidenceMeterProps {
    confidence: number;
    size?: 'sm' | 'md' | 'lg';
    showLabel?: boolean;
}

export default function ConfidenceMeter({
    confidence,
    size = 'md',
    showLabel = true
}: ConfidenceMeterProps) {
    const percentage = Math.round(confidence * 100);
    const circumference = 2 * Math.PI * 36; // radius = 36
    const offset = circumference - (confidence * circumference);

    const getLevel = () => {
        if (confidence >= 0.75) return 'high';
        if (confidence >= 0.65) return 'mid';
        return 'low';
    };

    const level = getLevel();

    const sizeMap = {
        sm: 60,
        md: 80,
        lg: 100,
    };

    const svgSize = sizeMap[size];
    const strokeWidth = size === 'sm' ? 3 : 4;

    return (
        <div className={`confidence-meter size-${size}`} style={{ width: svgSize, height: svgSize }}>
            <svg
                className="confidence-ring"
                viewBox="0 0 80 80"
                width={svgSize}
                height={svgSize}
            >
                <defs>
                    <linearGradient id="gradient-high" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#059669" />
                    </linearGradient>
                    <linearGradient id="gradient-mid" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor="#d97706" />
                    </linearGradient>
                    <linearGradient id="gradient-low" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#4f46e5" />
                    </linearGradient>
                </defs>

                <circle
                    className="confidence-ring-bg"
                    cx="40"
                    cy="40"
                    r="36"
                    strokeWidth={strokeWidth}
                />

                <circle
                    className={`confidence-ring-fill ${level}`}
                    cx="40"
                    cy="40"
                    r="36"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    style={{ stroke: `url(#gradient-${level})` }}
                />
            </svg>

            {showLabel && (
                <div className={`confidence-value ${level}`}>
                    {percentage}%
                </div>
            )}
        </div>
    );
}
