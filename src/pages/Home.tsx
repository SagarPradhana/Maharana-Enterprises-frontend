// import React from 'react';
import Hero from '../components/home/Hero';
import ServiceShowcase from '../components/home/ServiceShowcase';
import ProductPreview from '../components/home/ProductPreview';
import WhyChooseUs from '../components/home/WhyChooseUs';
import ContactPreview from '../components/home/ContactPreview';

const Home = () => {
    return (
        <div className="min-h-screen">
            <Hero />
            <ServiceShowcase />
            <ProductPreview />
            <WhyChooseUs />
            <ContactPreview />
        </div>
    );
};

export default Home;
