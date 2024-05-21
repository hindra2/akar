import React, { useState } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { useEffect } from "react";
import supabase from "../utils/supabase";

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
import ManageCards from "./pages/ManageCards";

// Type for children prop
interface LayoutWithSidebarProps {
  children: React.ReactNode;
  onLogout: () => void;
}

// Layout component including the Sidebar
function LayoutWithSidebar({ children, onLogout }: LayoutWithSidebarProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen overflow-hidden bg-base">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        onLogout={onLogout}
      />
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

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setIsLoggedIn(session !== null);
    };

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_, session) => {
      setIsLoggedIn(session !== null);
    });

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

    return () => {
      subscription.unsubscribe();
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {isLoggedIn === null ? (
          <div>Loading...</div>
        ) : isLoggedIn ? (
          <>
            <Route
              path="/"
              element={
                <LayoutWithSidebar onLogout={handleLogout}>
                  <HomePage />
                </LayoutWithSidebar>
              }
            />
            <Route
              path="/statistics"
              element={
                <LayoutWithSidebar onLogout={handleLogout}>
                  <Statistics />
                </LayoutWithSidebar>
              }
            />
            <Route
              path="/settings"
              element={
                <LayoutWithSidebar onLogout={handleLogout}>
                  <Settings />
                </LayoutWithSidebar>
              }
            />
            <Route
              path="/pomodoro"
              element={
                <LayoutWithSidebar onLogout={handleLogout}>
                  <Pomodoro />
                </LayoutWithSidebar>
              }
            />
            <Route
              path="/deckinfo"
              element={
                <LayoutWithSidebar onLogout={handleLogout}>
                  <DeckInfo />
                </LayoutWithSidebar>
              }
            />
            <Route
              path="/cardview"
              element={
                <LayoutWithSidebar onLogout={handleLogout}>
                  <CardView />
                </LayoutWithSidebar>
              }
            />
            <Route
              path="/addcard"
              element={
                <LayoutWithSidebar onLogout={handleLogout}>
                  <AddCard />
                </LayoutWithSidebar>
              }
            />
            <Route
              path="/managecards"
              element={
                <LayoutWithSidebar onLogout={handleLogout}>
                  <ManageCards />
                </LayoutWithSidebar>
              }
            />
            <Route
              path="/login"
              element={<LoginPage onLogin={handleLogin} />}
            />
          </>
        ) : (
          <>
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/" element={<Navigate to="/landing" replace />} />
            <Route
              path="/login"
              element={<LoginPage onLogin={handleLogin} />}
            />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
