import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Heart } from 'lucide-react';
import { Pet } from '../../data/petData';
import { useFavorites } from '../../contexts/FavoritesContext';

interface PetCardProps {
  pet: Pet;
}

const PetCard: React.FC<PetCardProps> = ({ pet }) => {
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const isFav = isFavorite(pet.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isFav) {
      removeFromFavorites(pet.id);
    } else {
      addToFavorites(pet.id);
    }
  };

  return (
    <div className="card group h-full">
      <Link to={`/pets/${pet.id}`} className="block h-full">
        {/* Image container with overlay */}
        <div className="relative aspect-square overflow-hidden bg-gray-200">
          <img 
            src={pet.images[0]} 
            alt={pet.name} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div 
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white"
          >
            <div className="flex justify-between items-end">
              <div>
                <h3 className="text-xl font-bold">{pet.name}</h3>
                <p className="text-sm text-gray-200">{pet.breed}</p>
              </div>
              <span className="badge-primary text-xs px-2 py-1 rounded-full bg-white/80 text-primary-800">
                {pet.type.charAt(0).toUpperCase() + pet.type.slice(1)}
              </span>
            </div>
          </div>
          
          {/* Favorite button */}
          <button
            onClick={handleFavoriteClick}
            className="absolute top-3 right-3 p-2 bg-white/80 rounded-full shadow-md transition-all hover:bg-white"
            aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className={`h-5 w-5 ${isFav ? 'fill-accent-500 text-accent-500' : 'text-gray-600'}`} />
          </button>
        </div>
        
        {/* Pet info */}
        <div className="p-4">
          <div className="flex justify-between items-center mb-2">
            <div className="flex space-x-2">
              <span className="badge-primary">
                {pet.age} {pet.age === 1 ? 'year' : 'years'}
              </span>
              <span className="badge-secondary">
                {pet.gender.charAt(0).toUpperCase() + pet.gender.slice(1)}
              </span>
              <span className="badge-accent">
                {pet.size.charAt(0).toUpperCase() + pet.size.slice(1)}
              </span>
            </div>
          </div>
          
          <div className="mt-2 flex items-center text-gray-500 text-sm">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{pet.location}</span>
          </div>
          
          <p className="mt-3 text-gray-600 line-clamp-2">
            {pet.description}
          </p>
          
          <div className="mt-4 flex items-center justify-between">
            <span className="font-semibold text-primary-600">
              ${pet.adoptionFee}
            </span>
            <span className="text-sm text-gray-500">
              View Details
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PetCard;