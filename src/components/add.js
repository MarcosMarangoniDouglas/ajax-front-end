import React, { Component } from 'react';
import { Form, Button, Container, Card, Modal } from 'react-bootstrap';
import qs from 'qs';
import Characters from '../api/characters';


class AddNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      name: '',
      height: '',
      mass: '',
      gender: '',
      showModal: false
    };
  }


  componentDidMount() {
    const { location } = this.props;
    const character = qs.parse(location.search, { ignoreQueryPrefix: true });
    if (character) {
      this.setState({
        name: character.name,
        height: character.height,
        mass: character.mass,
        gender: character.gender,
        id: character._id
      });
    }
  }

  onSubmitCharacter = (e) => {
    const character = {
      name: e.target[0].value,
      height: e.target[1].value,
      mass: e.target[2].value,
      gender: e.target[3].value
    }

    console.log('ID', this.state.id);
    if (this.state.id) {
      Characters.update(this.state.id, character)
        .then(response => {
          this.setState({ showModal: true });
        })
        .catch(error => {
          console.log(error.message);
        });
    } else {
      Characters.create(character)
        .then(response => {
          this.setState({ showModal: true });
        })
        .catch(error => {
          console.log(error.message);
        });
    }

    e.preventDefault();
  }

  render() {
    return (
      <Container>
        <Modal animation={false} show={this.state.showModal}>
          <Modal.Body>
            <p>Character saved succesffuly.</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.setState({ showModal: false })}>Close</Button>
          </Modal.Footer>
        </Modal>

        <Card style={{ padding: 15 }}>
          <Form onSubmit={this.onSubmitCharacter}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control defaultValue={this.state.name} type="text" placeholder="" />
            </Form.Group>

            <Form.Group controlId="height">
              <Form.Label>Height (cm)</Form.Label>
              <Form.Control defaultValue={this.state.height} type="text" placeholder="" />
            </Form.Group>

            <Form.Group controlId="mass">
              <Form.Label>Mass (kg)</Form.Label>
              <Form.Control defaultValue={this.state.mass} type="text" placeholder="" />
            </Form.Group>

            <Form.Group controlId="gender">
              <Form.Label>Gender</Form.Label>
              <Form.Control defaultValue={this.state.gender} type="text" placeholder="" />
            </Form.Group>

            <Button variant="warning" type="submit">Submit</Button>&nbsp;
            <Button variant="secondary" href="/">Cancel</Button>
          </Form>
        </Card>
      </Container>
    );
  }
}

export default AddNew;