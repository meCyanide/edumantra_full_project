import React, { useState } from 'react'
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { HiAcademicCap } from "react-icons/hi2";
import { Link } from 'react-router-dom';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { FaYoutube, FaInstagram, FaFacebookF } from "react-icons/fa";
import { IoChevronDown } from 'react-icons/io5';

const clearAuthCookie = () => {
  document.cookie = 'edumantra_user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
};

const NavbarMenu = [
  { id: 1, title: "Home", path: "/" },
  { id: 2, title: "Courses", path: "/#courses" },
  { id: 3, title: "Services", path: "/#services" },
  { id: 4, title: "About Us", path: "/#about" },
  { id: 5, title: "Our Team", path: "/#team" },
  { id: 6, title: "Contact Us", path: "/#contact" },
]

const Navbar = ({ user, setUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSocialOpen, setIsSocialOpen] = useState(false);

  return (
    <nav className='fixed top-0 w-full z-[100] bg-white border-b border-border text-txt-primary duration-300 shadow-navbar'>
      <Motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex justify-between items-center"
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className='w-9 h-9 rounded-lg bg-brand-primary flex items-center justify-center text-white text-xl border border-brand-primaryDark'>
            <HiAcademicCap className="text-brand-accentLight" />
          </div>
          <div className="flex flex-col">
            <h1 className='font-black text-xl tracking-tight text-brand-primary leading-none'>
              Edu<span className='text-brand-secondary font-bold'>Mantra</span>
            </h1>
            <span className="text-[9px] uppercase tracking-widest text-txt-secondary font-semibold">Civil Services</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className='hidden lg:flex items-center gap-6'>
          <ul className='flex items-center gap-0.5'>
            {NavbarMenu.map((menu) => (
              <li key={menu.id}>
                <a
                  href={menu.path}
                  className='inline-block py-1.5 px-3.5 text-sm text-txt-secondary hover:text-brand-secondary hover:bg-bg-surfaceAlt rounded-lg font-semibold transition-all duration-150'
                >
                  {menu.title}
                </a>
              </li>
            ))}

            {/* Social Dropdown */}
            <li className="relative">
              <button
                onMouseEnter={() => setIsSocialOpen(true)}
                onMouseLeave={() => setIsSocialOpen(false)}
                className='flex items-center gap-1 py-1.5 px-3.5 text-sm text-txt-secondary hover:text-brand-secondary hover:bg-bg-surfaceAlt rounded-lg font-semibold transition-all duration-150 focus:outline-none'
              >
                Social <IoChevronDown className={`transition-transform duration-200 text-xs ${isSocialOpen ? 'rotate-180' : ''}`} />
                <AnimatePresence>
                  {isSocialOpen && (
                    <Motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full right-0 mt-2 w-40 bg-white rounded-xl shadow-card-hover border border-border py-1.5 z-50 overflow-hidden"
                    >
                      <a href="#" className="flex items-center gap-3 px-4 py-2 hover:bg-bg-surfaceAlt transition-colors text-xs font-semibold text-txt-primary">
                        <FaYoutube className="text-[#FF0000] text-base" /> YouTube
                      </a>
                      <a href="#" className="flex items-center gap-3 px-4 py-2 hover:bg-bg-surfaceAlt transition-colors text-xs font-semibold text-txt-primary">
                        <FaInstagram className="text-[#E1306C] text-base" /> Instagram
                      </a>
                      <a href="#" className="flex items-center gap-3 px-4 py-2 hover:bg-bg-surfaceAlt transition-colors text-xs font-semibold text-txt-primary">
                        <FaFacebookF className="text-[#1877F2] text-base" /> Facebook
                      </a>
                    </Motion.div>
                  )}
                </AnimatePresence>
              </button>
            </li>
          </ul>

          <div className='h-5 w-[1px] bg-border mx-1' />

          {/* User Section */}
          {user ? (
            <div className="flex items-center gap-4">
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-brand-secondary/30 transition-all focus:outline-none"
                >
                  <img src={user.avatar} alt="Avatar" className="w-8 h-8 rounded-full border border-border object-cover" />
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <Motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18 }}
                      className="absolute right-0 mt-3 w-52 bg-white rounded-xl shadow-card-hover border border-border py-1.5 overflow-hidden z-[110]"
                    >
                      <div className="px-4 py-3 border-b border-border mb-1 bg-bg-surfaceAlt">
                        <p className="text-sm font-bold text-brand-primary truncate">{user.name}</p>
                        <p className="text-xs text-txt-secondary truncate">{user.email}</p>
                      </div>
                      <Link
                        to="/profile"
                        onClick={() => setIsProfileOpen(false)}
                        className="block px-4 py-2.5 text-xs font-semibold text-txt-secondary hover:bg-bg-surfaceAlt hover:text-brand-secondary transition-colors"
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
                        className="w-full text-left px-4 py-2.5 text-xs font-semibold text-status-error hover:bg-red-50 transition-colors"
                      >
                        Logout
                      </button>
                    </Motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ) : (
            <Link to="/signin" className="inline-block">
              <button className='btn-primary py-2 px-5'>
                Sign In
              </button>
            </Link>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className='lg:hidden flex items-center gap-3'>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg bg-bg-surfaceAlt border border-border text-txt-primary hover:bg-white transition-colors"
          >
            {isOpen ? <IoMdClose className='text-2xl' /> : <IoMdMenu className='text-2xl' />}
          </button>
        </div>
      </Motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <Motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className='fixed top-[64px] left-0 w-full h-[calc(100vh-64px)] bg-white border-t border-border shadow-card-hover z-50 flex flex-col px-6 py-8 lg:hidden overflow-y-auto'
          >
            <ul className='flex flex-col gap-2 text-base font-semibold'>
              {NavbarMenu.map((menu) => (
                <li key={menu.id}>
                  <a
                    href={menu.path}
                    onClick={() => setIsOpen(false)}
                    className='block py-2.5 px-4 rounded-lg text-txt-primary hover:bg-bg-surfaceAlt hover:text-brand-secondary transition-colors'
                  >
                    {menu.title}
                  </a>
                </li>
              ))}

              <li className="pt-4 pb-2 border-t border-border mt-2">
                <p className="text-txt-muted mb-3 text-xs uppercase tracking-widest font-bold">Social Channels</p>
                <div className="flex gap-3">
                  <a href="#" className="p-2.5 rounded-lg bg-bg-surfaceAlt text-[#FF0000] border border-border"><FaYoutube className="text-lg" /></a>
                  <a href="#" className="p-2.5 rounded-lg bg-bg-surfaceAlt text-[#E1306C] border border-border"><FaInstagram className="text-lg" /></a>
                  <a href="#" className="p-2.5 rounded-lg bg-bg-surfaceAlt text-[#1877F2] border border-border"><FaFacebookF className="text-lg" /></a>
                </div>
              </li>

              {user ? (
                <div className="w-full flex flex-col gap-3 mt-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-3">
                    <img src={user.avatar} alt="Avatar" className="w-11 h-11 rounded-full border-2 border-brand-secondary object-cover" />
                    <div className="text-left max-w-[200px]">
                      <p className="text-sm font-bold text-brand-primary truncate">{user.name}</p>
                      <p className="text-xs text-txt-secondary truncate">{user.email}</p>
                    </div>
                  </div>
                  <div className="w-full flex gap-3 mt-1">
                    <Link to="/profile" className="flex-1" onClick={() => setIsOpen(false)}>
                      <button className='w-full py-2.5 rounded-lg text-xs bg-bg-surfaceAlt font-bold border border-border text-brand-primary'>
                        Profile
                      </button>
                    </Link>
                    <button
                      onClick={() => { setUser(null); localStorage.removeItem('edumantra_user'); clearAuthCookie(); setIsOpen(false); }}
                      className='flex-1 py-2.5 rounded-lg text-xs border border-border text-status-error font-bold hover:bg-red-50 transition-all'
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <div className="w-full mt-4 pt-4 border-t border-border">
                  <Link to="/signin" className="block" onClick={() => setIsOpen(false)}>
                    <button className='btn-primary w-full py-3 text-sm'>
                      Sign In
                    </button>
                  </Link>
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
