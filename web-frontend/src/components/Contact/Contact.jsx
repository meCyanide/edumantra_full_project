import React, { useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { HiOutlineEnvelope, HiOutlinePhone, HiOutlineMapPin, HiOutlineChatBubbleLeftRight } from 'react-icons/hi2';
import { IoIosArrowRoundForward } from 'react-icons/io';

const info = [
    { icon: <HiOutlineEnvelope />, label: "Email Us", value: "support@edumantra.in" },
    { icon: <HiOutlinePhone />, label: "Counseling Hotline", value: "+91 98765 43210" },
    { icon: <HiOutlineMapPin />, label: "Academy Location", value: "Salt Lake Sector V, Kolkata, India" },
];

const inputClass = "w-full bg-bg-surfaceAlt border border-border rounded-lg px-4 py-3 text-sm text-txt-primary placeholder-txt-muted focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-secondary/30 focus:border-brand-secondary transition-all duration-200";

const Contact = () => {
    const [sent, setSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSent(true);
        setTimeout(() => setSent(false), 4000);
    };

    return (
        <section id="contact" className='bg-bg-surfaceAlt border-t border-border py-24'>
            <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
                {/* Header */}
                <Motion.div
                    initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                    className='text-center mb-16'
                >
                    <div className='section-badge mb-4'>
                        <HiOutlineChatBubbleLeftRight className="text-brand-secondary text-base" />
                        Personalized Counseling
                    </div>
                    <h2 className='text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-primary mb-4'>
                        Get in Touch with Our Mentors
                    </h2>
                    <p className='text-txt-secondary max-w-2xl mx-auto text-sm sm:text-base leading-relaxed'>
                        Have queries about batch schedules, course structure, or strategy? Fill out the form or reach us directly.
                    </p>
                </Motion.div>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 items-start'>

                    {/* Left — Info */}
                    <div className='space-y-4'>
                        {info.map((item, i) => (
                            <Motion.div
                                key={i}
                                initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}
                                className='flex items-center gap-5 bg-white border border-border rounded-2xl p-5 shadow-card hover:shadow-card-hover hover:border-border-hover transition-all duration-250'
                            >
                                <div className='w-11 h-11 rounded-xl bg-bg-surfaceAlt border border-border text-brand-secondary flex items-center justify-center text-xl shrink-0'>
                                    {item.icon}
                                </div>
                                <div className="text-left">
                                    <p className='text-xs text-txt-secondary font-semibold mb-0.5'>{item.label}</p>
                                    <p className='text-sm font-bold text-brand-primary'>{item.value}</p>
                                </div>
                            </Motion.div>
                        ))}

                        {/* Campus badge */}
                        <Motion.div
                            initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.3 }}
                            className='w-full h-44 bg-white border border-border rounded-2xl shadow-card flex flex-col items-center justify-center p-6 text-center'
                        >
                            <div className="w-10 h-10 rounded-xl bg-brand-primary text-brand-accentLight flex items-center justify-center text-lg mb-3">
                                📍
                            </div>
                            <h4 className="text-sm font-bold text-brand-primary">Kolkata Head Learning Centre</h4>
                            <p className="text-xs text-txt-secondary mt-1 max-w-xs">Salt Lake City, Sector V, Kolkata, West Bengal, 700091</p>
                        </Motion.div>
                    </div>

                    {/* Right — Form */}
                    <Motion.form
                        initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
                        onSubmit={handleSubmit}
                        className='bg-white border border-border rounded-2xl p-8 sm:p-10 shadow-card space-y-5'
                    >
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                            <div className="text-left">
                                <label className='text-xs font-bold text-brand-primary mb-1.5 block'>Full Name</label>
                                <input type='text' placeholder='Priya Sharma' className={inputClass} required />
                            </div>
                            <div className="text-left">
                                <label className='text-xs font-bold text-brand-primary mb-1.5 block'>Email Address</label>
                                <input type='email' placeholder='priya@example.com' className={inputClass} required />
                            </div>
                        </div>

                        <div className="text-left">
                            <label className='text-xs font-bold text-brand-primary mb-1.5 block'>Target Exam</label>
                            <select className={inputClass} required defaultValue="">
                                <option value="" disabled>Select your primary goal</option>
                                <option value="wbcs">WBCS (Executive / General)</option>
                                <option value="upsc">UPSC / IAS / IFS</option>
                                <option value="ips">IPS (Police Service)</option>
                                <option value="ssc">SSC (CGL / CHSL)</option>
                            </select>
                        </div>

                        <div className="text-left">
                            <label className='text-xs font-bold text-brand-primary mb-1.5 block'>Message / Doubt</label>
                            <textarea rows={4} placeholder='Tell us your background and how our mentors can guide you...' className={`${inputClass} resize-none`} required />
                        </div>

                        <Motion.button
                            type='submit'
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            className='w-full btn-primary py-3.5 text-sm gap-2'
                        >
                            {sent ? 'Message Received! Mentor will call soon.' : (
                                <>Submit Inquiry <IoIosArrowRoundForward className='text-xl' /></>
                            )}
                        </Motion.button>
                    </Motion.form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
