import React from 'react';
import { motion as Motion } from 'framer-motion';
import { FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi2';

const team = [
    {
        name: "Dr. Arindam Sen",
        role: "Founder & IAS Mentor",
        avatar: "AS",
        bio: "Ex-IAS officer with 15+ years of service. Mentored over 500+ successful UPSC & state civil service aspirants.",
        delay: 0.1,
    },
    {
        name: "Prof. Mita Ghosh",
        role: "WBCS Strategy Head",
        avatar: "MG",
        bio: "3× WBCS top ranker mentor. Renowned specialist in GS Mains answer framing and current affairs dossiers.",
        delay: 0.2,
    },
    {
        name: "Subhro Chakraborty",
        role: "Quantitative & CSAT Lead",
        avatar: "SC",
        bio: "IIT alumnus & seasoned educator. Architect of speed mathematics & deductive aptitude modules.",
        delay: 0.3,
    },
    {
        name: "Riya Bose",
        role: "English & Essay Expert",
        avatar: "RB",
        bio: "Oxford alumna and published author. Crafts the gold-standard essay drafting frameworks for Civil Services.",
        delay: 0.4,
    },
];

const TeamCard = ({ member }) => (
    <Motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: member.delay }}
        className='bg-white border border-border rounded-2xl p-7 shadow-card hover:shadow-card-hover hover:border-border-hover flex flex-col items-center text-center gap-5 transition-all duration-250 cursor-default'
    >
        {/* Avatar */}
        <div className='relative w-16 h-16 rounded-xl bg-brand-primary text-brand-accentLight border border-brand-primaryDark text-xl font-bold flex items-center justify-center'>
            {member.avatar}
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-brand-accent rounded-full border-2 border-white" />
        </div>

        {/* Info */}
        <div className='space-y-1.5'>
            <h3 className='text-base font-bold text-brand-primary'>{member.name}</h3>
            <p className='text-xs font-bold tracking-wider text-brand-secondary uppercase'>{member.role}</p>
            <p className='text-txt-secondary text-xs sm:text-sm leading-relaxed pt-1'>{member.bio}</p>
        </div>

        {/* Social */}
        <div className='flex gap-2 mt-auto pt-1'>
            {[FaLinkedinIn, FaTwitter].map((Icon, i) => (
                <button key={i} className='w-8 h-8 rounded-lg bg-bg-surfaceAlt border border-border hover:bg-brand-secondary hover:text-white text-txt-secondary flex items-center justify-center text-xs hover:scale-105 transition-all duration-200'>
                    <Icon />
                </button>
            ))}
        </div>
    </Motion.div>
);

const OurTeam = () => (
    <section id="team" className='bg-bg-surfaceAlt border-t border-border py-24'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <Motion.div
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                className='text-center mb-16'
            >
                <div className='section-badge mb-4'>
                    <HiSparkles className="text-brand-secondary text-sm" />
                    Distinguished Faculty
                </div>
                <h2 className='text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-primary mb-4'>
                    Meet Our Expert Mentors
                </h2>
                <p className='text-txt-secondary max-w-2xl mx-auto text-sm sm:text-base leading-relaxed'>
                    Our mentors are former IAS, WBCS and IPS officers alongside premier subject matter authorities — delivering battle-tested strategy and personal guidance.
                </p>
            </Motion.div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                {team.map((m, i) => <TeamCard key={i} member={m} />)}
            </div>
        </div>
    </section>
);

export default OurTeam;
