import React, { useState } from 'react'
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { HiAcademicCap, HiOutlineSun, HiOutlineMoon } from "react-icons/hi2";
import { Link } from 'react-router-dom';
import { motion as Motion, AnimatePresence } from 'framer-motion';

const clearAuthCookie = () => {
  document.cookie = 'edumantra_user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
};

const NavbarMenu = [
  { id: 1, title: "Home", path: "/" },
  { id: 2, title: "Services", path: "/#services" },
  { id: 3, title: "About Us", path: "/#about" },
  { id: 4, title: "Our Team", path: "/#team" },
  { id: 5, title: "Contact Us", path: "/#contact" },
]

const Navbar = ({ user, setUser, theme, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <nav className='fixed top-0 w-full z-[100] bg-white/70 dark:bg-black/70 backdrop-blur-md border-b border-appleGray-100 dark:border-appleGray-800 text-appleGray-900 dark:text-white duration-300'>
      <Motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="container py-3.5 flex justify-between items-center"
      >
        {/* Logo section */}
        <Motion.div
          whileHover={{ scale: 1.02 }}
          className='flex items-center gap-2 cursor-pointer group'
        >
          <div className='relative w-8 h-8 rounded-lg bg-black dark:bg-white flex items-center justify-center text-white dark:text-black text-lg shadow-md transition-transform duration-300'>
            <HiAcademicCap />
          </div>
          <h1 className='font-bold text-xl tracking-tight text-appleGray-900 dark:text-white'>
            Edu<span className='text-appleGray-400 dark:text-appleGray-400 font-medium'>Mantra</span>
          </h1>
        </Motion.div>

        {/* Menu section */}
        <div className='hidden lg:flex items-center gap-6'>
          <ul className='flex items-center gap-6'>
            {NavbarMenu.map((menu) => (
              <li key={menu.id}>
                <a href={menu.path}
                  className='inline-block py-2 px-3 text-sm text-appleGray-400 dark:text-appleGray-300 hover:text-appleGray-900 dark:hover:text-white relative group font-medium transition-colors duration-200'
                >
                  {menu.title}
                </a>
              </li>
            ))}
          </ul>

          <div className='h-4 w-[1px] bg-appleGray-200 dark:bg-appleGray-800 mx-2' />

          {/* Theme switcher */}
          <button
            onClick={toggleTheme}
            className='p-2 rounded-full hover:bg-appleGray-100 dark:hover:bg-appleGray-800 text-appleGray-400 dark:text-appleGray-300 hover:text-appleGray-900 dark:hover:text-white transition-all duration-200 mr-2'
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <HiOutlineSun className='text-lg' /> : <HiOutlineMoon className='text-lg' />}
          </button>

          {/* User Section */}
          {user ? (
            <div className="flex items-center gap-4">
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 focus:outline-none"
                >
                  <img src={user.avatar} alt="Avatar" className="w-8 h-8 rounded-full border border-appleGray-200 dark:border-white/30 object-cover shadow-sm" />
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <Motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-3 w-56 bg-white dark:bg-appleGray-950 rounded-2xl shadow-xl border border-appleGray-100 dark:border-white/10 py-2 overflow-hidden z-[110]"
                    >
                      <div className="px-5 py-3 border-b border-appleGray-100 dark:border-white/10 mb-2">
                        <p className="text-sm font-bold text-appleGray-900 dark:text-white truncate">{user.name}</p>
                        <p className="text-xs text-appleGray-400 truncate">{user.email}</p>
                      </div>
                      <Link
                        to="/profile"
                        onClick={() => setIsProfileOpen(false)}
                        className="block px-5 py-2.5 text-sm font-medium text-appleGray-400 dark:text-appleGray-300 hover:bg-appleGray-50 dark:hover:bg-white/5 hover:text-appleGray-900 dark:hover:text-white transition-colors"
                      >
                        Profile Info
                      </Link>
                      <button
                        onClick={() => {
                          setUser(null);
                          localStorage.removeItem('edumantra_user');
                          clearAuthCookie();
                          setIsProfileOpen(false);
                        }}
                        className="w-full text-left px-5 py-2.5 text-sm font-medium text-appleGray-400 dark:text-appleGray-300 hover:bg-appleGray-50 dark:hover:bg-white/5 hover:text-appleGray-900 dark:hover:text-white transition-colors"
                      >
                        Logout
                      </button>
                    </Motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ) : (
            <a href={import.meta.env.VITE_ADMIN_APP_URL || 'http://3.111.191.254:5470'} className="inline-block">
              <button className='primary-btn'>
                Sign In
              </button>
            </a>
          )}
        </div>

        {/* Mobile Hamburger section */}
        <div className='lg:hidden flex items-center gap-3'>
          <button
            onClick={toggleTheme}
            className='p-2 rounded-full hover:bg-appleGray-100 dark:hover:bg-appleGray-800 text-appleGray-400 dark:text-appleGray-300 hover:text-appleGray-900 dark:hover:text-white transition-colors mr-1'
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <HiOutlineSun className='text-lg' /> : <HiOutlineMoon className='text-lg' />}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-full hover:bg-appleGray-100 dark:hover:bg-appleGray-800"
          >
            {isOpen ? <IoMdClose className='text-2xl' /> : <IoMdMenu className='text-2xl' />}
          </button>
        </div>
      </Motion.div>

      {/* Mobile Sidebar Menu */}
      <AnimatePresence>
        {isOpen && (
          <Motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className='fixed top-[62px] left-0 w-full h-[calc(100vh-62px)] bg-white dark:bg-black border-t border-appleGray-100 dark:border-appleGray-800 shadow-2xl z-50 flex flex-col px-6 py-10 lg:hidden'
          >
            <ul className='flex flex-col gap-6 text-xl font-semibold'>
              {NavbarMenu.map((menu) => (
                <li key={menu.id}>
                  <a href={menu.path} onClick={() => setIsOpen(false)} className='block py-2 text-appleGray-400 dark:text-appleGray-300 hover:text-appleGray-900 dark:hover:text-white transition-colors border-b border-appleGray-50 dark:border-appleGray-900'>
                    {menu.title}
                  </a>
                </li>
              ))}

              {user ? (
                <div className="w-full flex flex-col gap-4 mt-6">
                  <div className="flex items-center gap-4">
                    <img src={user.avatar} alt="Avatar" className="w-12 h-12 rounded-full border border-appleGray-200 dark:border-white/30 object-cover shadow-md" />
                    <div className="text-left max-w-[200px]">
                      <p className="text-lg font-bold text-appleGray-900 dark:text-white truncate">{user.name}</p>
                      <p className="text-sm text-appleGray-400 truncate">{user.email}</p>
                    </div>
                  </div>
                  <div className="w-full flex gap-3 mt-4">
                    <Link to="/profile" className="flex-1" onClick={() => setIsOpen(false)}>
                      <button className='w-full py-2.5 rounded-full text-sm bg-appleGray-50 dark:bg-appleGray-950 font-semibold border border-appleGray-200 dark:border-white/10 text-appleGray-900 dark:text-white'>
                        Profile
                      </button>
                    </Link>
                    <button
                      onClick={() => { setUser(null); localStorage.removeItem('edumantra_user'); clearAuthCookie(); setIsOpen(false); }}
                      className='flex-1 py-2.5 rounded-full text-sm border border-appleGray-200 dark:border-white/10 text-appleGray-400 dark:text-appleGray-300 font-semibold hover:bg-appleGray-50 dark:hover:bg-white/5 transition-all'
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <div className="w-full mt-6">
                  <a href={import.meta.env.VITE_ADMIN_APP_URL || 'http://3.111.191.254:5470'} className="block" onClick={() => setIsOpen(false)}>
                    <button className='w-full py-3 rounded-full font-bold text-white bg-appleGray-900 hover:bg-appleGray-800 dark:bg-appleBlue dark:hover:bg-appleBlue-hover transition-colors text-base'>
                      Sign In
                    </button>
                  </a>
                </div>
              )}
            </ul>
          </Motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
