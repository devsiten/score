import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className="navbar">
            <div className="container navbar-content">
                <Link to="/" className="navbar-brand">
                    <div className="navbar-logo-icon">SP</div>
                    <span className="navbar-logo">ScorePredict</span>
                </Link>

                <div className="navbar-nav">
                    <Link
                        to="/"
                        className={`nav-link ${isActive('/') ? 'active' : ''}`}
                    >
                        Today's Picks
                    </Link>
                    <Link
                        to="/accumulators"
                        className={`nav-link ${isActive('/accumulators') ? 'active' : ''}`}
                    >
                        Accumulators
                    </Link>
                    <Link
                        to="/accuracy"
                        className={`nav-link ${isActive('/accuracy') ? 'active' : ''}`}
                    >
                        Track Record
                    </Link>
                </div>

                <div className="navbar-actions">
                    <div className="live-indicator">
                        <span className="live-dot"></span>
                        <span>Live</span>
                    </div>
                </div>
            </div>
        </nav>
    );
}
