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
    const baseUrl = adminUrl.endsWith('/') ? adminUrl.slice(0, -1) : adminUrl;
    const target = `${baseUrl}/?mode=signin`;
    window.location.replace(target);
  }, []);

  return null;
};

const RedirectToSignup = () => {
  useEffect(() => {
    const adminUrl = import.meta.env.VITE_ADMIN_APP_URL || 'http://3.111.191.254:5470';
    const baseUrl = adminUrl.endsWith('/') ? adminUrl.slice(0, -1) : adminUrl;
    const target = `${baseUrl}/?mode=signup`;
    window.location.replace(target);
  }, []);

  return null;
};

const Layout = ({ user, setUser }) => {
  const location = useLocation();
  const hideFooterRoutes = ["/working"];
  const shouldShowFooter = !hideFooterRoutes.includes(location.pathname);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-edu-bg text-edu-text font-inter transition-colors duration-300">
      <main className="flex-1">
        <Navbar user={user} setUser={setUser} />
        <div className="pt-0">
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/working" element={<BusyDevelopers />} />
            <Route path="/signin" element={<RedirectToAdmin />} />
            <Route path="/signup" element={<RedirectToSignup />} />
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

  // Handle cross-page hash routing by making scroll behavior smooth across the entire app
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <BrowserRouter>
      <Layout user={user} setUser={setUser} />
    </BrowserRouter>
  )
}

export default App