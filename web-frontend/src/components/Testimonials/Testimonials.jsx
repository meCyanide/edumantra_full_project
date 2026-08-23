import React from 'react';
import { motion as Motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import { HiTrophy } from 'react-icons/hi2';

const testimonials = [
    { name: "Priya Sharma", role: "IAS Rank 42 (UPSC 2023)", avatar: "PS", text: "EduMantra's structured answer-writing reviews and mock interviews transformed my preparation. I cracked IAS in my very first serious attempt!" },
    { name: "Rahul Banerjee", role: "WBCS Executive (Rank 3)", avatar: "RB", text: "The WBCS mock tests replicated the exact standard of the real exam. The faculty's individual feedback pinpointed my weaknesses instantly." },
    { name: "Sneha Das", role: "SSC CGL (Tax Assistant)", avatar: "SD", text: "Affordable, comprehensive, and led by real toppers. The CSAT and quantitative shortcuts saved precious minutes during my exam." },
    { name: "Amit Roy", role: "IPS Officer", avatar: "AR", text: "24/7 mentor access meant I could clear doubts at midnight before prelims. The leadership and personality development sessions were phenomenal." },
    { name: "Kavya Nair", role: "WBCS Group A (Rank 12)", avatar: "KN", text: "The personalised roadmap kept me disciplined. I increased my score by 45+ marks across GS papers in just 4 months of structured practice." },
    { name: "Sayan Ghosh", role: "UPSC CSE Qualified", avatar: "SG", text: "Best platform for current affairs compilation and GS Paper 4 ethics case studies. The mentor commitment here is unmatched in Bengal." }
];

const stars = [1, 2, 3, 4, 5];

const TestimonialCard = ({ t }) => (
    <div className='min-w-[290px] sm:min-w-[330px] max-w-[330px] mx-3 rounded-2xl bg-white border border-border shadow-card hover:shadow-card-hover hover:border-border-hover p-6 flex flex-col gap-4 transition-all duration-250 shrink-0 cursor-default'>
        {/* Stars */}
        <div className='flex gap-1'>
            {stars.map(s => <FaStar key={s} className='text-brand-accent text-sm' />)}
        </div>

        {/* Quote */}
        <p className='text-txt-primary text-sm leading-relaxed flex-1 font-normal'>
            &ldquo;{t.text}&rdquo;
        </p>

        {/* Author */}
        <div className='flex items-center gap-3 pt-3 border-t border-border'>
            <div className='w-10 h-10 rounded-lg bg-brand-primary text-brand-accentLight flex items-center justify-center text-xs font-bold shrink-0 border border-brand-primaryDark'>
                {t.avatar}
            </div>
            <div className="text-left">
                <p className='text-sm font-bold text-brand-primary'>{t.name}</p>
                <p className='text-xs text-brand-secondary font-semibold'>{t.role}</p>
            </div>
        </div>
    </div>
);

/* Single horizontal marquee row for the 6 ranker reviews */
const MarqueeRow = ({ items, speed = 35 }) => {
    const doubled = [...items, ...items];

    return (
        <div className='overflow-hidden relative py-2'>
            {/* Fade masks */}
            <div className='absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-bg-page to-transparent z-10 pointer-events-none' />
            <div className='absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-bg-page to-transparent z-10 pointer-events-none' />

            <Motion.div
                className='flex'
                animate={{ x: ['0%', '-50%'] }}
                transition={{ repeat: Infinity, repeatType: 'loop', duration: speed, ease: 'linear' }}
            >
                {doubled.map((t, i) => <TestimonialCard key={i} t={t} />)}
            </Motion.div>
        </div>
    );
};

const Testimonials = () => (
    <section id="testimonials" className='bg-bg-page border-t border-border overflow-hidden py-20 sm:py-24'>
        <div className='container mx-auto px-4 relative z-10 mb-12'>
            <Motion.div
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                className='text-center'
            >
                <div className='section-badge mb-4'>
                    <HiTrophy className="text-brand-secondary text-sm" />
                    Verified Testimonials
                </div>
                <h2 className='text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-primary mb-4'>
                    Real Stories from Real Rankers
                </h2>
                <p className='text-txt-secondary max-w-2xl mx-auto text-sm sm:text-base leading-relaxed'>
                    Thousands of ambitious aspirants have turned their civil service dreams into reality with EduMantra. Here are six ranker stories.
                </p>
            </Motion.div>
        </div>

        {/* Single horizontal scrolling row with 6 rankers */}
        <div className='w-full'>
            <MarqueeRow items={testimonials} speed={30} />
        </div>
    </section>
);

export default Testimonials;
