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
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <LayoutWithSidebar>
              <HomePage />
            </LayoutWithSidebar>
          }
        />
        <Route
          path="/test"
          element={
            <LayoutWithSidebar>
              <TestPage />
            </LayoutWithSidebar>
          }
        />
        <Route
          path="/deckinfo"
          element={
            <LayoutWithSidebar>
              <DeckInfo />
            </LayoutWithSidebar>
          }
        />
        <Route path="/login" element={<LoginPage />} />{" "}
        {/* LoginPage without Sidebar */}
      </Routes>
    </Router>
  );
};

export default App;
