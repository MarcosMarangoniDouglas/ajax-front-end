import React, { Component } from 'react';
import { Row, Col, Nav } from 'react-bootstrap';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {

  }

  render() {
    return (
      <React.Fragment>
        <Row className="header">
          <Col>
            <Row>
              <img src="/star_wars_logo.svg" />
            </Row>
          </Col>
          <Col className="navigation-col">
            <Nav activeKey="/" className="navigation">
              <Nav.Item>
                <Nav.Link href="/" className="text-bold">Home</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Item className="dropdown-btn text-bold">Admin
                <Nav.Item className="dropdown-content">
                  <Nav.Link href="/new">Add New</Nav.Link>
                  <Nav.Link href="/actions">Edit / Delete</Nav.Link>
                </Nav.Item>
                </Nav.Item>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default Header;