import React from 'react';
import { Search, Heart, ClipboardCheck, Home } from 'lucide-react';

const steps = [
  {
    icon: <Search className="h-10 w-10 text-primary-500" />,
    title: 'Browse & Search',
    description: 'Explore our catalog of pets available for adoption. Filter by type, size, and more to find your perfect match.'
  },
  {
    icon: <Heart className="h-10 w-10 text-primary-500" />,
    title: 'Choose a Pet',
    description: 'Learn about each pet\'s personality, background, and needs to find the one that fits your lifestyle.'
  },
  {
    icon: <ClipboardCheck className="h-10 w-10 text-primary-500" />,
    title: 'Apply to Adopt',
    description: 'Fill out our adoption application and our team will review it to ensure a good match for both you and the pet.'
  },
  {
    icon: <Home className="h-10 w-10 text-primary-500" />,
    title: 'Welcome Home',
    description: 'Once approved, schedule a time to pick up your new family member and welcome them to their forever home.'
  }
];

const HowItWorks: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-3">How Adoption Works</h2>
          <p className="text-gray-600">
            Our simple four-step process makes finding and adopting your new companion easy and enjoyable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="bg-gray-50 rounded-xl p-6 text-center relative animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex justify-center mb-4">
                <div className="bg-primary-100 rounded-full p-4">
                  {step.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
              
              {/* Step number */}
              <div className="absolute -top-3 -right-3 bg-primary-600 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold text-sm">
                {index + 1}
              </div>
              
              {/* Connector (not for the last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 border-t-2 border-dashed border-primary-300"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;