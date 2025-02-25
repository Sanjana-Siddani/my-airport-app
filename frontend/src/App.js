import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Timing from "./Timing"; // Import Timing component
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <h2>My Website</h2>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/timing">Flight Timings</Link></li> {/* New Link */}
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/timing" element={<Timing />} /> {/* New Route */}
        </Routes>

        <footer className="footer">
          <p>© 2025 My Website. All Rights Reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
