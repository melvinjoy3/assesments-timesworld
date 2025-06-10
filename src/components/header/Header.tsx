import React, { useState } from "react";
import { Container, Nav, Row, Col, Navbar, Offcanvas } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setActiveTab } from "../../store/uiSlice";

const CountryTabs = () => {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector((state) => state.ui.activeTab);
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const tabs = ["All", "Asia", "Europe"];

  const handleSelect = (selectedKey: string | null) => {
    if (selectedKey) {
      dispatch(setActiveTab(selectedKey));
      setShowOffcanvas(false);
    }
  };

  return (
    <Container fluid className="p-5">
      <Row className="align-items-center justify-content-between px-5">
        <Col xs={6} sm={6} md={4}>
          <strong className="fs-4">Countries</strong>
        </Col>

        {/* Desktop Navigation */}
        <Col md={8} className="d-none d-md-flex justify-content-end">
          <Nav
            variant="underline"
            activeKey={activeTab}
            onSelect={handleSelect}
            className="gap-3"
          >
            {tabs.map((tab) => (
              <Nav.Item key={tab}>
                <Nav.Link
                  eventKey={tab}
                  className="p-0 text-muted"
                  style={{ fontWeight: activeTab === tab ? "600" : "400" }}
                >
                  {tab}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </Col>

        {/* Mobile Hamburger Menu */}
        <Col xs={6} sm={6} md={0} className="d-md-none text-end">
          <button
            className="border-0 bg-transparent"
            onClick={() => setShowOffcanvas(true)}
            aria-label="Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-list"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
              />
            </svg>
          </button>
        </Col>
      </Row>

      {/* Mobile Offcanvas Menu */}
      <Offcanvas
        show={showOffcanvas}
        onHide={() => setShowOffcanvas(false)}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav
            variant="underline"
            activeKey={activeTab}
            onSelect={handleSelect}
            className="flex-column gap-3"
          >
            {tabs.map((tab) => (
              <Nav.Item key={tab}>
                <Nav.Link
                  eventKey={tab}
                  className="p-0 text-muted"
                  style={{ fontWeight: activeTab === tab ? "600" : "400" }}
                >
                  {tab}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </Container>
  );
};

export default CountryTabs;
