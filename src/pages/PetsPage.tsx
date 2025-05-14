import React, { useState, useEffect } from 'react';
import { usePets, PetFilters as PetFiltersType } from '../contexts/PetsContext';
import PetCard from '../components/pets/PetCard';
import PetFilters from '../components/pets/PetFilters';

const PetsPage: React.FC = () => {
  const { filterPets } = usePets();
  const [filters, setFilters] = useState<PetFiltersType>({});
  const [filteredPets, setFilteredPets] = useState(filterPets({}));

  useEffect(() => {
    // Apply filters and update the list
    setFilteredPets(filterPets(filters));
  }, [filters, filterPets]);

  const handleFilterChange = (newFilters: PetFiltersType) => {
    setFilters(newFilters);
  };

  return (
    <div>
      <div className="bg-primary-800 text-white py-12">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Find Your Perfect Pet</h1>
          <p className="text-xl text-gray-200 max-w-3xl">
            Browse our available pets for adoption and use the filters to find your ideal companion.
          </p>
        </div>
      </div>

      <div className="container-custom py-8">
        <PetFilters filters={filters} onFilterChange={handleFilterChange} />

        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-600">
            Showing <span className="font-medium">{filteredPets.length}</span> pets
          </p>
        </div>

        {filteredPets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPets.map(pet => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-xl">
            <h3 className="text-xl font-semibold mb-2">No pets found</h3>
            <p className="text-gray-600 mb-4">
              No pets match your current filters. Try adjusting your search criteria.
            </p>
            <button
              onClick={() => setFilters({})}
              className="btn-primary"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PetsPage;