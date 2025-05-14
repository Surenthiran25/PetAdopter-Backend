import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize } from 'lucide-react';

interface PetGalleryProps {
  images: string[];
  name: string;
}

const PetGallery: React.FC<PetGalleryProps> = ({ images, name }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const nextImage = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const openModal = () => {
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <div className="relative rounded-xl overflow-hidden">
        {/* Main Image */}
        <div className="aspect-square md:aspect-[4/3] bg-gray-200 relative">
          <img
            src={images[currentImage]}
            alt={`${name} - Photo ${currentImage + 1}`}
            className="w-full h-full object-cover"
          />

          {/* Navigation Buttons */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 p-2 rounded-full transition-colors text-white"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 p-2 rounded-full transition-colors text-white"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          {/* Expand Button */}
          <button
            onClick={openModal}
            className="absolute top-4 right-4 bg-black/30 hover:bg-black/50 p-2 rounded-full transition-colors text-white"
            aria-label="View full size image"
          >
            <Maximize className="h-5 w-5" />
          </button>
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex mt-4 space-x-2 overflow-x-auto py-1">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`relative rounded-md overflow-hidden flex-shrink-0 transition-all ${
                  currentImage === index
                    ? 'ring-2 ring-primary-500'
                    : 'opacity-70 hover:opacity-100'
                }`}
                aria-label={`View image ${index + 1}`}
              >
                <div className="h-16 w-16 bg-gray-200">
                  <img
                    src={image}
                    alt={`${name} - Thumbnail ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Full Screen Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div className="relative max-w-5xl max-h-screen">
            <img
              src={images[currentImage]}
              alt={`${name} - Full size`}
              className="max-w-full max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-3 rounded-full transition-colors text-white"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-3 rounded-full transition-colors text-white"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            <button
              onClick={closeModal}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 p-2 rounded-full transition-colors text-white"
              aria-label="Close modal"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PetGallery;