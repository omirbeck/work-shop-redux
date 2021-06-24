import React, { useState } from "react";
import { Col, Container, Nav, NavItem, Row } from "react-bootstrap/";
import Navbar from 'react-bootstrap/Navbar';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootswatch/dist/journal/bootstrap.min.css';
import "./App.css";
import WeatherDisplay from "./components/WeatherDisplay";
import { PLACES } from "./const";

const App = () => {
  const [activePlace, setActivePlace] = useState(0);
  
  return (
    <div className="App">
      <Navbar>
          <Navbar.Brand>React Weather</Navbar.Brand>
      </Navbar>
      <Container>
        <Row>
          <Col md={4} sm={4}>
            <h3>Select a city</h3>
            <Nav
              variant="pills" 
              activeKey={activePlace}
              className="flex-column"
              bsPrefix="nav"
              >  
              {PLACES.map(({ name }, index) => (
                <NavItem 
                  key={index}
                  eventKey={index}
                  onClick={() => setActivePlace(index)}
                >
                  <Nav.Link eventKey={index}>
                    {name}
                  </Nav.Link>
                </NavItem>
              ))}
            </Nav>
          </Col>
          <Col md={8} sm={8}>
            <WeatherDisplay name={PLACES[activePlace].name} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
