import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import { ArrowLeft, ArrowRight } from "react-bootstrap-icons";
import { useAppSelector } from "../../store/hooks";
import "./slider.css";
import { tabs } from "../../config/Constant";

const ImageSlider = () => {
  const { items } = useAppSelector((state) => state.countries);
  const activeTab = useAppSelector((state) => state.ui.activeTab);
  const [index, setIndex] = useState(0);

  // Filter countries based on active tab
  const filteredCountries = items.filter(
    (country) =>
      activeTab === tabs[0] ||
      country.region.toLowerCase() === activeTab.toLowerCase()
  );

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  // Calculate which dot should be active based on current index
  const getActiveDot = () => {
    const totalItems = filteredCountries.length;
    const dotsToShow = Math.min(4, totalItems);
    const itemsPerDot = totalItems / dotsToShow;
    return Math.min(Math.floor(index / itemsPerDot), dotsToShow - 1);
  };

  // Handle dot click
  const handleDotClick = (dotIndex: number) => {
    const totalItems = filteredCountries.length;
    const dotsToShow = Math.min(4, totalItems);
    const itemsPerDot = totalItems / dotsToShow;
    const newIndex = Math.min(
      Math.floor(dotIndex * itemsPerDot),
      totalItems - 1
    );
    setIndex(newIndex);
  };

  // Handle previous button click
  const goToPrev = () => {
    const totalItems = filteredCountries.length;
    if (index === 0) {
      setIndex(totalItems - 1);
    } else {
      setIndex(index - 1);
    }
  };

  // Handle next button click
  const goToNext = () => {
    const totalItems = filteredCountries.length;
    if (index === totalItems - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  };

  // Reset index when filter changes
  React.useEffect(() => {
    setIndex(0);
  }, [activeTab]);

  if (!filteredCountries.length) return null;

  // Calculate total number of dots needed
  const totalDots = Math.min(4, filteredCountries.length);

  return (
    <div className="position-relative w-100 px-3 mb-4">
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        controls={false}
        indicators={false}
        interval={null}
      >
        {filteredCountries.map((country, idx) => (
          <Carousel.Item key={idx}>
            <div className="d-flex justify-content-center align-items-center slider-carousel">
              <div className="text-center">
                <img
                  src={country.flag}
                  alt={country.name}
                  className="slider-image"
                />
                <h3 className="h5 fw-bold">{country.name}</h3>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Navigation Controls */}
      <div className="d-flex justify-content-center align-items-center mt-3 slider-navigation">
        <ArrowLeft onClick={goToPrev} className="sider-pointer" size={20} />
        {Array.from({ length: totalDots }, (_, dotIndex) => (
          <span
            key={dotIndex}
            onClick={() => handleDotClick(dotIndex)}
            className="slider-span"
            style={{
              backgroundColor: dotIndex === getActiveDot() ? "#000" : "#ccc",
            }}
          ></span>
        ))}
        <ArrowRight onClick={goToNext} className="sider-pointer" size={20} />
      </div>
    </div>
  );
};

export default ImageSlider;
