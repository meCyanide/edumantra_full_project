import React from 'react';
import { motion as Motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiUsers, FiBookOpen, FiAward, FiTrendingUp } from 'react-icons/fi';
import { HiCheckCircle, HiOutlineArrowUpRight, HiShieldCheck } from 'react-icons/hi2';

const stats = [
    { icon: <FiUsers />, value: "10,000+", label: "Active Students", delay: 0 },
    { icon: <FiBookOpen />, value: "50+", label: "Expert Courses", delay: 0.1 },
    { icon: <FiAward />, value: "95%", label: "Success Rate", delay: 0.2 },
    { icon: <FiTrendingUp />, value: "8+", label: "Years of Excellence", delay: 0.3 },
];

const values = [
    "Officer-crafted syllabus aligned with the latest UPSC & WBCS patterns",
    "Live interactive doubt-clearing sessions with experienced faculty",
    "Deep analytics & personalised roadmap for weak subject improvement",
    "Transparent pricing with merit scholarships & flexible fee plans",
];

const StatCard = ({ stat }) => (
    <Motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: stat.delay }}
        className='bg-white border border-border rounded-2xl p-6 shadow-card hover:shadow-card-hover hover:border-border-hover transition-all duration-250 cursor-default'
    >
        <div className='inline-flex items-center justify-center w-11 h-11 rounded-xl bg-bg-surfaceAlt border border-border text-brand-secondary text-xl mb-4'>
            {stat.icon}
        </div>
        <p className='text-2xl sm:text-3xl font-black text-brand-primary tracking-tight'>{stat.value}</p>
        <p className='text-xs sm:text-sm text-txt-secondary mt-1 font-semibold'>{stat.label}</p>
    </Motion.div>
);

const AboutUs = () => (
    <section id="about" className='bg-bg-page border-t border-border scroll-mt-28 py-24'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center'>

                {/* Left — Mission */}
                <div className='space-y-6'>
                    <Motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                        <div className='section-badge mb-4'>
                            <HiShieldCheck className="text-brand-secondary text-sm" />
                            Our Legacy &amp; Commitment
                        </div>
                        <h2 className='text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-primary leading-tight mb-4'>
                            Why Choose <span className='text-brand-secondary'>EduMantra?</span>
                        </h2>
                        <p className='text-txt-secondary text-sm sm:text-base leading-relaxed'>
                            EduMantra was established with a singular mission: to democratize high-grade civil services mentorship in India.
                            Backed by senior bureaucrats, IAS/IPS mentors, and top-tier academicians, our curriculum equips candidates with the analytical sharpness and composure needed to top WBCS, UPSC, and SSC examinations.
                        </p>
                    </Motion.div>

                    <Motion.ul className='space-y-3' initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }}>
                        {values.map((v, i) => (
                            <li key={i} className='flex items-start gap-3 bg-white border border-border p-3.5 rounded-xl shadow-card'>
                                <HiCheckCircle className='text-status-success text-xl mt-0.5 shrink-0' />
                                <span className='text-txt-primary text-xs sm:text-sm font-medium'>{v}</span>
                            </li>
                        ))}
                    </Motion.ul>

                    <Link to="/working" className="inline-block pt-2">
                        <Motion.button
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.3 }}
                            className='btn-primary py-3 px-7 gap-2'
                        >
                            Learn More About Us
                            <HiOutlineArrowUpRight className='text-base' />
                        </Motion.button>
                    </Link>
                </div>

                {/* Right — Stats grid */}
                <div className='grid grid-cols-2 gap-5'>
                    {stats.map((stat, i) => <StatCard key={i} stat={stat} />)}
                </div>
            </div>
        </div>
    </section>
);

export default AboutUs;
