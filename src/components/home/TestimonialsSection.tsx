import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  petName: string;
  image: string;
  text: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    location: 'San Francisco, CA',
    petName: 'Max',
    image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    text: 'Adopting Max from PawMates was the best decision I\'ve ever made. The process was smooth, and the team was incredibly helpful in matching me with the perfect companion. Max has brought so much joy to my life!',
    rating: 5
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    location: 'Portland, OR',
    petName: 'Luna',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    text: 'I was nervous about adopting, but PawMates made it easy. Their detailed profiles helped me find Luna, who\'s a perfect match for my family. The follow-up care and resources have been fantastic.',
    rating: 5
  },
  {
    id: 3,
    name: 'Emily Chen',
    location: 'Austin, TX',
    petName: 'Buddy',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    text: 'After months of searching, I found Buddy on PawMates. Their filtering options made it easy to find exactly what I was looking for. The adoption process was straightforward, and now Buddy and I are inseparable!',
    rating: 4
  }
];

const TestimonialsSection: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [animating, setAnimating] = useState(false);

  const nextTestimonial = () => {
    if (animating) return;
    
    setAnimating(true);
    setCurrentTestimonial((prev) => 
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    if (animating) return;
    
    setAnimating(true);
    setCurrentTestimonial((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimating(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [currentTestimonial]);

  // Auto rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 8000);

    return () => clearInterval(interval);
  }, [animating]);

  return (
    <section className="py-16 bg-gradient-to-r from-secondary-900 to-primary-900 text-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-3">Happy Adoption Stories</h2>
          <p className="text-gray-200">
            Hear from families who found their perfect furry companions through PawMates.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Testimonials Carousel */}
          <div className="overflow-hidden relative rounded-xl bg-white/10 backdrop-blur-sm p-8">
            <div 
              className="transition-opacity duration-500 ease-in-out"
              style={{ opacity: animating ? 0 : 1 }}
            >
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/3">
                  <img 
                    src={testimonials[currentTestimonial].image} 
                    alt={testimonials[currentTestimonial].name}
                    className="rounded-full w-24 h-24 object-cover mx-auto border-4 border-white/20"
                  />
                </div>

                <div className="md:w-2/3 text-center md:text-left">
                  <div className="flex mb-3 justify-center md:justify-start">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-5 w-5 ${i < testimonials[currentTestimonial].rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`} 
                      />
                    ))}
                  </div>

                  <blockquote className="text-lg mb-4 italic">
                    "{testimonials[currentTestimonial].text}"
                  </blockquote>

                  <div>
                    <p className="font-semibold text-lg">{testimonials[currentTestimonial].name}</p>
                    <p className="text-gray-300">
                      {testimonials[currentTestimonial].location} • Adopted {testimonials[currentTestimonial].petName}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <button 
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 p-2 rounded-full transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button 
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 p-2 rounded-full transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Indicators */}
          <div className="flex justify-center space-x-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!animating) {
                    setAnimating(true);
                    setCurrentTestimonial(index);
                  }
                }}
                className={`h-2 rounded-full transition-all ${
                  currentTestimonial === index 
                    ? 'w-6 bg-white' 
                    : 'w-2 bg-white/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;