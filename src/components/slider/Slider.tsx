import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import { ArrowLeft, ArrowRight } from "react-bootstrap-icons";
import "../../assets/css/style.css"; // Optional for custom styling

const ImageSlider = () => {
  const images = [
    "https://via.placeholder.com/600x300?text=Slide+1",
    "https://via.placeholder.com/600x300?text=Slide+2",
    "https://via.placeholder.com/600x300?text=Slide+3",
    "https://via.placeholder.com/600x300?text=Slide+4",
    "https://via.placeholder.com/600x300?text=Slide+5",
  ];

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  const goToPrev = () => {
    setIndex(index === 0 ? images.length - 1 : index - 1);
  };

  const goToNext = () => {
    setIndex(index === images.length - 1 ? 0 : index + 1);
  };

  return (
    <div
      className="position-relative"
      style={{ maxWidth: "700px", margin: "auto" }}
    >
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        controls={false}
        indicators={false}
        interval={null}
      >
        {images.map((img, idx) => (
          <Carousel.Item key={idx}>
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "300px", backgroundColor: "#f4f4f4" }}
            >
              <img
                src={img}
                alt={`Slide ${idx + 1}`}
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Persistent Arrows + Dots container (NOT inside Carousel.Item) */}
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
        {images.map((_, idx) => (
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
