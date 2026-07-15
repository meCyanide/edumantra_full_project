import React from 'react'
import Hero from '../components/Hero/Hero'
import Services from '../components/Services/Services'
import AboutUs from '../components/AboutUs/AboutUs'
import Testimonials from '../components/Testimonials/Testimonials'
import OurTeam from '../components/OurTeam/OurTeam'
import Contact from '../components/Contact/Contact'

const Home = ({ user }) => {
    return (
        <>
            <Hero user={user} />
            <Services />
            <AboutUs />
            <Testimonials />
            <OurTeam />
            <Contact />
        </>
    )
}

export default Home
