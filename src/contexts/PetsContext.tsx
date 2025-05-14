import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Pet, pets as initialPets } from '../data/petData';

interface PetsContextType {
  pets: Pet[];
  featuredPets: Pet[];
  getPetById: (id: string) => Pet | undefined;
  filterPets: (filters: PetFilters) => Pet[];
}

export interface PetFilters {
  type?: string;
  size?: string;
  gender?: string;
  ageMin?: number;
  ageMax?: number;
  search?: string;
}

const PetsContext = createContext<PetsContextType | undefined>(undefined);

export const usePets = () => {
  const context = useContext(PetsContext);
  if (!context) {
    throw new Error('usePets must be used within a PetsProvider');
  }
  return context;
};

interface PetsProviderProps {
  children: ReactNode;
}

export const PetsProvider: React.FC<PetsProviderProps> = ({ children }) => {
  const [pets, setPets] = useState<Pet[]>(initialPets);
  const [featuredPets, setFeaturedPets] = useState<Pet[]>([]);

  useEffect(() => {
    // In a real app, we would fetch from an API here
    setPets(initialPets);
    setFeaturedPets(initialPets.filter(pet => pet.isFeatured));
  }, []);

  const getPetById = (id: string): Pet | undefined => {
    return pets.find(pet => pet.id === id);
  };

  const filterPets = (filters: PetFilters): Pet[] => {
    return pets.filter(pet => {
      // Filter by type
      if (filters.type && filters.type !== 'all' && pet.type !== filters.type) {
        return false;
      }

      // Filter by size
      if (filters.size && filters.size !== 'all' && pet.size !== filters.size) {
        return false;
      }

      // Filter by gender
      if (filters.gender && filters.gender !== 'all' && pet.gender !== filters.gender) {
        return false;
      }

      // Filter by age range
      if (filters.ageMin !== undefined && pet.age < filters.ageMin) {
        return false;
      }
      if (filters.ageMax !== undefined && pet.age > filters.ageMax) {
        return false;
      }

      // Filter by search term
      if (filters.search && filters.search.trim() !== '') {
        const searchTerm = filters.search.toLowerCase().trim();
        return (
          pet.name.toLowerCase().includes(searchTerm) ||
          pet.breed.toLowerCase().includes(searchTerm) ||
          pet.description.toLowerCase().includes(searchTerm)
        );
      }

      return true;
    });
  };

  const value = {
    pets,
    featuredPets,
    getPetById,
    filterPets
  };

  return <PetsContext.Provider value={value}>{children}</PetsContext.Provider>;
};