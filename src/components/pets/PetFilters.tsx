import React, { useState } from 'react';
import { X, ChevronDown, Filter } from 'lucide-react';
import { petTypes, petSizes, genders } from '../../data/petData';
import { PetFilters as PetFiltersType } from '../../contexts/PetsContext';

interface PetFiltersProps {
  filters: PetFiltersType;
  onFilterChange: (newFilters: PetFiltersType) => void;
}

const PetFilters: React.FC<PetFiltersProps> = ({ filters, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleTypeChange = (type: string) => {
    onFilterChange({ ...filters, type: type === 'all' ? undefined : type });
  };
  
  const handleSizeChange = (size: string) => {
    onFilterChange({ ...filters, size: size === 'all' ? undefined : size });
  };
  
  const handleGenderChange = (gender: string) => {
    onFilterChange({ ...filters, gender: gender === 'all' ? undefined : gender });
  };
  
  const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>, field: 'ageMin' | 'ageMax') => {
    const value = event.target.value ? parseInt(event.target.value) : undefined;
    onFilterChange({ ...filters, [field]: value });
  };
  
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, search: event.target.value });
  };
  
  const resetFilters = () => {
    onFilterChange({});
  };
  
  const hasActiveFilters = () => {
    return Object.values(filters).some(value => 
      value !== undefined && 
      value !== '' && 
      !(typeof value === 'string' && value.trim() === '')
    );
  };

  return (
    <div className="mb-8 bg-white rounded-xl shadow-sm p-4">
      {/* Mobile Filter Button */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-3 bg-gray-100 rounded-lg"
        >
          <div className="flex items-center">
            <Filter className="h-5 w-5 text-gray-600 mr-2" />
            <span className="font-medium">Filters</span>
            {hasActiveFilters() && (
              <span className="ml-2 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                !
              </span>
            )}
          </div>
          <ChevronDown className={`h-5 w-5 text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Filters Container */}
      <div className={`mt-4 ${isOpen ? 'block' : 'hidden md:block'}`}>
        <div className="flex flex-wrap -mx-2">
          {/* Search Input */}
          <div className="w-full px-2 mb-4">
            <label htmlFor="search" className="form-label">Search</label>
            <input
              id="search"
              type="text"
              className="form-input"
              placeholder="Search by name, breed, or description"
              value={filters.search || ''}
              onChange={handleSearchChange}
            />
          </div>

          {/* Pet Type */}
          <div className="w-full sm:w-1/2 md:w-1/4 px-2 mb-4">
            <label htmlFor="type" className="form-label">Pet Type</label>
            <select
              id="type"
              className="form-input"
              value={filters.type || 'all'}
              onChange={(e) => handleTypeChange(e.target.value)}
            >
              <option value="all">All Types</option>
              {petTypes.map(type => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Pet Size */}
          <div className="w-full sm:w-1/2 md:w-1/4 px-2 mb-4">
            <label htmlFor="size" className="form-label">Size</label>
            <select
              id="size"
              className="form-input"
              value={filters.size || 'all'}
              onChange={(e) => handleSizeChange(e.target.value)}
            >
              <option value="all">All Sizes</option>
              {petSizes.map(size => (
                <option key={size} value={size}>
                  {size.charAt(0).toUpperCase() + size.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Gender */}
          <div className="w-full sm:w-1/2 md:w-1/4 px-2 mb-4">
            <label htmlFor="gender" className="form-label">Gender</label>
            <select
              id="gender"
              className="form-input"
              value={filters.gender || 'all'}
              onChange={(e) => handleGenderChange(e.target.value)}
            >
              <option value="all">All Genders</option>
              {genders.map(gender => (
                <option key={gender} value={gender}>
                  {gender.charAt(0).toUpperCase() + gender.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Age Range */}
          <div className="w-full sm:w-1/2 md:w-1/4 px-2 mb-4">
            <label className="form-label">Age (Years)</label>
            <div className="flex space-x-2">
              <input
                type="number"
                min="0"
                placeholder="Min"
                className="form-input"
                value={filters.ageMin || ''}
                onChange={(e) => handleAgeChange(e, 'ageMin')}
              />
              <input
                type="number"
                min="0"
                placeholder="Max"
                className="form-input"
                value={filters.ageMax || ''}
                onChange={(e) => handleAgeChange(e, 'ageMax')}
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {hasActiveFilters() && (
          <div className="mt-2 flex justify-end">
            <button
              onClick={resetFilters}
              className="flex items-center text-sm text-primary-600 hover:text-primary-800"
            >
              <X className="h-4 w-4 mr-1" />
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PetFilters;