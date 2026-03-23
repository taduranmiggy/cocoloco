// PromoCarousel.js - Rotating promotional banner carousel
import React, { useState, useEffect } from 'react';
import '../styles/promoCarousel.css';

const PromoCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: 'COCOIRSTORE PH',
      subtitle: 'Premium coconut coir products from the Philippines',
      image: 'https://images.unsplash.com/photo-1708883575520-767e545afa18?w=1200&h=400&fit=crop',
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      cta: 'SHOP NOW'
    },
    {
      id: 2,
      title: 'Premium Quality Coir',
      subtitle: '100% Natural & Eco-Friendly from Philippine Coconut Farms',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Coir_fibery.jpg/1200px-Coir_fibery.jpg',
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      cta: 'DISCOVER'
    },
    {
      id: 3,
      title: 'Free Shipping',
      subtitle: 'On orders above ₱500',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Making_coir_rope_in_Kerala.JPG/1200px-Making_coir_rope_in_Kerala.JPG',
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      cta: 'EXPLORE'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Auto-rotate every 5 seconds
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="promo-carousel">
      {/* Carousel Container */}
      <div className="carousel-container">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="slide-overlay" style={{ background: slide.color, opacity: 0.7 }}></div>
            <div className="slide-content">
              <h1 className="slide-title">{slide.title}</h1>
              <p className="slide-subtitle">{slide.subtitle}</p>
              <button className="slide-cta">{slide.cta}</button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button className="carousel-arrow prev-arrow" onClick={prevSlide}>
        &lt;
      </button>
      <button className="carousel-arrow next-arrow" onClick={nextSlide}>
        &gt;
      </button>

      {/* Carousel Indicators (Dots) */}
      <div className="carousel-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`indicator-dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default PromoCarousel;
