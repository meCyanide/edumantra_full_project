import React, { useRef, useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { GiDiploma } from "react-icons/gi";
import { HiOutlineDocumentCheck } from "react-icons/hi2";
import { BiSupport } from "react-icons/bi";
import iasOfficer from "../../assets/ias_officer.png";
import ipsOfficer from "../../assets/ips_officer.png";
import wbcsOfficer from "../../assets/wbcs_officer.png";

const ServicesData = [
  {
    id: 1,
    title: "WBCS Exam Preparation",
    description: "Comprehensive study material & strategy for West Bengal Civil Services. Join thousands of WBCS toppers.",
    image: wbcsOfficer,
    delay: 0.1,
  },
  {
    id: 2,
    title: "UPSC / IAS Preparation",
    description: "Expert guidance and curated content for India's toughest exam. Crack IAS with structured courses.",
    image: iasOfficer,
    delay: 0.2,
  },
  {
    id: 3,
    title: "IPS Preparation",
    description: "Dedicated IPS track with interview coaching, physical fitness guidance and mock interviews.",
    image: ipsOfficer,
    delay: 0.3,
  },
  {
    id: 4,
    title: "SSC Exam Preparation",
    description: "Structured courses covering all SSC tiers with practice sets and detailed analytics.",
    icon: <GiDiploma />,
    delay: 0.4,
  },
  {
    id: 5,
    title: "Live Mock Tests",
    description: "Timed, exam-pattern mock tests with detailed performance analytics and rank predictions.",
    icon: <HiOutlineDocumentCheck />,
    delay: 0.5,
  },
  {
    id: 6,
    title: "24/7 Expert Support",
    description: "Round-the-clock doubt resolution from experienced mentors and former civil servants.",
    icon: <BiSupport />,
    delay: 0.6,
  },
];

/* ── Magnetic 3D tilt card ── */
const TiltCard = ({ service }) => {
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [shine, setShine] = useState({ x: 50, y: 50, opacity: 0 });
  const [hovered, setHovered] = useState(false);

  const onMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const rotateX = ((y / height) - 0.5) * -12;
    const rotateY = ((x / width) - 0.5) * 12;
    setRotate({ x: rotateX, y: rotateY });
    setShine({ x: (x / width) * 100, y: (y / height) * 100, opacity: 0.08 });
  };

  const onMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setShine({ x: 50, y: 50, opacity: 0 });
    setHovered(false);
  };

  return (
    <Motion.div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: service.delay, ease: "easeOut" }}
      animate={{
        rotateX: rotate.x,
        rotateY: rotate.y,
        scale: hovered ? 1.02 : 1,
      }}
      style={{ transformStyle: "preserve-3d", perspective: "800px" }}
      className='relative rounded-3xl bg-white dark:bg-appleGray-950 border border-appleGray-100 dark:border-appleGray-800 shadow-[0_10px_35px_rgba(0,0,0,0.03)] dark:shadow-[0_10px_35px_rgba(255,255,255,0.01)] overflow-hidden cursor-pointer transition-shadow duration-300 group'
    >
      {/* Shine overlay */}
      <div
        className='absolute inset-0 pointer-events-none rounded-3xl transition-opacity duration-300 z-10'
        style={{
          background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(255,255,255,${shine.opacity}) 0%, transparent 65%)`,
        }}
      />

      {/* Top accent bar */}
      <div className='absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-appleGray-200 dark:via-white/20 to-transparent' />

      {/* Image or Icon */}
      {service.image ? (
        <div className='relative h-48 overflow-hidden'>
          <img
            src={service.image}
            alt={service.title}
            className='w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-103'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-white dark:from-appleGray-950 via-white/50 dark:via-appleGray-950/50 to-transparent' />
        </div>
      ) : (
        <div className='pt-6 px-6'>
          <div
            style={{ transform: "translateZ(30px)" }}
            className='inline-flex items-center justify-center w-12 h-12 rounded-xl bg-appleGray-50 dark:bg-white/5 text-appleBlue text-xl shadow-sm group-hover:scale-105 transition-transform duration-300'
          >
            {service.icon}
          </div>
        </div>
      )}

      {/* Content */}
      <div className='p-6' style={{ transform: "translateZ(20px)" }}>
        <h3 className='text-base font-bold text-appleGray-900 dark:text-white mb-2 leading-snug'>
          {service.title}
        </h3>
        <p className='text-sm text-appleGray-400 dark:text-appleGray-300 leading-relaxed font-normal'>
          {service.description}
        </p>

        {/* Arrow link */}
        <Link to="/working">
          <div className='mt-4 inline-flex items-center gap-1 text-sm font-semibold text-appleBlue hover:text-appleBlue-hover transition-all duration-200'>
            Learn more <IoIosArrowRoundForward className='text-xl group-hover:translate-x-1 transition-transform duration-200' />
          </div>
        </Link>
      </div>
    </Motion.div>
  );
};

const Services = () => {
  return (
    <section id="services" className='relative bg-[#f5f5f7] dark:bg-[#000000] overflow-hidden scroll-mt-28 py-20 transition-colors duration-300'>

      {/* Background decoration */}
      <div className='absolute top-0 right-0 w-80 h-80 bg-appleBlue/[0.01] rounded-full blur-3xl pointer-events-none translate-x-1/2 -translate-y-1/2' />
      <div className='absolute bottom-0 left-0 w-96 h-96 bg-appleBlue/[0.01] rounded-full blur-3xl pointer-events-none -translate-x-1/3 translate-y-1/3' />

      <div className='container relative z-10'>

        {/* Section header */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-center mb-14'
        >
          <span className='inline-block bg-white dark:bg-white/5 text-appleGray-400 dark:text-appleGray-300 border border-appleGray-100 dark:border-white/10 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 shadow-sm'>
            What We Offer
          </span>
          <h2 className='text-3xl sm:text-4xl font-extrabold tracking-tight text-appleGray-900 dark:text-white mb-4'>
            Courses and Services
          </h2>
          <p className='text-appleGray-400 dark:text-appleGray-300 max-w-xl mx-auto text-sm sm:text-base'>
            From WBCS to UPSC, we cover competitive exams with expert-crafted content, live sessions, and support.
          </p>
        </Motion.div>

        {/* Cards grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' style={{ perspective: "1200px" }}>
          {ServicesData.map((service) => (
            <TiltCard key={service.id} service={service} />
          ))}
        </div>

        {/* Bottom CTA */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className='text-center mt-12'
        >
          <Link to="/working">
            <button className='primary-btn-outline inline-flex items-center gap-1 group text-base font-semibold py-2 px-6'>
              View All Courses
              <IoIosArrowRoundForward className='text-xl group-hover:translate-x-1.5 duration-200' />
            </button>
          </Link>
        </Motion.div>
      </div>
    </section>
  );
};

export default Services;