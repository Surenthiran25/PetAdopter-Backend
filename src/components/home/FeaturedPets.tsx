import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { usePets } from '../../contexts/PetsContext';
import PetCard from '../pets/PetCard';

const FeaturedPets: React.FC = () => {
  const { featuredPets } = usePets();

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-3">Featured Pets</h2>
            <p className="text-gray-600 max-w-2xl">
              Meet some of our adorable animals looking for their forever homes. Each one has a unique personality and is ready for adoption.
            </p>
          </div>
          <Link 
            to="/pets" 
            className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700 mt-4 md:mt-0"
          >
            View all pets
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredPets.map(pet => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPets;