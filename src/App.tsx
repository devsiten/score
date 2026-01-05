import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Accumulators from './pages/Accumulators';
import Accuracy from './pages/Accuracy';
import './index.css';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/accumulators" element={<Accumulators />} />
            <Route path="/accuracy" element={<Accuracy />} />
          </Routes>
        </main>
        <footer className="footer">
          <div className="container">
            <div className="footer-top">
              <div className="footer-brand">
                <span className="footer-logo">ScorePredict</span>
                <p className="footer-tagline">Data-driven football predictions</p>
              </div>
              <nav className="footer-nav">
                <a href="/accuracy">Track Record</a>
                <a href="/accumulators">Accumulators</a>
              </nav>
            </div>
            <div className="footer-divider"></div>
            <div className="footer-bottom">
              <p className="footer-copyright">2026 ScorePredict. All rights reserved.</p>
              <p className="footer-disclaimer">Predictions are for informational purposes only. Please bet responsibly.</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
