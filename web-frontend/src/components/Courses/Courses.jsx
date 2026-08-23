import React from 'react';
import { motion as Motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { HiSparkles } from 'react-icons/hi2';
import iasOfficer from "../../assets/ias_officer.png";
import ipsOfficer from "../../assets/ips_officer.png";
import wbcsOfficer from "../../assets/wbcs_officer.png";

const CoursesData = [
  {
    id: 1,
    title: "WBCS Exam Preparation",
    description: "Comprehensive study material & strategy for West Bengal Civil Services. Join thousands of WBCS toppers with personalized mentorship.",
    image: wbcsOfficer,
    delay: 0.1,
  },
  {
    id: 2,
    title: "UPSC / IAS Preparation",
    description: "Expert guidance and curated content for India's toughest exam. Crack IAS with structured GS foundations and answer writing mastery.",
    image: iasOfficer,
    delay: 0.2,
  },
  {
    id: 3,
    title: "IPS Preparation",
    description: "Dedicated IPS track with interview coaching, physical fitness guidance, mental agility drills, and executive mock boards.",
    image: ipsOfficer,
    delay: 0.3,
  },
];

const CourseCard = ({ course }) => (
  <Motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.45, delay: course.delay, ease: "easeOut" }}
    className='bg-white border border-border rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover hover:border-border-hover transition-all duration-250 group flex flex-col'
  >
    {/* Card Image */}
    <div className='relative h-56 overflow-hidden bg-bg-surfaceAlt'>
      <img
        src={course.image}
        alt={course.title}
        className='w-full h-full object-cover object-top filter grayscale contrast-105 group-hover:grayscale-0 transition-all duration-500 group-hover:scale-103'
      />
      <div className='absolute inset-0 bg-gradient-to-t from-white/90 via-white/20 to-transparent' />
    </div>

    {/* Content */}
    <div className='p-6 flex-1 flex flex-col justify-between'>
      <div>
        <h3 className='text-lg font-bold text-brand-primary mb-2.5 leading-snug group-hover:text-brand-secondary transition-colors'>
          {course.title}
        </h3>
        <p className='text-sm text-txt-secondary leading-relaxed'>
          {course.description}
        </p>
      </div>

      {/* Learn More */}
      <div className='mt-6 pt-4 border-t border-border flex items-center justify-between'>
        <Link to="/working" className='inline-flex items-center gap-1.5 text-sm font-bold text-brand-secondary hover:text-brand-primary transition-colors duration-200'>
          Explore Curriculum <IoIosArrowRoundForward className='text-xl group-hover:translate-x-1 transition-transform duration-200' />
        </Link>
      </div>
    </div>
  </Motion.div>
);

const Courses = () => {
  return (
    <section id="courses" className='bg-bg-page scroll-mt-24 py-24'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Section header */}
        <Motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='text-center mb-16'
        >
          <div className='section-badge mb-4'>
            <HiSparkles className="text-brand-secondary text-sm" />
            Elite Training Programs
          </div>
          <h2 className='text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-primary mb-4'>
            Our Flagship Courses
          </h2>
          <p className='text-txt-secondary max-w-2xl mx-auto text-sm sm:text-base leading-relaxed'>
            From WBCS to UPSC, master competitive civil services exams with rigorous curriculum, structured study plans, and live one-on-one officer mentorship.
          </p>
        </Motion.div>

        {/* Cards grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {CoursesData.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;
