import React from 'react';
import { motion as Motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaLaptopCode } from 'react-icons/fa';
import { IoIosArrowRoundBack } from 'react-icons/io';

const BusyDevelopers = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#f5f5f7] dark:bg-[#000000] text-[#1d1d1f] dark:text-white pt-[80px] pb-16 px-4 relative overflow-hidden transition-colors duration-300 font-inter">
            {/* Subtle radial glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-appleBlue/[0.04] dark:bg-white/[0.01] rounded-full blur-[100px] pointer-events-none" />

            <Motion.div
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative z-10 text-center max-w-xl bg-white dark:bg-appleGray-950 p-10 rounded-3xl border border-appleGray-100 dark:border-appleGray-800 shadow-[0_10px_40px_rgba(0,0,0,0.03)]"
            >
                <Motion.div
                    animate={{
                        y: [0, -10, 0],
                        rotateZ: [0, 3, -3, 0]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="text-6xl text-appleBlue mb-6 flex justify-center drop-shadow-sm"
                >
                    <FaLaptopCode />
                </Motion.div>

                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-appleGray-900 dark:text-white mb-4">
                    Feature Under Construction
                </h1>

                <p className="text-appleGray-400 dark:text-appleGray-300 text-sm sm:text-base mb-8 leading-relaxed font-normal">
                    Our developers are currently hard at work behind the scenes crafting an ultra-premium experience for this feature. 
                    Please check back soon — something wonderful is cooking!
                </p>

                <Link to="/">
                    <Motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="primary-btn inline-flex items-center gap-1.5 font-bold py-3 px-8 text-base shadow-md"
                    >
                        <IoIosArrowRoundBack className="text-xl" />
                        Go Back Home
                    </Motion.button>
                </Link>
            </Motion.div>
        </div>
    )
}

export default BusyDevelopers;
