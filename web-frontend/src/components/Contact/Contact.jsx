import React, { useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { HiOutlineEnvelope, HiOutlinePhone, HiOutlineMapPin } from 'react-icons/hi2';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { PiSphereFill, PiCubeFill } from 'react-icons/pi';

const info = [
    { icon: <HiOutlineEnvelope />, label: "Email Us", value: "support@edumantra.in" },
    { icon: <HiOutlinePhone />, label: "Call Us", value: "+91 98765 43210" },
    { icon: <HiOutlineMapPin />, label: "Visit Us", value: "Kolkata, West Bengal, India" },
];

const inputClass = "w-full bg-appleGray-50 dark:bg-appleGray-900 border border-appleGray-100 dark:border-appleGray-800 rounded-2xl px-4 py-3 text-sm text-appleGray-900 dark:text-white placeholder-appleGray-400 focus:outline-none focus:ring-1 focus:ring-appleBlue transition-all duration-200";

const Contact = () => {
    const [sent, setSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSent(true);
        setTimeout(() => setSent(false), 4000);
    };

    return (
        <section id="contact" className='relative bg-[#f5f5f7] dark:bg-[#000000] border-t border-appleGray-100 dark:border-appleGray-800 overflow-hidden py-20 transition-colors duration-300'>
            {/* Decorative blobs */}
            <div className='absolute top-0 right-0 w-80 h-80 bg-appleBlue/[0.01] rounded-full blur-3xl pointer-events-none translate-x-1/3 -translate-y-1/3' />
            <div className='absolute bottom-0 left-0 w-96 h-96 bg-appleBlue/[0.01] rounded-full blur-3xl pointer-events-none -translate-x-1/3 translate-y-1/3' />

            {/* Floating 3D shapes in monochrome */}
            <div className='absolute inset-0 pointer-events-none hidden lg:block'>
                <Motion.div animate={{ y: [0, 20, 0], rotate: [0, 12, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} className='absolute top-16 right-[8%] text-appleBlue/[0.03] text-6xl'>
                    <PiSphereFill />
                </Motion.div>
                <Motion.div animate={{ y: [0, -20, 0], rotate: [0, -15, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} className='absolute bottom-20 right-[12%] text-appleBlue/[0.03] text-5xl'>
                    <PiCubeFill />
                </Motion.div>
            </div>

            <div className='container relative z-10'>
                {/* Header */}
                <Motion.div
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                    className='text-center mb-14'
                >
                    <span className='inline-block bg-white dark:bg-white/5 text-appleGray-400 dark:text-appleGray-300 border border-appleGray-100 dark:border-white/10 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 shadow-sm'>Get In Touch</span>
                    <h2 className='text-3xl sm:text-4xl font-extrabold tracking-tight text-appleGray-900 dark:text-white mb-4'>
                        Contact Us
                    </h2>
                    <p className='text-appleGray-400 dark:text-appleGray-300 max-w-xl mx-auto text-sm sm:text-base'>
                        Have a question or want to enrol? We'd love to hear from you. Drop us a message and we'll get back within 24 hours.
                    </p>
                </Motion.div>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-start'>

                    {/* Left — Info */}
                    <div className='space-y-5'>
                        {info.map((item, i) => (
                            <Motion.div
                                key={i}
                                initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.15 }}
                                className='flex items-center gap-5 bg-white dark:bg-appleGray-950 rounded-3xl p-5 shadow-[0_10px_30px_rgba(0,0,0,0.02)] dark:shadow-[0_10px_30px_rgba(255,255,255,0.005)] border border-appleGray-100 dark:border-appleGray-800 hover:shadow-[0_10px_35px_rgba(0,0,0,0.03)] dark:hover:shadow-none transition-shadow duration-300'
                            >
                                <div className='w-11 h-11 rounded-xl bg-appleGray-50 dark:bg-white/5 text-appleBlue flex items-center justify-center text-lg shrink-0 shadow-sm'>
                                    {item.icon}
                                </div>
                                <div className="text-left">
                                    <p className='text-xs text-appleGray-400 dark:text-appleGray-500 font-medium mb-0.5'>{item.label}</p>
                                    <p className='text-sm font-semibold text-appleGray-900 dark:text-white'>{item.value}</p>
                                </div>
                            </Motion.div>
                        ))}

                        {/* Map placeholder */}
                        <Motion.div
                            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }}
                            className='w-full h-44 rounded-3xl bg-white dark:bg-appleGray-950 border border-appleGray-100 dark:border-appleGray-800 flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.02)] dark:shadow-none overflow-hidden hover:shadow-[0_10px_35px_rgba(0,0,0,0.03)] dark:hover:shadow-none transition-shadow duration-300'
                        >
                            <span className='text-appleGray-400 text-sm font-medium'>📍 Kolkata, West Bengal</span>
                        </Motion.div>
                    </div>

                    {/* Right — Form */}
                    <Motion.form
                        initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
                        onSubmit={handleSubmit}
                        className='bg-white dark:bg-appleGray-950 rounded-3xl p-8 shadow-[0_10px_30px_rgba(0,0,0,0.02)] dark:shadow-none border border-appleGray-100 dark:border-appleGray-800 space-y-5 transition-shadow duration-300'
                    >
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                            <div className="text-left">
                                <label className='text-xs font-semibold text-appleGray-400 mb-1.5 block'>Full Name</label>
                                <input type='text' placeholder='Priya Sharma' className={inputClass} required />
                            </div>
                            <div className="text-left">
                                <label className='text-xs font-semibold text-appleGray-400 mb-1.5 block'>Email Address</label>
                                <input type='email' placeholder='you@example.com' className={inputClass} required />
                            </div>
                        </div>

                        <div className="text-left">
                            <label className='text-xs font-semibold text-appleGray-400 mb-1.5 block'>Subject</label>
                            <input type='text' placeholder='I want to enrol for WBCS course' className={inputClass} required />
                        </div>

                        <div className="text-left">
                            <label className='text-xs font-semibold text-appleGray-400 mb-1.5 block'>Message</label>
                            <textarea rows={5} placeholder='Tell us how we can help you...' className={`${inputClass} resize-none`} required />
                        </div>

                        <Motion.button
                            type='submit'
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className='w-full bg-appleBlue text-white hover:bg-appleBlue-hover rounded-2xl font-bold flex items-center justify-center gap-1.5 group transition-all py-3.5 text-base shadow-sm hover:shadow'
                        >
                            {sent ? 'Message Sent!' : (
                                <>Send Message <IoIosArrowRoundForward className='text-2xl group-hover:translate-x-1.5 transition-transform duration-200' /></>
                            )}
                        </Motion.button>
                    </Motion.form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
