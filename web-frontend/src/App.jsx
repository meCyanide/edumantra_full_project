import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Home from './pages/Home'
import BusyDevelopers from './pages/BusyDevelopers'
import Profile from './pages/Profile'

const RedirectToAdmin = () => {
  useEffect(() => {
    const adminUrl = import.meta.env.VITE_ADMIN_APP_URL || 'http://3.111.191.254:5470';
    const target = `${adminUrl}/?redirect=signin`;
    window.location.replace(target);
  }, []);

  return null;
};

const Layout = ({ user, setUser, theme, toggleTheme }) => {
  const location = useLocation();
  const hideFooterRoutes = ["/working"];
  const shouldShowFooter = !hideFooterRoutes.includes(location.pathname);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f5f7] dark:bg-[#000000] text-[#1d1d1f] dark:text-[#f5f5f7] font-inter transition-colors duration-300">
      <main className="flex-1">
        <Navbar user={user} setUser={setUser} theme={theme} toggleTheme={toggleTheme} />
        <div className="pt-0">
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/working" element={<BusyDevelopers />} />
            <Route path="/signin" element={<RedirectToAdmin />} />
            <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
          </Routes>
        </div>
        {shouldShowFooter && <Footer />}
      </main>
    </div>
  );
};


const App = () => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('edumantra_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [theme, setTheme] = useState(() => {
    // Initial theme check
    const stored = localStorage.getItem('theme');
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Apply class on load/change
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Handle cross-page hash routing by making scroll behavior smooth across the entire app
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <BrowserRouter>
      <Layout user={user} setUser={setUser} theme={theme} toggleTheme={toggleTheme} />
    </BrowserRouter>
  )
}

export default App