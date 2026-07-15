import React from 'react';
import { motion as Motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

const testimonials = [
    { name: "Priya Sharma", role: "IAS Topper 2023", avatar: "PS", text: "EduMantra's structured approach and live sessions transformed my preparation. I cleared IAS in my very first attempt!" },
    { name: "Rahul Banerjee", role: "WBCS Officer", avatar: "RB", text: "The mock tests were exactly like the real exam. The detailed analytics helped me identify and fix my weak spots quickly." },
    { name: "Sneha Das", role: "SSC CGL Topper", avatar: "SD", text: "Affordable, comprehensive, and taught by real toppers. EduMantra is the best investment I made for my career." },
    { name: "Amit Roy", role: "IPS Officer", avatar: "AR", text: "24/7 support meant I could clear doubts at midnight before the exam. The mentors genuinely care about your success." },
    { name: "Kavya Nair", role: "WBCS Rank 12", avatar: "KN", text: "The personalised study plan kept me on track. I improved my score by 40 marks in just 3 months of focused prep." },
    { name: "Sayan Ghosh", role: "UPSC CSE", avatar: "SG", text: "Best platform for current affairs and answer writing practice. The faculty's guidance is unmatched in the market." },
    { name: "Tanusree Paul", role: "SSC CHSL", avatar: "TP", text: "I was sceptical at first but after the first live class, I was hooked. Crystal-clear explanations and amazing study notes." },
    { name: "Debashis Mondal", role: "WBCS Group A", avatar: "DM", text: "Scored in the top 10 of WBCS. EduMantra's strategy sessions and interview prep made all the difference for me." },
];

const stars = [1, 2, 3, 4, 5];

const TestimonialCard = ({ t }) => (
    <div className='relative min-w-[280px] sm:min-w-[320px] max-w-[320px] mx-3.5 rounded-3xl bg-white dark:bg-appleGray-950 border border-appleGray-100 dark:border-appleGray-800 shadow-[0_10px_30px_rgba(0,0,0,0.02)] dark:shadow-[0_10px_30px_rgba(255,255,255,0.005)] p-6 flex flex-col gap-4 overflow-hidden group transition-shadow duration-300'>
        {/* Glow on hover */}
        <div className='absolute -top-8 -right-8 w-24 h-24 rounded-full bg-appleBlue/[0.04] opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 pointer-events-none' />

        {/* Stars */}
        <div className='flex gap-0.5'>
            {stars.map(s => <FaStar key={s} className='text-amber-400 text-xs' />)}
        </div>

        {/* Quote */}
        <p className='text-appleGray-400 dark:text-appleGray-300 text-sm leading-relaxed flex-1 font-normal'>
            &ldquo;{t.text}&rdquo;
        </p>

        {/* Author */}
        <div className='flex items-center gap-3 pt-2 border-t border-appleGray-50 dark:border-appleGray-900'>
            <div className='w-9 h-9 rounded-full bg-appleGray-100 dark:bg-white/5 text-appleGray-900 dark:text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-sm'>
                {t.avatar}
            </div>
            <div className="text-left">
                <p className='text-sm font-bold text-appleGray-900 dark:text-white'>{t.name}</p>
                <p className='text-xs text-appleGray-400 dark:text-appleGray-500 font-medium'>{t.role}</p>
            </div>
        </div>
    </div>
);

/* Row that scrolls infinitely in one direction */
const MarqueeRow = ({ items, direction = 'left', speed = 35 }) => {
    const doubled = [...items, ...items]; // duplicate for seamless loop
    const moveX = direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'];

    return (
        <div className='overflow-hidden relative py-2'>
            {/* Left fade mask */}
            <div className='absolute left-0 top-0 bottom-0 w-28 bg-gradient-to-r from-[#f5f5f7] dark:from-black to-transparent z-10 pointer-events-none' />
            {/* Right fade mask */}
            <div className='absolute right-0 top-0 bottom-0 w-28 bg-gradient-to-l from-[#f5f5f7] dark:from-black to-transparent z-10 pointer-events-none' />

            <Motion.div
                className='flex'
                animate={{ x: moveX }}
                transition={{ repeat: Infinity, repeatType: 'loop', duration: speed, ease: 'linear' }}
            >
                {doubled.map((t, i) => <TestimonialCard key={i} t={t} />)}
            </Motion.div>
        </div>
    );
};

const Testimonials = () => (
    <section id="testimonials" className='relative bg-[#f5f5f7] dark:bg-[#000000] border-t border-appleGray-100 dark:border-appleGray-800 overflow-hidden py-20 transition-colors duration-300'>
        <div className='absolute top-0 right-0 w-80 h-80 bg-appleBlue/[0.01] rounded-full blur-3xl pointer-events-none translate-x-1/3 -translate-y-1/3' />
        <div className='absolute bottom-0 left-0 w-96 h-96 bg-appleBlue/[0.01] rounded-full blur-3xl pointer-events-none -translate-x-1/3 translate-y-1/3' />

        <div className='container relative z-10 mb-12'>
            <Motion.div
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                className='text-center'
            >
                <span className='inline-block bg-white dark:bg-white/5 text-appleGray-400 dark:text-appleGray-300 border border-appleGray-100 dark:border-white/10 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 shadow-sm'>
                    Student Stories
                </span>
                <h2 className='text-3xl sm:text-4xl font-extrabold tracking-tight text-appleGray-900 dark:text-white mb-4'>
                    What Our Students Say
                </h2>
                <p className='text-appleGray-400 dark:text-appleGray-300 max-w-xl mx-auto text-sm sm:text-base'>
                    Thousands of students have cracked competitive exams with EduMantra. Here is their feedback.
                </p>
            </Motion.div>
        </div>

        {/* Infinite scroll rows */}
        <div className='space-y-4'>
            <MarqueeRow items={testimonials.slice(0, 4)} direction='left' speed={34} />
            <MarqueeRow items={testimonials.slice(4, 8)} direction='right' speed={30} />
        </div>
    </section>
);

export default Testimonials;
