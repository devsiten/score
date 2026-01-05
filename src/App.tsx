import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Accumulators from './pages/Accumulators';
import Accuracy from './pages/Accuracy';
import './index.css';

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
            <div className="footer-content">
              <div className="footer-brand">
                <span className="footer-logo">ScorePredict</span>
                <p className="footer-tagline">Data-driven football predictions</p>
              </div>
              <div className="footer-links">
                <a href="#methodology">Methodology</a>
                <a href="#disclaimer">Disclaimer</a>
                <a href="#contact">Contact</a>
              </div>
              <div className="footer-disclaimer">
                <p>Predictions are for informational purposes only. Please bet responsibly.</p>
              </div>
            </div>
            <div className="footer-bottom">
              <p>© 2026 ScorePredict. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
