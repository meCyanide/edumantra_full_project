import React from 'react';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { IoChevronDown } from 'react-icons/io5';
import ashokStambha from "../../assets/ashok_stambha.png";
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { HiAcademicCap } from "react-icons/hi2";
import { FiUsers, FiBookOpen, FiAward } from "react-icons/fi";

export const Fadeup = (delay) => ({
    initial: { opacity: 0, y: 30 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 80, duration: 0.6, delay, ease: "easeOut" }
    }
});

const stats = [
    { icon: <FiUsers />, value: "10K+", label: "Students" },
    { icon: <FiBookOpen />, value: "50+", label: "Courses" },
    { icon: <FiAward />, value: "95%", label: "Success Rate" },
    { icon: <HiAcademicCap />, value: "8+", label: "Years Exp." },
];

const Hero = () => {
    const roles = ["WBCS Officer", "IAS Officer", "IPS Officer"];
    const [currentRole, setCurrentRole] = React.useState(0);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setCurrentRole((prev) => (prev + 1) % roles.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [roles.length]);

    const scrollToNext = () => {
        const servicesSection = document.getElementById('services');
        if (servicesSection) {
            servicesSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className='relative overflow-hidden bg-[#f5f5f7] dark:bg-[#000000] text-[#1d1d1f] dark:text-white min-h-screen flex items-center pt-[64px] transition-colors duration-300'>

            {/* Subtle radial glow behind Ashok Stambha */}
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-appleBlue/[0.04] dark:bg-white/[0.02] rounded-full blur-[100px] pointer-events-none' />

            {/* Grid pattern background */}
            <div
                className='absolute inset-0 pointer-events-none opacity-[0.02] dark:opacity-[0.03]'
                style={{
                    backgroundImage: `linear-gradient(rgba(0,113,227,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,113,227,0.1) 1px, transparent 1px)`,
                    backgroundSize: '60px 60px',
                }}
            />

            <div className='container py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10'>

                {/* ── LEFT: Content ── */}
                <div className='flex flex-col gap-6 text-center lg:text-left'>

                    {/* Badge */}
                    <Motion.div
                        variants={Fadeup(0.1)}
                        initial="initial"
                        animate="animate"
                        className='flex justify-center lg:justify-start'
                    >
                        <span className='inline-flex items-center gap-2 bg-white dark:bg-white/5 text-appleGray-400 dark:text-appleGray-300 border border-appleGray-100 dark:border-white/10 text-xs font-semibold px-4 py-1.5 rounded-full shadow-sm'>
                            <HiAcademicCap className='text-sm text-appleBlue' />
                            India's Trusted Exam Prep Platform
                        </span>
                    </Motion.div>

                    {/* Heading — multi-line */}
                    <Motion.div
                        variants={Fadeup(0.25)}
                        initial="initial"
                        animate="animate"
                        className='space-y-1.5'
                    >
                        <h1 className='text-4xl sm:text-5xl xl:text-6xl font-extrabold leading-tight tracking-tight text-appleGray-900 dark:text-white'>
                            Let's Build Your
                        </h1>
                        <h1 className='text-4xl sm:text-5xl xl:text-6xl font-extrabold leading-tight tracking-tight'>
                            <AnimatePresence mode='wait'>
                                <Motion.span
                                    key={roles[currentRole]}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -20, opacity: 0 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    className='text-appleBlue inline-block'
                                >
                                    {roles[currentRole]}
                                </Motion.span>
                            </AnimatePresence>
                        </h1>
                        <h1 className='text-4xl sm:text-5xl xl:text-6xl font-extrabold leading-tight tracking-tight text-appleGray-900 dark:text-white'>
                            Career Together.
                        </h1>
                    </Motion.div>

                    {/* Subtitle */}
                    <Motion.p
                        variants={Fadeup(0.4)}
                        initial="initial"
                        animate="animate"
                        className='text-appleGray-400 dark:text-appleGray-300 text-sm sm:text-base max-w-lg mx-auto lg:mx-0 leading-relaxed font-normal'
                    >
                        Expert-led courses, live mock tests, and personalised mentorship —
                        everything you need to crack WBCS, IAS, IPS &amp; more.
                    </Motion.p>

                    {/* CTA — Explore Platform */}
                    <Motion.div
                        variants={Fadeup(0.55)}
                        initial="initial"
                        animate="animate"
                        className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center pt-2'
                    >
                        <button
                            onClick={() => window.location.href = import.meta.env.VITE_PUBLIC_APP_URL || 'http://3.111.191.254:80'}
                            className='primary-btn flex items-center justify-center gap-2 py-3 px-8 text-base font-bold w-full sm:w-auto text-white bg-appleBlue hover:bg-appleBlue/90 rounded-full transition-all duration-200 shadow-md hover:shadow-lg group'
                        >
                            Explore Services
                            <IoIosArrowRoundForward className='text-2xl group-hover:translate-x-1.5 transition-transform duration-200' />
                        </button>
                    </Motion.div>

                    {/* Stats */}
                    <Motion.div
                        variants={Fadeup(0.7)}
                        initial="initial"
                        animate="animate"
                        className='grid grid-cols-4 gap-4 pt-6 border-t border-appleGray-100 dark:border-appleGray-800'
                    >
                        {stats.map((stat, i) => (
                            <div key={i} className='flex flex-col items-center lg:items-start gap-1'>
                                <div className='flex items-center gap-1 text-appleGray-400 dark:text-appleGray-300 text-sm sm:text-base'>
                                    <span className='text-appleBlue text-xs sm:text-sm'>{stat.icon}</span>
                                    <span className='text-sm sm:text-base font-bold text-appleGray-900 dark:text-white'>{stat.value}</span>
                                </div>
                                <span className='text-[10px] sm:text-xs text-appleGray-400'>{stat.label}</span>
                            </div>
                        ))}
                    </Motion.div>
                </div>

                {/* ── RIGHT: Ashok Stambha Image ── */}
                <div className='flex justify-center items-center relative'>
                    {/* Glow behind image */}
                    <div className='absolute w-72 h-72 bg-appleBlue/[0.03] dark:bg-white/[0.02] rounded-full blur-3xl pointer-events-none animate-glow' />

                    <Motion.div
                        initial={{ opacity: 0, x: 40, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        className='relative cursor-pointer'
                        style={{ perspective: "1200px" }}
                    >
                        <Motion.img
                            src={ashokStambha}
                            alt="Ashok Stambha - National Emblem of India"
                            className='w-full max-w-[280px] sm:max-w-[340px] lg:max-w-[400px] xl:max-w-[440px] relative z-10 drop-shadow-mono grayscale-[20%] hover:grayscale-0 transition-all duration-500'
                            animate={{ y: [0, -12, 0] }}
                            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                        />

                        {/* Floating badge 1 */}
                        <Motion.div
                            animate={{ y: [0, -6, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                            className='absolute -left-6 top-1/4 bg-white dark:bg-appleGray-950 border border-appleGray-100 dark:border-white/10 shadow-lg rounded-2xl px-4 py-2 flex items-center gap-2 z-20 transition-colors'
                        >
                            <span className='text-lg'>🏆</span>
                            <div className="text-left">
                                <p className='text-xs font-bold text-appleGray-900 dark:text-white'>Top Ranked</p>
                                <p className='text-[9px] text-appleGray-400'>Exam Platform</p>
                            </div>
                        </Motion.div>

                        {/* Floating badge 2 */}
                        <Motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className='absolute -right-4 bottom-1/4 bg-white dark:bg-appleGray-950 border border-appleGray-100 dark:border-white/10 shadow-lg rounded-2xl px-4 py-2 flex items-center gap-2 z-20 transition-colors'
                        >
                            <span className='text-lg'>🎯</span>
                            <div className="text-left">
                                <p className='text-xs font-bold text-appleGray-900 dark:text-white'>95% Pass Rate</p>
                                <p className='text-[9px] text-appleGray-400'>Our Students</p>
                            </div>
                        </Motion.div>
                    </Motion.div>
                </div>
            </div>

            {/* ── Scroll Down Arrow ── */}
            <Motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                onClick={scrollToNext}
                className='absolute bottom-8 left-1/2 -translate-x-1/2 z-20 cursor-pointer flex flex-col items-center gap-1.5 group'
            >
                <span className='text-[10px] text-appleGray-400 uppercase tracking-widest font-semibold group-hover:text-appleGray-900 dark:group-hover:text-white transition-colors duration-200'>Scroll Down</span>
                <Motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className='w-9 h-9 rounded-full border border-appleGray-200 dark:border-white/20 flex items-center justify-center group-hover:border-appleGray-400 dark:group-hover:border-white/40 transition-colors'
                >
                    <IoChevronDown className='text-appleGray-400 text-sm group-hover:text-appleGray-900 dark:group-hover:text-white transition-colors' />
                </Motion.div>
            </Motion.div>
        </section>
    );
};

export default Hero;
