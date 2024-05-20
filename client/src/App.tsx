import React, { useState } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation
} from "react-router-dom";
import { useEffect } from "react";

// Pages imports
import HomePage from "./pages/HomePage";
import Statistics from "./pages/Statistics";
import Settings from "./pages/Settings";
import DeckInfo from "./pages/DeckInfo";
import Pomodoro from "./pages/PomodoroTimer";
import LoginPage from "./pages/LoginPage";

// Components imports
import Sidebar from "./components/SideBar/sidebar";
import CardView from "./pages/CardView";
import AddCard from "./pages/AddCard";
import LandingPage from "./pages/Landing";

// Type for children prop
interface LayoutWithSidebarProps {
  children: React.ReactNode;
}

// Layout component including the Sidebar
function LayoutWithSidebar({ children }: LayoutWithSidebarProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen overflow-hidden bg-base">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <main
        className={`flex-grow bg-base transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        {children}
      </main>
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
    
    const applyTheme = (theme: string) => {
      
      document.documentElement.classList.remove("dark", "light");
      document.documentElement.classList.add(theme);
    };

    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const theme = storedTheme || (prefersDark ? "dark" : "light");
    applyTheme(theme);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      const newTheme = e.matches ? "dark" : "light";
      applyTheme(newTheme);
      localStorage.setItem("theme", newTheme);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={
              <LayoutWithSidebar>
                <HomePage />
              </LayoutWithSidebar>
            }
            />
            <Route path="/statistics" element={
                <LayoutWithSidebar>
                  <Statistics />
                </LayoutWithSidebar>
              }
            />
            <Route path="/settings" element={
                <LayoutWithSidebar>
                  <Settings />
                </LayoutWithSidebar>
              }
            />
            <Route path="/pomodoro" element={
                <LayoutWithSidebar>
                  <Pomodoro />
                </LayoutWithSidebar>
              }
            />
            <Route path="/deckinfo" element={
                <LayoutWithSidebar>
                  <DeckInfo />
                </LayoutWithSidebar>
              }
            />
            <Route
              path="/cardview"
              element={
                <LayoutWithSidebar>
                  <CardView />
                </LayoutWithSidebar>
              }
            />
            <Route path="/addcard" element={
                <LayoutWithSidebar>
                  <AddCard />
                </LayoutWithSidebar>
              }
            />
            <Route path="/login" element={<LoginPage />} />
          </>
        ):(
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<LandingPage />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
