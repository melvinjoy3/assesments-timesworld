import React, { useEffect, useState, useRef } from "react";
import Header from "../components/header/Header";
import { FixedSizeGrid as Grid } from "react-window";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import "../assets/css/style.css";
import { getCountries } from "../API/Response";
import ImageSlider from "../components/slider/Slider";

const ITEMS_PER_PAGE = 12;
const ROW_HEIGHT = 100;

const Home = () => {
  const [countries, setCountries] = useState<any[]>([]);
  const [displayedCountries, setDisplayedCountries] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [gridWidth, setGridWidth] = useState(1200);
  const [columnWidth, setColumnWidth] = useState(600);
  const [columnCount, setColumnCount] = useState(2);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getCountries1();
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleResize = () => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      if (containerWidth < 768) {
        setColumnCount(1);
        setColumnWidth(containerWidth - 32); // Account for padding
        setGridWidth(containerWidth);
      } else if (containerWidth < 1200) {
        setColumnCount(2);
        setColumnWidth((containerWidth - 64) / 2); // Account for padding and gap
        setGridWidth(containerWidth);
      } else {
        setColumnCount(2);
        setColumnWidth(600);
        setGridWidth(1200);
      }
    }
  };

  const getCountries1 = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCountries();
      setCountries(data);
      setDisplayedCountries(data.slice(0, ITEMS_PER_PAGE));
    } catch (error) {
      console.error("Error fetching countries:", error);
      setError("Failed to load countries. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (loading) return;

    setLoading(true);
    const nextPage = currentPage + 1;
    const startIndex = (nextPage - 1) * ITEMS_PER_PAGE;
    const endIndex = nextPage * ITEMS_PER_PAGE;

    setDisplayedCountries((prev) => [
      ...prev,
      ...countries.slice(startIndex, endIndex),
    ]);
    setCurrentPage(nextPage);
    setLoading(false);

    setTimeout(() => {
      const newContent = document.querySelector(
        `[data-row-index="${Math.floor(startIndex / columnCount)}"]`
      );
      if (newContent) {
        newContent.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const Cell = ({ columnIndex, rowIndex, style }: any) => {
    const index = rowIndex * columnCount + columnIndex;
    if (index >= displayedCountries.length) return null;
    const item = displayedCountries[index];

    return (
      <div style={style} className="p-2" data-row-index={rowIndex}>
        <div className="d-flex align-items-center border border-secondary p-3 bg-white h-100">
          <img
            src={item.flag}
            alt={item.name}
            className="me-3 border border-secondary"
            style={{ width: "64px", height: "40px", objectFit: "cover" }}
          />
          <div>
            <h2 className="h5 fw-semibold mb-1">{item.name}</h2>
            <p className="text-muted small mb-0">{item.region}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-vh-100 bg-light">
      <Header />
      <Container className="py-4">
        {/* Welcome Banner */}
        <Row className="justify-content-center mb-4">
          <Col xs={12} className="text-center">
            <div className="d-flex align-items-center justify-content-center">
              <hr className="flex-grow-1 mx-4" style={{ maxWidth: "300px" }} />
              <h1 className="h2 fw-bold text-dark mb-0">WELCOME</h1>
              <hr className="flex-grow-1 mx-4" style={{ maxWidth: "300px" }} />
            </div>
          </Col>
        </Row>
        <ImageSlider />

        {/* Error Message */}
        {error && (
          <Row className="mb-4">
            <Col className="text-center text-danger">{error}</Col>
          </Row>
        )}

        {/* Virtualized Grid */}
        <Row>
          <Col xs={12} ref={containerRef}>
            <div className="p-3">
              <Grid
                columnCount={columnCount}
                columnWidth={columnWidth}
                height={600}
                rowCount={Math.ceil(displayedCountries.length / columnCount)}
                rowHeight={ROW_HEIGHT}
                width={gridWidth}
              >
                {Cell}
              </Grid>
            </div>
          </Col>
        </Row>

        {/* Load More Button */}
        {displayedCountries.length < countries.length && (
          <Row className="mt-4">
            <Col className="text-center">
              <Button
                variant="primary"
                onClick={loadMore}
                disabled={loading}
                className="px-4 py-2"
              >
                {loading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    Loading...
                  </>
                ) : (
                  "Load More"
                )}
              </Button>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default Home;
