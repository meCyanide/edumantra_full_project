import React, { useRef, useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { FaLinkedinIn, FaTwitter } from 'react-icons/fa';

const team = [
    {
        name: "Dr. Arindam Sen",
        role: "Founder & IAS Mentor",
        avatar: "AS",
        bio: "Ex-IAS officer with 15+ years of experience. Helped over 500 students crack UPSC in his career.",
        delay: 0.1,
    },
    {
        name: "Prof. Mita Ghosh",
        role: "WBCS Strategy Head",
        avatar: "MG",
        bio: "3× WBCS topper mentor. Specialises in GK, Current Affairs and Answer Writing Mastery.",
        delay: 0.2,
    },
    {
        name: "Subhro Chakraborty",
        role: "Quantitative & Reasoning Lead",
        avatar: "SC",
        bio: "IITian turned educator. Known for making Maths & Reasoning simple, fast and exam-ready.",
        delay: 0.3,
    },
    {
        name: "Riya Bose",
        role: "English & Essay Expert",
        avatar: "RB",
        bio: "Oxford alumni and published author. Crafts the perfect essay framework for all Civil Services exams.",
        delay: 0.4,
    },
];

const TeamCard = ({ member }) => {
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
        setRotate({ x: ((y / height) - 0.5) * -12, y: ((x / width) - 0.5) * 12 });
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
            transition={{ duration: 0.5, delay: member.delay }}
            animate={{ rotateX: rotate.x, rotateY: rotate.y, scale: hovered ? 1.02 : 1 }}
            style={{ transformStyle: "preserve-3d", perspective: "800px" }}
            className='relative bg-white dark:bg-appleGray-950 rounded-3xl p-7 shadow-[0_10px_30px_rgba(0,0,0,0.02)] dark:shadow-[0_10px_30px_rgba(255,255,255,0.005)] border border-appleGray-100 dark:border-appleGray-800 overflow-hidden cursor-default flex flex-col items-center text-center gap-5 transition-shadow duration-300'
        >
            {/* Shine overlay */}
            <div className='absolute inset-0 rounded-3xl pointer-events-none' style={{ background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(255,255,255,${shine.opacity}) 0%, transparent 60%)` }} />

            {/* Top accent line */}
            <div className='absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-appleGray-200 dark:via-white/10 to-transparent' />

            {/* Avatar */}
            <div style={{ transform: "translateZ(30px)" }} className='w-16 h-16 rounded-2xl bg-appleGray-50 dark:bg-white/5 border border-appleGray-200 dark:border-white/10 text-appleGray-900 dark:text-white text-xl font-bold flex items-center justify-center shadow-sm transition-transform duration-300'>
                {member.avatar}
            </div>

            {/* Info */}
            <div style={{ transform: "translateZ(20px)" }} className='space-y-1'>
                <h3 className='text-base font-bold text-appleGray-900 dark:text-white'>{member.name}</h3>
                <p className='text-xs font-semibold tracking-wider text-appleBlue uppercase'>{member.role}</p>
                <p className='text-appleGray-400 dark:text-appleGray-300 text-sm leading-relaxed pt-2 font-normal'>{member.bio}</p>
            </div>

            {/* Social */}
            <div style={{ transform: "translateZ(25px)" }} className='flex gap-3 mt-1'>
                {[FaLinkedinIn, FaTwitter].map((Icon, i) => (
                    <button key={i} className='w-8 h-8 rounded-xl bg-appleGray-50 dark:bg-white/5 border border-appleGray-100 dark:border-white/10 hover:bg-appleBlue dark:hover:bg-appleBlue hover:text-white text-appleGray-400 dark:text-appleGray-300 flex items-center justify-center text-xs shadow-sm hover:scale-105 transition-all duration-200'>
                        <Icon />
                    </button>
                ))}
            </div>
        </Motion.div>
    );
};

const OurTeam = () => (
    <section id="team" className='relative bg-white dark:bg-appleGray-900 border-t border-appleGray-100 dark:border-appleGray-800 overflow-hidden py-20 transition-colors duration-300'>
        {/* Background decoration */}
        <div className='absolute top-0 left-0 w-80 h-80 bg-appleBlue/[0.01] rounded-full blur-3xl pointer-events-none -translate-x-1/3 -translate-y-1/3' />
        <div className='absolute bottom-0 right-0 w-80 h-80 bg-appleBlue/[0.01] rounded-full blur-3xl pointer-events-none translate-x-1/3 translate-y-1/3' />

        <div className='container relative z-10'>
            <Motion.div
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                className='text-center mb-14'
            >
                <span className='inline-block bg-appleGray-50 dark:bg-white/5 text-appleGray-400 dark:text-appleGray-300 border border-appleGray-100 dark:border-white/10 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 shadow-sm'>
                    The People Behind the Success
                </span>
                <h2 className='text-3xl sm:text-4xl font-extrabold tracking-tight text-appleGray-900 dark:text-white mb-4'>
                    Meet Our Expert Team
                </h2>
                <p className='text-appleGray-400 dark:text-appleGray-300 max-w-xl mx-auto text-sm sm:text-base'>
                    Our mentors are IAS, WBCS and IPS officers themselves — bringing you first-hand experience and proven strategies.
                </p>
            </Motion.div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6' style={{ perspective: "1200px" }}>
                {team.map((m, i) => <TeamCard key={i} member={m} />)}
            </div>
        </div>
    </section>
);

export default OurTeam;
