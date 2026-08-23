import React from 'react';
import { motion as Motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaLaptopCode } from 'react-icons/fa';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { HiSparkles } from 'react-icons/hi2';

const BusyDevelopers = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-bg-page text-txt-primary pt-[80px] pb-16 px-4 font-inter">

            <Motion.div
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="text-center max-w-xl bg-white p-10 sm:p-12 rounded-2xl border border-border shadow-card-hover"
            >
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-secondary/10 border border-brand-secondary/20 text-brand-secondary text-xs font-bold mb-6">
                    <HiSparkles className="text-brand-accent text-sm" />
                    New Modules Incoming
                </div>

                <Motion.div
                    animate={{
                        y: [0, -10, 0],
                        rotateZ: [0, 2, -2, 0]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="text-6xl text-brand-secondary mb-6 flex justify-center drop-shadow-sm"
                >
                    <FaLaptopCode />
                </Motion.div>

                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-brand-primary mb-3">
                    Feature Under Construction
                </h1>

                <p className="text-txt-secondary text-sm sm:text-base mb-8 leading-relaxed font-normal">
                    Our academic team and engineers are currently crafting an ultra-premium learning experience for this module. 
                    Please check back soon!
                </p>

                <Link to="/">
                    <Motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="btn-primary inline-flex items-center gap-2 font-bold py-3.5 px-8 text-sm"
                    >
                        <IoIosArrowRoundBack className="text-2xl" />
                        Go Back Home
                    </Motion.button>
                </Link>
            </Motion.div>
        </div>
    )
}

export default BusyDevelopers;
