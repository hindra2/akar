import "./index.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Pages imports
import HomePage from "./pages/HomePage";
import TestPage from "./pages/TestPage";
import DeckInfo from "./pages/DeckInfo";

// Components imports
import Sidebar from "./components/sidebar";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <div className="flex min-h-screen overflow-hidden">
        <Sidebar />
        <ScrollToTop />
        <main className="flex-grow bg-base">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="/deckinfo" element={<DeckInfo />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
