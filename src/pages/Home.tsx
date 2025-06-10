import React, { useEffect, useRef } from "react";
import Header from "../components/header/Header";
import { FixedSizeGrid as Grid } from "react-window";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import "../assets/css/style.css";
import ImageSlider from "../components/slider/Slider";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchCountries, loadMore } from "../store/countriesSlice";
import Button from "../components/button/Button";
import Footer from "../components/footer/Footer";

const ITEMS_PER_PAGE = 12;
const ROW_HEIGHT = 100;

const Home = () => {
  const dispatch = useAppDispatch();
  const { items, displayedItems, currentPage, loading, error } = useAppSelector(
    (state) => state.countries
  );
  const activeTab = useAppSelector((state) => state.ui.activeTab);
  const [gridWidth, setGridWidth] = React.useState(1200);
  const [columnWidth, setColumnWidth] = React.useState(600);
  const [columnCount, setColumnCount] = React.useState(2);
  const containerRef = useRef<HTMLDivElement>(null);

  // Add filtered items based on activeTab
  const filteredItems = React.useMemo(() => {
    if (activeTab === "All") {
      return displayedItems;
    }
    // First filter the items by region
    const regionFilteredItems = items.filter(
      (item) => item.region.toLowerCase() === activeTab.toLowerCase()
    );
    // Then take only the items up to the current page
    return regionFilteredItems.slice(0, currentPage * ITEMS_PER_PAGE);
  }, [items, displayedItems, activeTab, currentPage]);

  useEffect(() => {
    dispatch(fetchCountries());
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  const handleResize = () => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      if (containerWidth < 768) {
        setColumnCount(1);
        setColumnWidth(containerWidth - 32);
        setGridWidth(containerWidth);
      } else if (containerWidth < 1200) {
        setColumnCount(2);
        setColumnWidth((containerWidth - 64) / 2);
        setGridWidth(containerWidth);
      } else {
        setColumnCount(2);
        setColumnWidth(600);
        setGridWidth(1200);
      }
    }
  };

  const handleLoadMore = () => {
    if (loading) return;
    dispatch(loadMore());

    setTimeout(() => {
      const startIndex = currentPage * ITEMS_PER_PAGE;
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
    if (index >= filteredItems.length) return null;
    const item = filteredItems[index];

    return (
      <div style={style} className="p-2" data-row-index={rowIndex}>
        <div className="country-card d-flex align-items-center border border-secondary p-3 bg-white h-100">
          <img
            src={item.flag}
            alt={item.name}
            className="me-3 border border-secondary home-image"
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
        <Row className="mb-4">
          <Col xs={12} className="text-center d-flex justify-content-center">
            <div className="d-flex align-items-center justify-content-center w-100">
              <hr className="flex-grow-1 mx-2 mx-md-4 border-dark d-none d-md-block" />
              <h1 className="h2 fw-bold text-dark mb-0">WELCOME</h1>
              <hr className="flex-grow-1 mx-2 mx-md-4 border-dark d-none d-md-block" />
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
            <div className="p-3 d-flex justify-content-center">
              <Grid
                columnCount={columnCount}
                columnWidth={columnWidth}
                height={600}
                rowCount={Math.ceil(filteredItems.length / columnCount)}
                rowHeight={ROW_HEIGHT}
                width={gridWidth}
              >
                {Cell}
              </Grid>
            </div>
          </Col>
        </Row>

        {/* Load More Button */}
        {displayedItems.length < items.length && (
          <Row className="mt-4">
            <Col className="text-center">
              <Button handleLoadMore={handleLoadMore} disabled={loading}>
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
      <Footer />
    </div>
  );
};

export default Home;
