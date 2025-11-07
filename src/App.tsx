import React, { useRef, useState } from "react";
import "./App.css";
import { Slider, type SliderRef } from "./components/slider";

const App: React.FC = () => {
  const sliderRef = useRef<SliderRef>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Sample slides data
  const productSlides = [
    {
      id: 1,
      title: "Product 1",
      image: "https://picsum.photos/400/300?random=1",
      price: "$299",
      description: "Amazing product description",
    },
    {
      id: 2,
      title: "Product 2",
      image: "https://picsum.photos/400/300?random=2",
      price: "$399",
      description: "Another great product",
    },
    {
      id: 3,
      title: "Product 3",
      image: "https://picsum.photos/400/300?random=3",
      price: "$499",
      description: "Premium product here",
    },
    {
      id: 4,
      title: "Product 4",
      image: "https://picsum.photos/400/300?random=4",
      price: "$599",
      description: "Best seller product",
    },
    {
      id: 5,
      title: "Product 5",
      image: "https://picsum.photos/400/300?random=5",
      price: "$699",
      description: "Limited edition",
    },
    {
      id: 6,
      title: "Product 6",
      image: "https://picsum.photos/400/300?random=6",
      price: "$799",
      description: "Exclusive item",
    },
  ];

  const colorSlides = [
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#96CEB4",
    "#FFEAA7",
    "#DFE6E9",
    "#74B9FF",
    "#A29BFE",
  ];

  const testimonialSlides = [
    {
      name: "John Doe",
      role: "CEO, Company A",
      avatar: "https://i.pravatar.cc/150?img=1",
      text: "This is the best product I've ever used. Highly recommended!",
      rating: 5,
    },
    {
      name: "Jane Smith",
      role: "Designer, Company B",
      avatar: "https://i.pravatar.cc/150?img=2",
      text: "Amazing experience! The quality exceeded my expectations.",
      rating: 5,
    },
    {
      name: "Mike Johnson",
      role: "Developer, Company C",
      avatar: "https://i.pravatar.cc/150?img=3",
      text: "Great value for money. Will definitely buy again.",
      rating: 4,
    },
    {
      name: "Sarah Williams",
      role: "Manager, Company D",
      avatar: "https://i.pravatar.cc/150?img=4",
      text: "Professional service and excellent product quality.",
      rating: 5,
    },
  ];

  return (
    <div className="app max-w-full overflow-hidden">
      <div className="container">
        <h1 className="main-title">🎠 Z-Slider Component Examples</h1>

        {/* Example 1: Basic Slider */}
        <section className="example-section overflow-hidden">
          <h2 className="section-title">1. Basic Slider</h2>
          <p className="section-description">
            Simple slider with 3 slides per view and navigation controls
          </p>
          <Slider isCenter loop slidesToShow={3} gap={20}>
            {colorSlides.map((color, index) => (
              <div
                key={index}
                className="color-slide w-full"
                style={{ backgroundColor: color }}
              >
                <h3>Slide {index + 1}</h3>
                <p>{color}</p>
              </div>
            ))}
          </Slider>
        </section>

        {/* Example 2: Loop Slider */}
        <section className="example-section overflow-hidden">
          <h2 className="section-title">2. Infinite Loop Slider</h2>
          <p className="section-description">
            Slider with infinite loop enabled for continuous scrolling
          </p>
          <Slider slidesToShow={3} gap={20} loop>
            {colorSlides.slice(0, 5).map((color, index) => (
              <div
                key={index}
                className="color-slide w-full"
                style={{ backgroundColor: color }}
              >
                <h3>Slide {index + 1}</h3>
                <p>Loop Mode</p>
              </div>
            ))}
          </Slider>
        </section>

        {/* Example 3: Product Slider */}
        <section className="example-section overflow-hidden">
          <h2 className="section-title">3. Product Showcase</h2>
          <p className="section-description">
            E-commerce style product slider with custom slide rendering
          </p>
          <Slider
            slidesToShow={3}
            gap={24}
            loop
            renderSlide={(slide, index, isActive) => (
              <div className={`product-card ${isActive ? "active" : ""}`}>
                {slide}
              </div>
            )}
          >
            {productSlides.map((product) => (
              <div key={product.id} className="product-content">
                <img
                  src={product.image}
                  alt={product.title}
                  className="product-image"
                />
                <div className="product-info">
                  <h3>{product.title}</h3>
                  <p className="product-description">
                    {product.description}
                  </p>
                  <div className="product-footer">
                    <span className="product-price">{product.price}</span>
                    <button className="product-button">Add to Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </section>

        <section className="example-section overflow-hidden">
          <h2 className="section-title">4. Coverflow 3D Effect</h2>
          <p className="section-description">
            Beautiful 3D coverflow effect with customizable options
          </p>
          <Slider
            slidesToShow={3}
            gap={0}
            loop
            coverflow
            coverflowOptions={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
              centerSlideWidth: 50,
            }}
          >
            {productSlides.map((product) => (
              <div key={product.id} className=" bg-white w-full">
                <img
                  src={product.image}
                  alt={product.title}
                  className=" w-full"
                />
                <div className="coverflow-overlay">
                  <h3>{product.title}</h3>
                  <p>{product.price}</p>
                </div>
              </div>
            ))}
          </Slider>
        </section>

        {/* Example 5: Autoscroll Slider */}
        <section className="example-section overflow-hidden">
          <h2 className="section-title">5. Auto-Scroll Banner</h2>
          <p className="section-description">
            Automatic scrolling slider with pause on hover
          </p>
          <Slider
            slidesToShow={1}
            gap={0}
            loop
            autoScroll
            autoScrollInterval={3000}
            pauseOnHover
            showDots
            showButtons={false}
          >
            {productSlides.map((product) => (
              <div key={product.id} className="banner-slide">
                <img
                  src={product.image}
                  alt={product.title}
                  className="banner-image w-full"
                />
                <div className="banner-content">
                  <h2>{product.title}</h2>
                  <p>{product.description}</p>
                  <button className="banner-button">Shop Now</button>
                </div>
              </div>
            ))}
          </Slider>
        </section>

        {/* Example 6: Responsive Slider */}
        <section className="example-section overflow-hidden">
          <h2 className="section-title">6. Responsive Breakpoints</h2>
          <p className="section-description">
            Adapts to different screen sizes with custom breakpoints
          </p>
          <Slider
            slidesToShow={1}
            gap={10}
            loop
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 15,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
            }}
          >
            {colorSlides.map((color, index) => (
              <div
                key={index}
                className="responsive-slide w-full"
                style={{ backgroundColor: color }}
              >
                <h3>Slide {index + 1}</h3>
                <p>Responsive</p>
              </div>
            ))}
          </Slider>
        </section>

        {/* Example 7: Testimonial Slider */}
        <section className="example-section overflow-hidden">
          <h2 className="section-title">7. Testimonial Carousel</h2>
          <p className="section-description">
            Customer testimonials with custom styling
          </p>
          <Slider
            slidesToShow={3}
            gap={30}
            loop
            isCenter
            getSlideClassName={(_, isActive) =>
              isActive ? "testimonial-active" : "testimonial-inactive"
            }
          >
            {testimonialSlides.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-header">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="testimonial-avatar"
                  />
                  <div>
                    <h4>{testimonial.name}</h4>
                    <p className="testimonial-role">{testimonial.role}</p>
                  </div>
                </div>
                <div className="testimonial-rating">
                  {"⭐".repeat(testimonial.rating)}
                </div>
                <p className="testimonial-text">{testimonial.text}</p>
              </div>
            ))}
          </Slider>
        </section>

        {/* Example 8: RTL Support */}
        <section className="example-section">
          <h2 className="section-title">8. RTL (Right-to-Left) Slider</h2>
          <p className="section-description">
            Perfect for Arabic, Hebrew, and other RTL languages
          </p>
          <Slider slidesToShow={3} gap={20} direction="rtl" loop>
            {colorSlides.slice(0, 5).map((color, index) => (
              <div
                key={index}
                className="color-slide"
                style={{ backgroundColor: color }}
              >
                <h3>شريحة {index + 1}</h3>
                <p>RTL Mode</p>
              </div>
            ))}
          </Slider>
        </section>

        {/* Example 9: Controlled Slider with Custom Controls */}
        <section className="example-section overflow-hidden">
          <h2 className="section-title">9. Controlled Slider with Ref</h2>
          <p className="section-description">
            Programmatic control using ref and custom UI
          </p>
          <div className="custom-controls !mb-10">
            <button
              className="custom-button"
              onClick={() => sliderRef.current?.prev()}
            >
              ⬅️ Previous
            </button>
            <button
              className="custom-button"
              onClick={() => sliderRef.current?.next()}
            >
              Next ➡️
            </button>
            <button
              className="custom-button"
              onClick={() => sliderRef.current?.goTo(0)}
            >
              First Slide
            </button>
            <button
              className="custom-button"
              onClick={() => sliderRef.current?.toggleAutoScroll()}
            >
              Toggle Auto
            </button>
            <span className="slide-counter">
              Current: {currentSlide + 1} / {colorSlides.length}
            </span>
          </div>
          <Slider
            ref={sliderRef}
            slidesToShow={3}
            gap={20}
            loop
            autoScroll
            autoScrollInterval={4000}
            onSlideChange={(index) => setCurrentSlide(index)}
            showButtons={false}
          >
            {colorSlides.map((color, index) => (
              <div
                key={index}
                className="color-slide w-full"
                style={{ backgroundColor: color }}
              >
                <h3>Slide {index + 1}</h3>
                <p>Controlled</p>
              </div>
            ))}
          </Slider>
        </section>

        {/* Example 10: Single Slide Full Width */}
        <section className="example-section overflow-hidden">
          <h2 className="section-title">10. Full Width Hero Slider</h2>
          <p className="section-description">
            Single slide showcase with full width display
          </p>
          <div className="relative h-fit w-full">
            <Slider
              slidesToShow={1}
              loop
              gap={0}
              isCenter
              isHidden
              autoScroll
              autoScrollInterval={5000}
            >
              {productSlides.slice(0, 4).map((product) => (
                <div key={product.id} className=" w-full  ">
                  <img
                    src={product.image}
                    alt={product.title}
                    className=" w-full max-h-[500px]"
                  />
                  <div className="hero-overlay">
                    <h1 className="hero-title">{product.title}</h1>
                    <p className="hero-description">{product.description}</p>
                    <div className="hero-actions w-full flex flex-row justify-between">
                      <button className="hero-button primary">
                        Learn More
                      </button>
                      <button className="hero-button secondary">
                        Contact Us
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </section>

        {/* Example 11: Custom Slide Styling */}
        <section className="example-section overflow-hidden">
          <h2 className="section-title">11. Custom Active Slide Styling</h2>
          <p className="section-description">
            Dynamic styling based on slide state
          </p>
          <Slider
            slidesToShow={5}
            gap={10}
            loop
            isCenter
            getSlideStyle={(_, isActive) => ({
              transform: isActive ? "scale(1.6)" : "scale(0.8)",
              transition: "transform 0.3s ease",
              opacity: isActive ? 1 : 0.5,
            })}
          >
            {colorSlides.map((color, index) => (
              <div
                key={index}
                className="custom-styled-slide"
                style={{ backgroundColor: color }}
              >
                <h3>{index + 1}</h3>
              </div>
            ))}
          </Slider>
        </section>

        {/* Example 12: Debug Mode */}
        <section className="example-section overflow-hidden">
          <h2 className="section-title">12. Debug Mode</h2>
          <p className="section-description">
            Development mode with detailed information display
          </p>
          <Slider
            slidesToShow={3}
            gap={20}
            loop
            showDebug
            breakpoints={{
              768: {
                slidesPerView: 4,
                spaceBetween: 25,
              },
            }}
          >
            {colorSlides.slice(0, 6).map((color, index) => (
              <div
                key={index}
                className="color-slide w-full"
                style={{ backgroundColor: color }}
              >
                <h3>Debug {index + 1}</h3>
              </div>
            ))}
          </Slider>
        </section>
      </div>
    </div>
  );
};

export default App;