import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { usePets } from '../contexts/PetsContext';
import AdoptionForm from '../components/adoption/AdoptionForm';

const AdoptionPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getPetById } = usePets();
  const navigate = useNavigate();

  const [pet, setPet] = useState(id ? getPetById(id) : undefined);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (id) {
      const petData = getPetById(id);
      if (petData) {
        setPet(petData);
        // Update page title
        document.title = `Adopt ${petData.name} - PawMates`;
      } else {
        navigate('/not-found');
      }
    }

    return () => {
      // Reset title when unmounting
      document.title = 'PawMates | Find Your Perfect Pet';
    };
  }, [id, getPetById, navigate]);

  const handleFormSubmit = (formData: any) => {
    console.log('Form submitted:', formData);
    // In a real app, this would send the data to an API
    setSubmitted(true);
    window.scrollTo(0, 0);
  };

  if (!pet) {
    return (
      <div className="container-custom py-16 text-center">
        <p className="text-xl">Loading pet details...</p>
      </div>
    );
  }

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
          <h1 className="text-3xl md:text-4xl font-bold">Adopt {pet.name}</h1>
        </div>
      </div>

      <div className="container-custom py-8">
        {submitted ? (
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="mb-6 flex justify-center">
              <div className="bg-green-100 rounded-full p-3">
                <CheckCircle2 className="h-16 w-16 text-green-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-4">Application Submitted Successfully!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for your interest in adopting {pet.name}. We've received your application and our team will review it shortly. You'll receive an email confirmation at the address you provided.
            </p>
            <p className="text-gray-600 mb-8">
              Our adoption counselors will contact you within 1-2 business days to discuss next steps in the adoption process.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/pets" className="btn-primary">
                Browse More Pets
              </Link>
              <Link to="/" className="btn-outline">
                Return to Home
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - Pet summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                <div className="aspect-square overflow-hidden rounded-lg mb-4">
                  <img
                    src={pet.images[0]}
                    alt={pet.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">{pet.name}</h3>
                <p className="text-gray-600 mb-4">
                  {pet.breed} • {pet.age} {pet.age === 1 ? 'year' : 'years'} • {pet.gender.charAt(0).toUpperCase() + pet.gender.slice(1)}
                </p>
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <p className="text-lg font-semibold text-primary-800 mb-1">Adoption Fee: ${pet.adoptionFee}</p>
                  <p className="text-sm text-gray-500">
                    Includes spay/neuter, vaccinations, microchipping, and initial vet check
                  </p>
                </div>
              </div>
            </div>

            {/* Right column - Adoption form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <AdoptionForm pet={pet} onSubmit={handleFormSubmit} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdoptionPage;