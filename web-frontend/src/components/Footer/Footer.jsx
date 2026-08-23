import React, { useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { FaLinkedinIn, FaTwitter, FaInstagram, FaYoutube, FaFacebookF } from 'react-icons/fa';
import { HiAcademicCap } from 'react-icons/hi2';
import { IoIosArrowRoundForward } from 'react-icons/io';

const links = {
    "Quick Links": [
        { label: "Home", href: "/" },
        { label: "Courses", href: "/#courses" },
        { label: "Services", href: "/#services" },
        { label: "About Us", href: "/#about" },
        { label: "Our Team", href: "/#team" },
        { label: "Contact Us", href: "/#contact" },
    ],
    "Exam Prep": [
        { label: "WBCS Preparation", href: "/working" },
        { label: "UPSC / IAS Coaching", href: "/working" },
        { label: "IPS Specialized Track", href: "/working" },
        { label: "SSC All-Tier Series", href: "/working" },
        { label: "Live Mock Tests", href: "/working" },
    ],
    "Support & Trust": [
        { label: "Student FAQs", href: "/working" },
        { label: "Privacy Policy", href: "/working" },
        { label: "Terms of Service", href: "/working" },
        { label: "Fee Refund Policy", href: "/working" },
        { label: "Grievance Redressal", href: "/working" },
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
        <footer className='bg-[#0B1F3A] text-white border-t border-blue-900/40'>
            {/* Top amber accent line */}
            <div className='h-[2px] w-full bg-gradient-to-r from-transparent via-brand-accent to-transparent' />

            <div className='container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8'>

                {/* Main grid */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-blue-800/40'>

                    {/* Brand column */}
                    <div className='lg:col-span-2 space-y-5 text-left'>
                        {/* Logo */}
                        <div className='flex items-center gap-2.5'>
                            <div className='w-9 h-9 rounded-lg bg-blue-600 border border-white/20 flex items-center justify-center text-white text-xl'>
                                <HiAcademicCap className="text-brand-accentLight" />
                            </div>
                            <span className='text-white text-xl font-extrabold tracking-tight'>
                                Edu<span className='text-blue-400'>Mantra</span>
                            </span>
                        </div>

                        <p className='text-xs sm:text-sm leading-relaxed max-w-xs text-white/90 font-normal'>
                            India's trusted civil services mentorship institute for WBCS, UPSC, IPS &amp; SSC. Empowering thousands of career aspirants with officer guidance and smart analytics.
                        </p>

                        {/* Social icons */}
                        <div className='flex gap-2.5 flex-wrap pt-1'>
                            {socials.map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    aria-label={s.label}
                                    className='w-9 h-9 rounded-lg bg-white/15 hover:bg-blue-600 border border-white/20 flex items-center justify-center text-xs text-white hover:text-white transition-all duration-200 hover:scale-105'
                                >
                                    {s.icon}
                                </a>
                            ))}
                        </div>

                        {/* Newsletter */}
                        <div className='mt-2 p-4 rounded-xl bg-white/10 border border-white/20 max-w-sm'>
                            <p className='text-white text-xs font-bold mb-2.5'>Get weekly exam briefs &amp; GK dossiers</p>
                            <form onSubmit={handleSubscribe} className='flex gap-2'>
                                <input
                                    type='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder='your.email@example.com'
                                    className='flex-1 min-w-0 bg-white/15 border border-white/25 rounded-lg px-3.5 py-2 text-xs text-white placeholder-white/60 focus:outline-none focus:ring-1 focus:ring-blue-400 transition-all'
                                    required
                                />
                                <Motion.button
                                    type='submit'
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.96 }}
                                    className='px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold shrink-0 transition-all'
                                >
                                    {subscribed ? '✓' : <IoIosArrowRoundForward className='text-lg' />}
                                </Motion.button>
                            </form>
                            {subscribed && <p className='text-brand-accentLight text-[11px] mt-2 font-medium'>🎉 Subscribed! Check your inbox soon.</p>}
                        </div>
                    </div>

                    {/* Nav columns */}
                    {Object.entries(links).map(([title, items]) => (
                        <div key={title} className='space-y-4 text-left'>
                            <h4 className='text-white font-extrabold text-xs uppercase tracking-wider'>{title}</h4>
                            <ul className='space-y-2.5'>
                                {items.map((item) => (
                                    <li key={item.label}>
                                        <a
                                            href={item.href}
                                            className='text-xs sm:text-sm text-white/90 hover:text-white hover:underline transition-all duration-200 block font-normal'
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
                <div className='pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/80'>
                    <p>© {new Date().getFullYear()} EduMantra Civil Services. All rights reserved.</p>
                    <div className='flex gap-5 text-xs text-white/80'>
                        {["Privacy Policy", "Terms of Use", "Refund Policy"].map((t) => (
                            <a key={t} href='/working' className='hover:text-white underline transition-colors duration-200'>{t}</a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
