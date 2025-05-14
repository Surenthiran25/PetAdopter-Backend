import React from 'react';
import HeroSection from '../components/home/HeroSection';
import FeaturedPets from '../components/home/FeaturedPets';
import HowItWorks from '../components/home/HowItWorks';
import TestimonialsSection from '../components/home/TestimonialsSection';

const HomePage: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <FeaturedPets />
      <HowItWorks />
      <TestimonialsSection />
    </div>
  );
};

export default HomePage;