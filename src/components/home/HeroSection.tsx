import React from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary-900 to-primary-700 text-white overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.pexels.com/photos/406014/pexels-photo-406014.jpeg')] bg-cover bg-center"></div>
      <div className="container-custom relative z-10 py-20 md:py-24 lg:py-32">
        <div className="max-w-3xl animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Find Your Perfect <span className="text-accent-300">Furry</span> Companion
          </h1>
          <p className="text-lg md:text-xl text-gray-100 mb-8 leading-relaxed">
            Connecting loving homes with pets in need. Browse our adoptable pets and find your next family member today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Link to="/pets" className="btn bg-white text-primary-800 hover:bg-gray-100 focus:ring-white">
              Browse Pets
            </Link>
            <Link to="/how-it-works" className="btn bg-transparent border-2 border-white text-white hover:bg-white/10 focus:ring-white">
              How It Works
            </Link>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-lg max-w-2xl">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Search for a pet..." 
                    className="w-full py-3 pl-10 pr-4 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none transition-colors duration-200"
                  />
                </div>
              </div>
              <Link to="/pets" className="btn-primary whitespace-nowrap">
                Find Pets
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;