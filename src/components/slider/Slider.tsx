import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import { ArrowLeft, ArrowRight } from "react-bootstrap-icons";
import { useAppSelector } from "../../store/hooks";
import "../../assets/css/style.css";

const ImageSlider = () => {
  const { items } = useAppSelector((state) => state.countries);
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  const goToPrev = () => {
    setIndex(index === 0 ? items.length - 1 : index - 1);
  };

  const goToNext = () => {
    setIndex(index === items.length - 1 ? 0 : index + 1);
  };

  if (!items.length) return null;

  return (
    <div className="position-relative w-100 px-3 mb-4">
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        controls={false}
        indicators={false}
        interval={null}
      >
        {items.map((country, idx) => (
          <Carousel.Item key={idx}>
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "300px", backgroundColor: "#f4f4f4" }}
            >
              <div className="text-center">
                <img
                  src={country.flag}
                  alt={country.name}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "200px",
                    objectFit: "contain",
                    marginBottom: "1rem",
                  }}
                />
                <h3 className="h5 fw-bold">{country.name}</h3>
                <p className="text-muted">{country.region}</p>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Navigation Controls */}
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          position: "absolute",
          bottom: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          gap: "12px",
          background: "rgba(255,255,255,0.7)",
          padding: "6px 12px",
          borderRadius: "20px",
        }}
      >
        <ArrowLeft onClick={goToPrev} style={{ cursor: "pointer" }} size={20} />
        {items.map((_, idx) => (
          <span
            key={idx}
            onClick={() => setIndex(idx)}
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: idx === index ? "#000" : "#ccc",
              display: "inline-block",
              cursor: "pointer",
            }}
          ></span>
        ))}
        <ArrowRight
          onClick={goToNext}
          style={{ cursor: "pointer" }}
          size={20}
        />
      </div>
    </div>
  );
};

export default ImageSlider;
