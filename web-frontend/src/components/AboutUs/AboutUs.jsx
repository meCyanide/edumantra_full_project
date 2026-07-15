import React, { useRef, useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiUsers, FiBookOpen, FiAward, FiTrendingUp } from 'react-icons/fi';
import { HiCheckCircle, HiOutlineArrowUpRight } from 'react-icons/hi2';

const stats = [
    { icon: <FiUsers />, value: "10,000+", label: "Active Students", delay: 0 },
    { icon: <FiBookOpen />, value: "50+", label: "Expert Courses", delay: 0.12 },
    { icon: <FiAward />, value: "95%", label: "Success Rate", delay: 0.24 },
    { icon: <FiTrendingUp />, value: "8+", label: "Years of Excellence", delay: 0.36 },
];

const values = [
    "Expert-designed curriculum aligned with latest exam patterns",
    "Live doubt-clearing sessions with experienced faculty",
    "Performance analytics & personalised study plans",
    "Affordable pricing with EMI & scholarship options",
];

const StatCard = ({ stat, index }) => {
    const ref = useRef(null);
    const [rotate, setRotate] = useState({ x: 0, y: 0 });
    const [shine, setShine] = useState({ x: 50, y: 50, opacity: 0 });
    const [hovered, setHovered] = useState(false);

    const onMouseMove = (e) => {
        const card = ref.current;
        if (!card) return;
        const { left, top, width, height } = card.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;
        setRotate({ x: ((y / height) - 0.5) * -15, y: ((x / width) - 0.5) * 15 });
        setShine({ x: (x / width) * 100, y: (y / height) * 100, opacity: 0.06 });
    };

    return (
        <Motion.div
            ref={ref}
            onMouseMove={onMouseMove}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => { setRotate({ x: 0, y: 0 }); setShine({ x: 50, y: 50, opacity: 0 }); setHovered(false); }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.12 }}
            animate={{ rotateX: rotate.x, rotateY: rotate.y, scale: hovered ? 1.03 : 1 }}
            style={{ transformStyle: "preserve-3d", perspective: "800px" }}
            className='relative rounded-3xl p-6 bg-white dark:bg-appleGray-950 border border-appleGray-100 dark:border-appleGray-800 shadow-[0_10px_30px_rgba(0,0,0,0.02)] dark:shadow-[0_10px_30px_rgba(255,255,255,0.005)] overflow-hidden cursor-default transition-shadow duration-300'
        >
            <div className='absolute inset-0 rounded-3xl pointer-events-none' style={{ background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(255,255,255,${shine.opacity}) 0%, transparent 60%)` }} />
            <div className='absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-appleGray-200 dark:via-white/10 to-transparent' />
            
            <div style={{ transform: "translateZ(25px)" }} className='inline-flex items-center justify-center w-10 h-10 rounded-xl bg-appleGray-50 dark:bg-white/5 text-appleBlue text-lg shadow-sm mb-4'>
                {stat.icon}
            </div>
            
            <div style={{ transform: "translateZ(20px)" }}>
                <p className='text-2xl sm:text-3xl font-extrabold text-appleGray-900 dark:text-white tracking-tight'>{stat.value}</p>
                <p className='text-xs sm:text-sm text-appleGray-400 dark:text-appleGray-300 mt-1 font-medium'>{stat.label}</p>
            </div>
        </Motion.div>
    );
};

const AboutUs = () => (
    <section id="about" className='relative bg-white dark:bg-appleGray-900 border-t border-appleGray-100 dark:border-appleGray-800 overflow-hidden scroll-mt-28 transition-colors duration-300'>
        <div className='absolute top-0 left-0 w-72 h-72 bg-appleBlue/[0.01] rounded-full blur-3xl pointer-events-none -translate-x-1/3 -translate-y-1/3' />
        <div className='absolute bottom-0 right-0 w-96 h-96 bg-appleBlue/[0.01] rounded-full blur-3xl pointer-events-none translate-x-1/3 translate-y-1/3' />

        <div className='container py-20 relative z-10'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center'>

                {/* Left — Mission */}
                <div className='space-y-6'>
                    <Motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                        <span className='inline-block bg-appleGray-50 dark:bg-white/5 text-appleGray-400 dark:text-appleGray-300 border border-appleGray-100 dark:border-white/10 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 shadow-sm'>
                            Our Story
                        </span>
                        <h2 className='text-3xl sm:text-4xl font-extrabold tracking-tight text-appleGray-900 dark:text-white leading-tight mb-4'>
                            Why Choose <span className='text-appleBlue'>EduMantra?</span>
                        </h2>
                        <p className='text-appleGray-400 dark:text-appleGray-300 text-sm sm:text-base leading-relaxed font-normal'>
                            EduMantra was founded with one goal — to make quality exam preparation accessible to every aspiring student in India.
                            With over 8 years of experience, our faculty brings real-world insights and proven strategies to help you crack WBCS, IAS, IPS, SSC, and more.
                        </p>
                    </Motion.div>

                    <Motion.ul className='space-y-3' initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}>
                        {values.map((v, i) => (
                            <li key={i} className='flex items-start gap-2.5'>
                                <HiCheckCircle className='text-appleBlue text-lg mt-0.5 shrink-0' />
                                <span className='text-appleGray-400 dark:text-appleGray-300 text-xs sm:text-sm font-medium'>{v}</span>
                            </li>
                        ))}
                    </Motion.ul>

                    <Link to="/working" className="inline-block pt-2">
                        <Motion.button
                            initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}
                            className='primary-btn flex items-center gap-1.5 group'
                        >
                            Learn More About Us
                            <HiOutlineArrowUpRight className='text-sm group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200' />
                        </Motion.button>
                    </Link>
                </div>

                {/* Right — Stats grid */}
                <div className='grid grid-cols-2 gap-5' style={{ perspective: "1000px" }}>
                    {stats.map((stat, i) => <StatCard key={i} stat={stat} index={i} />)}
                </div>
            </div>
        </div>
    </section>
);

export default AboutUs;
