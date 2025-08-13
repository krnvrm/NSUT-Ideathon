import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Homepage from './pages/Homepage';
import FinanceHub from './pages/FinanceHub';
import MarketLinkage from './pages/MarketLinkage';
import TechnologyHub from './pages/TechnologyHub';
import Ondc from './pages/Ondc';
import Cluster from './pages/Cluster';
import UaaS from './pages/uaaS';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import SearchResults from './pages/SearchResults';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/finance" element={<FinanceHub />} />
          <Route path="/market-linkage" element={<MarketLinkage />} />
          <Route path="/technology" element={<TechnologyHub />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/ondc-academy" element={<Ondc />} />
          <Route path="/cluster" element={<Cluster />} />
          <Route path="/UaaS" element={<UaaS />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/search-results" element={<SearchResults />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;