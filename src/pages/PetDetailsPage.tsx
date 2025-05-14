import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, Heart, Calendar, PawPrint as Paw, Info, Star, ArrowLeft } from 'lucide-react';
import { usePets } from '../contexts/PetsContext';
import { useFavorites } from '../contexts/FavoritesContext';
import PetGallery from '../components/pets/PetGallery';

const PetDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getPetById } = usePets();
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const navigate = useNavigate();
  
  const [pet, setPet] = useState(id ? getPetById(id) : undefined);
  
  useEffect(() => {
    if (id) {
      const petData = getPetById(id);
      if (petData) {
        setPet(petData);
        // Update page title
        document.title = `${petData.name} - PawMates`;
      } else {
        navigate('/not-found');
      }
    }
    
    return () => {
      // Reset title when unmounting
      document.title = 'PawMates | Find Your Perfect Pet';
    };
  }, [id, getPetById, navigate]);
  
  if (!pet) {
    return (
      <div className="container-custom py-16 text-center">
        <p className="text-xl">Loading pet details...</p>
      </div>
    );
  }
  
  const isFav = isFavorite(pet.id);
  
  const handleFavoriteToggle = () => {
    if (isFav) {
      removeFromFavorites(pet.id);
    } else {
      addToFavorites(pet.id);
    }
  };

  return (
    <div>
      <div className="bg-primary-800 text-white py-6">
        <div className="container-custom">
          <div className="flex items-center mb-4">
            <button 
              onClick={() => navigate(-1)} 
              className="flex items-center text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span>Back</span>
            </button>
          </div>
          <div className="flex flex-wrap items-center justify-between">
            <h1 className="text-3xl md:text-4xl font-bold">{pet.name}</h1>
            <div className="flex items-center text-sm space-x-4 mt-2 md:mt-0">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{pet.location}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Added {new Date(pet.dateAdded).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Images */}
          <div className="lg:col-span-2">
            <PetGallery images={pet.images} name={pet.name} />
            
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">About {pet.name}</h2>
              <p className="text-gray-700 leading-relaxed mb-6">{pet.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2 flex items-center">
                    <Paw className="h-5 w-5 mr-2 text-primary-600" />
                    Personality
                  </h3>
                  <ul className="space-y-1">
                    {pet.personality.map((trait, index) => (
                      <li key={index} className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-2" />
                        {trait}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2 flex items-center">
                    <Info className="h-5 w-5 mr-2 text-primary-600" />
                    Health & Care
                  </h3>
                  <ul className="space-y-1">
                    {pet.healthStatus.map((status, index) => (
                      <li key={index} className="flex items-center">
                        <Star className="h-4 w-4 text-green-500 mr-2" />
                        {status}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right column - Details and action buttons */}
          <div>
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-primary-800">${pet.adoptionFee}</h3>
                <button
                  onClick={handleFavoriteToggle}
                  className={`p-2 rounded-full transition-colors ${
                    isFav 
                      ? 'bg-pink-100 text-pink-600' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
                >
                  <Heart className={`h-5 w-5 ${isFav ? 'fill-current' : ''}`} />
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="border border-gray-200 rounded-lg p-3 text-center">
                  <p className="text-sm text-gray-500 mb-1">Age</p>
                  <p className="font-medium">
                    {pet.age} {pet.age === 1 ? 'year' : 'years'}
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-3 text-center">
                  <p className="text-sm text-gray-500 mb-1">Gender</p>
                  <p className="font-medium">
                    {pet.gender.charAt(0).toUpperCase() + pet.gender.slice(1)}
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-3 text-center">
                  <p className="text-sm text-gray-500 mb-1">Size</p>
                  <p className="font-medium">
                    {pet.size.charAt(0).toUpperCase() + pet.size.slice(1)}
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-3 text-center">
                  <p className="text-sm text-gray-500 mb-1">Breed</p>
                  <p className="font-medium">{pet.breed}</p>
                </div>
              </div>
              
              <Link 
                to={`/adopt/${pet.id}`} 
                className="btn-primary w-full mb-4"
              >
                Adopt {pet.name}
              </Link>
              
              <Link 
                to={`/contact?subject=Question about ${pet.name}`} 
                className="btn-outline w-full"
              >
                Ask About {pet.name}
              </Link>
              
              <div className="mt-6 p-4 bg-primary-50 rounded-lg">
                <h4 className="font-semibold mb-2 text-primary-800">Adoption Fee Includes:</h4>
                <ul className="space-y-1 text-primary-700">
                  <li className="flex items-start">
                    <Star className="h-4 w-4 mt-1 mr-2 text-primary-600" />
                    <span>Spay/Neuter Surgery</span>
                  </li>
                  <li className="flex items-start">
                    <Star className="h-4 w-4 mt-1 mr-2 text-primary-600" />
                    <span>Vaccinations & Deworming</span>
                  </li>
                  <li className="flex items-start">
                    <Star className="h-4 w-4 mt-1 mr-2 text-primary-600" />
                    <span>Microchipping</span>
                  </li>
                  <li className="flex items-start">
                    <Star className="h-4 w-4 mt-1 mr-2 text-primary-600" />
                    <span>Initial Vet Examination</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDetailsPage;