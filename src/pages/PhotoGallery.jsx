import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const PhotoGallery = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    {
      src: "/gallery/image-1.jpg",
      alt: "Bangladesi Biryani",
      title: "Bangladesi Biryani",
      description: "Fragrant rice cooked with marinated (chicken/beef/mutton)",
    },
    {
      src: "/gallery/image-2.jpg",
      alt: "Hilsa Fish Curry (Ilish Bhapa)",
      title: "Hilsa Fish Curry (Ilish Bhapa)",
      description: "Hilsa fish steamed with mustard paste, turmeric, chili, and coconut milk, wrapped in banana leaves.",
    },
    {
      src: "/gallery/image-3.jpg",
      alt: "Fuchka (Pani Puri)",
      title: "Fuchka (Pani Puri)",
      description: "Crispy hollow puris filled with mashed potatoes, chickpeas, tamarind water, and spicy mint water.",
    },
    {
      src: "/gallery/image-4.jpg",
      alt: "Mishti Doi (Sweet Yogurt)",
      title: "Mishti Doi (Sweet Yogurt)",
      description: "Creamy sweet yogurt made with caramelized sugar (jaggery or sugar) and fermented in earthen pots.",
    },
    {
      src: "/gallery/image-5.jpg",
      alt: "Panta Bhat (Fermented Rice)",
      title: "Panta Bhat (Fermented Rice)",
      description: "Leftover rice soaked in water overnight, served with salt, green chili, onion, and fried fish",
    },
    {
      src: "/gallery/image-6.jpg",
      alt: "Chapli Kebab",
      title: "Chapli Kebab",
      description: "Spiced minced meat (beef or lamb) patties fried with herbs and served with naan.",
    },
    {
      src: "/gallery/image-7.jpg",
      alt: "Gulab Jamun",
      title: "Gulab Jamun",
      description: "Deep-fried milk-solid balls soaked in sugar syrup, a popular dessert.",
    },
    {
      src: "/gallery/image-8.jpg",
      alt: "Haleem",
      title: "Haleem",
      description: "Thick porridge made with lentils, wheat, barley, and meat (chicken/beef), garnished with fried onions and lemon.",
    },
    {
      src: "/gallery/image-9.jpg",
      alt: "Nihari",
      title: "Nihari",
      description: "Slow-cooked stew with tender beef or mutton, spices, and wheat flour for thickness.",
    },
    {
      src: "/gallery/image-10.jpg",
      alt: "Pakestani Biryani",
      title: "Pakestani Biryani",
      description: "Flavorful rice dish with basmati rice, meat (chicken/beef), spices, and fried onions.",
    },
    {
      src: "/gallery/image-11.jpg",
      alt: "Green Curry (Gaeng Keow Wan)",
      title: "Green Curry (Gaeng Keow Wan)",
      description: "Coconut milk-based curry with green chili paste, chicken, eggplant, and basil.",
    },
    {
      src: "/gallery/image-12.jpg",
      alt: "Mango Sticky Rice",
      title: "Mango Sticky Rice",
      description: "Sweet dessert made with glutinous rice, fresh mango, and coconut milk.",
    },
  ];

  // slides mapping to include the title and description
  const slides = images.map((image) => ({
    src: image.src,
    alt: image.alt,
    title: image.title, // Add this line
    description: image.description, // Add this line
  }));

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-80 w-full bg-gradient-to-r from-stone-500 via-blue-800 to-fuchsia-800">
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-4xl md:text-6xl font-bold text-stone-200 text-center px-4">
            Our Amazing Food Gallery Glimpse
          </h2>
        </div>
      </div>

      {/* Gallery Grid - WITH HOVER TITLES */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group"
              onClick={() => {
                setCurrentIndex(index);
                setLightboxOpen(true);
              }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              {/* Grid Title Overlay (shown on hover) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <h3 className="text-white text-lg font-bold">{image.title}</h3>
                <p className="text-white/80 text-sm line-clamp-2">
                  {image.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox - WITH TITLES */}
      {lightboxOpen && (
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={slides}
          index={currentIndex}
          render={{
            slide: ({ slide }) => (
              <div className="relative h-full w-full">
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className="object-contain h-full w-full"
                />
                {/* Lightbox Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-xl font-bold text-white">
                    {slide.title}
                  </h3>
                  <p className="text-white/80 text-sm mt-1">
                    {slide.description}
                  </p>
                </div>
              </div>
            ),
          }}
          carousel={{ finite: false }}
          controller={{ closeOnBackdropClick: true }}
        />
      )}
    </main>
  );
};

export default PhotoGallery;
