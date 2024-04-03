import './index.css';
import { useEffect } from 'react';
import { 
  HashRouter as Router,
  Routes,
  Route,
  useLocation
} from "react-router-dom";

// Pages imports
import HomePage from "./pages/HomePage";
import TestPage from "./pages/TestPage";

// Components imports
import Sidebar from './components/header';

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
      <div className='flex flex-col min-h-screen'>
        <Sidebar />
        <ScrollToTop />
        <main className='flex-grow ml-10 bg-base'>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/test" element={<TestPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
