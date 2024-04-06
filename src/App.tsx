import React from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";

// Pages imports
import HomePage from "./pages/HomePage";
import TestPage from "./pages/TestPage";
import DeckInfo from "./pages/DeckInfo";
import LoginPage from "./pages/LoginPage"; // Your login page component
import CardView from "./pages/CardView";

// Components imports
import Sidebar from "./components/SideBar/sidebar";

// Type for children prop
interface LayoutWithSidebarProps {
  children: React.ReactNode;
}

// Layout component including the Sidebar
function LayoutWithSidebar({ children }: LayoutWithSidebarProps) {
  return (
    <div className="flex min-h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-grow bg-base">{children}</main>
    </div>
  );
}

// Scroll to top component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Main App component
const App: React.FC = () => {
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
            <Route path="/cardview" element={<CardView />} />
            <Route path="/login" element={<LoginPage />} />{" "}
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
