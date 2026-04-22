import { useState, useEffect } from 'react';
import { Carousel as BootstrapCarousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import carouselData from '../../data/carousel-data.json';
import './carousel.css';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  buttonText: string;
  buttonLink: string;
}

function Carousel() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setSlides(carouselData.slides);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div className="carousel-loading">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <BootstrapCarousel 
      className="custom-carousel"
      interval={5000}
      fade
      pause="hover"
      indicators={true}
      controls={true}
    >
      {slides.map((slide) => (
        <BootstrapCarousel.Item key={slide.id}>
          <div className="carousel-image-wrapper">
            <img
              className="d-block w-100 carousel-image"
              src={slide.imageUrl}
              alt={slide.title}
              loading="lazy"
            />
            <div className="carousel-overlay"></div>
          </div>
          <BootstrapCarousel.Caption className="carousel-caption-custom">
            <div className="carousel-content">
              <h2 className="carousel-title">{slide.title}</h2>
              <h4 className="carousel-subtitle">{slide.subtitle}</h4>
              <p className="carousel-description">{slide.description}</p>
              <Link to={slide.buttonLink} className="btn carousel-btn">
                {slide.buttonText}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="btn-icon">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </BootstrapCarousel.Caption>
        </BootstrapCarousel.Item>
      ))}
    </BootstrapCarousel>
  );
}

export default Carousel;