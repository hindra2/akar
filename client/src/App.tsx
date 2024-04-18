import React, { useState } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation,
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
  useEffect(() => {
    // Function to set the class based on the theme preference
    const applyTheme = (theme: string) => {
      document.documentElement.classList.remove("dark", "light");
      document.documentElement.classList.add(theme);
    };

    // Check the local storage or system preference for theme
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    // If there's a stored theme, use it; otherwise, use system preference
    const theme = storedTheme || (prefersDark ? "dark" : "light");
    applyTheme(theme);

    // Event listener for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      const newTheme = e.matches ? "dark" : "light";
      applyTheme(newTheme);
      localStorage.setItem("theme", newTheme);
    };

    // Add event listener
    mediaQuery.addEventListener("change", handleChange);

    // Clean up event listener
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);
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
          path="/statistics"
          element={
            <LayoutWithSidebar>
              <Statistics />
            </LayoutWithSidebar>
          }
        />
        <Route
          path="/settings"
          element={
            <LayoutWithSidebar>
              <Settings />
            </LayoutWithSidebar>
          }
        />
        <Route
          path="/pomodoro"
          element={
            <LayoutWithSidebar>
              <Pomodoro />
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
        <Route
          path="/cardview"
          element={
            <LayoutWithSidebar>
              <CardView />
            </LayoutWithSidebar>
          }
        />
        <Route
          path="/addcard"
          element={
            <LayoutWithSidebar>
              <AddCard />
            </LayoutWithSidebar>
          }
        />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;
