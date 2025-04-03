import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const PhotoGallery = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Sample images (replace with your actual images)
  const images = Array.from({ length: 12 }, (_, i) => ({
    src: `/gallery/image-${i + 1}.jpg`,
    alt: `Gallery Image ${i + 1}`,
  }));

  const slides = images.map((image) => ({
    src: image.src,
    alt: image.alt,
  }));

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-80 w-full bg-gradient-to-r from-stone-500 via-blue-400 to-fuchsia-800">
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-4xl md:text-6xl font-bold text-stone-200 text-center px-4">
            Our Amazing Food Gallery Glimpse
          </h2>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => {
                setCurrentIndex(index);
                setLightboxOpen(true);
              }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/*Lightbox */}
      {lightboxOpen && (
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={slides}
          index={currentIndex}
          carousel={{
            finite: false,
          }}
          controller={{
            closeOnBackdropClick: true,
          }}
        />
      )}
    </main>
  );
};

export default PhotoGallery;
