import React, { useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { FaLinkedinIn, FaTwitter, FaInstagram, FaYoutube, FaFacebookF } from 'react-icons/fa';
import { HiAcademicCap } from 'react-icons/hi2';
import { IoIosArrowRoundForward } from 'react-icons/io';

const links = {
    "Quick Links": [
        { label: "Home", href: "/" },
        { label: "Services", href: "/#services" },
        { label: "About Us", href: "/#about" },
        { label: "Our Team", href: "/#team" },
        { label: "Contact Us", href: "/#contact" },
    ],
    "Exam Prep": [
        { label: "WBCS Preparation", href: "/working" },
        { label: "UPSC / IAS", href: "/working" },
        { label: "IPS Preparation", href: "/working" },
        { label: "SSC Exams", href: "/working" },
        { label: "Live Mock Tests", href: "/working" },
    ],
    "Support": [
        { label: "FAQ", href: "/working" },
        { label: "Privacy Policy", href: "/working" },
        { label: "Terms of Service", href: "/working" },
        { label: "Refund Policy", href: "/working" },
        { label: "Grievance", href: "/working" },
    ],
};

const socials = [
    { icon: <FaLinkedinIn />, href: "#", label: "LinkedIn" },
    { icon: <FaTwitter />, href: "#", label: "Twitter" },
    { icon: <FaInstagram />, href: "#", label: "Instagram" },
    { icon: <FaYoutube />, href: "#", label: "YouTube" },
    { icon: <FaFacebookF />, href: "#", label: "Facebook" },
];

const Footer = () => {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (!email) return;
        setSubscribed(true);
        setEmail('');
        setTimeout(() => setSubscribed(false), 4000);
    };

    return (
        <footer className='relative bg-[#f5f5f7] dark:bg-[#000000] text-appleGray-400 dark:text-appleGray-500 overflow-hidden border-t border-appleGray-100 dark:border-appleGray-800 transition-colors duration-300'>
            {/* Top divider accent */}
            <div className='h-[1px] w-full bg-gradient-to-r from-transparent via-appleGray-200 dark:via-appleGray-800 to-transparent' />

            <div className='container relative z-10 pt-16 pb-8'>

                {/* Main grid */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-appleGray-200 dark:border-appleGray-800'>

                    {/* Brand column — spans 2 cols on lg */}
                    <div className='lg:col-span-2 space-y-5 text-left'>
                        {/* Logo */}
                        <div className='flex items-center gap-2'>
                            <div className='w-8 h-8 rounded-lg bg-black dark:bg-white flex items-center justify-center text-white dark:text-black text-lg shadow-sm'>
                                <HiAcademicCap />
                            </div>
                            <span className='text-appleGray-900 dark:text-white text-lg font-bold tracking-tight'>EduMantra</span>
                        </div>

                        <p className='text-xs sm:text-sm leading-relaxed max-w-xs text-appleGray-400 dark:text-appleGray-400'>
                            India's trusted exam preparation platform for WBCS, IAS, IPS &amp; SSC —
                            empowering aspirants with expert mentorship and smart study tools since 2016.
                        </p>

                        {/* Social icons */}
                        <div className='flex gap-2.5 flex-wrap'>
                            {socials.map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    aria-label={s.label}
                                    className='w-8 h-8 rounded-lg bg-white dark:bg-white/5 border border-appleGray-200 dark:border-white/10 flex items-center justify-center text-xs text-appleGray-400 dark:text-appleGray-300 transition-all duration-200 hover:bg-appleBlue dark:hover:bg-appleBlue hover:text-white dark:hover:text-white hover:scale-105 shadow-sm'
                                >
                                    {s.icon}
                                </a>
                            ))}
                        </div>

                        {/* Newsletter */}
                        <div className='mt-2'>
                            <p className='text-appleGray-900 dark:text-white text-xs font-semibold mb-2.5'>Get free exam tips in your inbox</p>
                            <form onSubmit={handleSubscribe} className='flex gap-2 max-w-xs'>
                                <input
                                    type='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder='you@example.com'
                                    className='flex-1 min-w-0 bg-white dark:bg-appleGray-900 border border-appleGray-200 dark:border-appleGray-800 rounded-xl px-3.5 py-2 text-xs text-appleGray-900 dark:text-white placeholder-appleGray-300 dark:placeholder-appleGray-600 focus:outline-none focus:ring-1 focus:ring-appleBlue transition-all'
                                    required
                                />
                                <Motion.button
                                    type='submit'
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.96 }}
                                    className='px-3.5 py-2 bg-appleBlue text-white rounded-xl text-xs font-semibold shrink-0 shadow-sm transition-all hover:bg-appleBlue-hover'
                                >
                                    {subscribed ? '✓' : <IoIosArrowRoundForward className='text-lg' />}
                                </Motion.button>
                            </form>
                            {subscribed && <p className='text-appleBlue text-[11px] mt-2 font-medium'>🎉 Subscribed! Check your inbox.</p>}
                        </div>
                    </div>

                    {/* Nav columns */}
                    {Object.entries(links).map(([title, items]) => (
                        <div key={title} className='space-y-4 text-left'>
                            <h4 className='text-appleGray-900 dark:text-white font-semibold text-xs uppercase tracking-wider'>{title}</h4>
                            <ul className='space-y-2'>
                                {items.map((item) => (
                                    <li key={item.label}>
                                        <a
                                            href={item.href}
                                            className='text-xs sm:text-sm text-appleGray-400 dark:text-appleGray-400 hover:text-appleBlue dark:hover:text-appleBlue hover:underline transition-all duration-200 block'
                                        >
                                            {item.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom bar */}
                <div className='pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-appleGray-400 dark:text-appleGray-500'>
                    <p>© {new Date().getFullYear()} EduMantra. All rights reserved.</p>
                    <p>
                        Made with{' '}
                        <span className='text-rose-500 text-sm'>♥</span>{' '}
                        in Kolkata, India
                    </p>
                    <div className='flex gap-4'>
                        {["Privacy Policy", "Terms", "Refund Policy"].map((t) => (
                            <a key={t} href='#' className='hover:text-appleBlue transition-colors duration-200'>{t}</a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
