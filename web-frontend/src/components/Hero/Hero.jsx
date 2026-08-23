import React, { useState, useEffect } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { IoIosArrowBack, IoIosArrowForward, IoIosArrowRoundForward } from 'react-icons/io';
import { IoChevronDown } from 'react-icons/io5';
import { HiSparkles } from 'react-icons/hi2';

import img1 from "../../assets/1.png";
import img2 from "../../assets/2.png";
import img3 from "../../assets/3.png";
import img4 from "../../assets/4.png";

import img1m from "../../assets/1m.png";
import img2m from "../../assets/2m.png";
import img3m from "../../assets/3m.png";
import img4m from "../../assets/4m.png";

const heroImages = [
    { desktop: img1, mobile: img1m, alt: "EduMantra Civil Services Banner 1" },
    { desktop: img2, mobile: img2m, alt: "EduMantra Civil Services Banner 2" },
    { desktop: img3, mobile: img3m, alt: "EduMantra Civil Services Banner 3" },
    { desktop: img4, mobile: img4m, alt: "EduMantra Civil Services Banner 4" },
];

const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(1);

    useEffect(() => {
        const timer = setInterval(() => {
            handleNext();
        }, 5000);
        return () => clearInterval(timer);
    }, [currentIndex]);

    const handleNext = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    };

    const handlePrev = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
    };

    const goToSignup = () => {
        window.location.href = '/signup';
    };

    const scrollToNext = () => {
        const coursesSection = document.getElementById('courses') || document.getElementById('services');
        if (coursesSection) {
            coursesSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const slideVariants = {
        enter: (dir) => ({
            x: dir > 0 ? '100%' : '-100%',
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.65, ease: [0.32, 0.72, 0, 1] }
        },
        exit: (dir) => ({
            x: dir > 0 ? '-100%' : '100%',
            opacity: 0,
            transition: { duration: 0.65, ease: [0.32, 0.72, 0, 1] }
        })
    };

    return (
        <section className='relative w-full h-[calc(100vh-68px)] min-h-[580px] max-sm:h-[calc(100vh-64px)] max-sm:min-h-[440px] overflow-hidden bg-brand-primaryDark text-white mt-[64px] sm:mt-[68px]'>
            {/* Responsive Slider */}
            <div className='relative w-full h-full overflow-hidden flex items-center justify-center group'>
                <AnimatePresence initial={false} custom={direction}>
                    <Motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className='absolute inset-0 w-full h-full cursor-pointer'
                        onClick={goToSignup}
                    >
                        <picture className="w-full h-full block">
                            <source media="(max-width: 639px)" srcSet={heroImages[currentIndex].mobile} />
                            <img
                                src={heroImages[currentIndex].desktop}
                                alt={heroImages[currentIndex].alt}
                                className='w-full h-full object-cover object-center select-none'
                            />
                        </picture>
                    </Motion.div>
                </AnimatePresence>

                {/* Bottom gradient overlay */}
                <div className='absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-brand-primaryDark/90 to-transparent pointer-events-none z-10' />
                <div className='absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-brand-primaryDark/50 to-transparent pointer-events-none z-10' />



                {/* Navigation Arrows — small, visible, glass-styled like explore button */}
                <button
                    onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                    className='absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/20 border border-white/30 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/40 active:scale-95 transition-all shadow-sm z-20'
                    aria-label="Previous Slide"
                >
                    <IoIosArrowBack className='text-base sm:text-lg' />
                </button>

                <button
                    onClick={(e) => { e.stopPropagation(); handleNext(); }}
                    className='absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/20 border border-white/30 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/40 active:scale-95 transition-all shadow-sm z-20'
                    aria-label="Next Slide"
                >
                    <IoIosArrowForward className='text-base sm:text-lg' />
                </button>

                {/* Bottom overlay — CTA + indicators */}
                <div className='absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20'>
                    {/* Join Now Button */}
                    <button
                        onClick={(e) => { e.stopPropagation(); goToSignup(); }}
                        className='btn-primary py-3 px-8 sm:py-3.5 sm:px-10 text-base sm:text-lg gap-2 group'
                    >
                        Join Now
                        <IoIosArrowRoundForward className='text-2xl sm:text-3xl group-hover:translate-x-1.5 transition-transform duration-200' />
                    </button>

                    {/* Indicator Dots — minimal */}
                    <div className='flex items-center gap-2'>
                        {heroImages.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setDirection(idx > currentIndex ? 1 : -1);
                                    setCurrentIndex(idx);
                                }}
                                className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex
                                        ? 'w-7 bg-brand-accent'
                                        : 'w-2 bg-white/50 hover:bg-white'
                                    }`}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Scroll Down Indicator */}
                <div
                    onClick={(e) => { e.stopPropagation(); scrollToNext(); }}
                    className='hidden sm:flex absolute bottom-10 right-6 flex-col items-center gap-1.5 cursor-pointer z-20 text-white/70 hover:text-white transition-colors group'
                >
                    <span className='text-[10px] uppercase tracking-widest font-bold'>Explore</span>
                    <Motion.div
                        animate={{ y: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className='w-7 h-7 rounded-lg bg-white/20 border border-white/30 flex items-center justify-center group-hover:bg-white/30 transition-all'
                    >
                        <IoChevronDown className='text-sm' />
                    </Motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
