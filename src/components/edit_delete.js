import React, { Component } from 'react';
import { Table, Container, Button, ButtonGroup, Modal, Row } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import qs from 'qs';
import Characters from '../api/characters';
import Pagination from './pagination';

class Edit_Delete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      characters: [],
      showModal: false,
      redirectToEdit: false,
      character: {},
      total: 0
    };
  }

  async componentDidMount() {
    await this.refreshCharacters(0, 10);
  }

  refreshCharacters = async (page, size) => {
    try {
      let response = await Characters.index(page,size);
      this.setState({ characters: response.data.documents, total: response.data.total });
    } catch (error) {
      console.log(error.message);
    }
  }

  onEditCharacter = (character) => {
    console.log(qs.stringify(character));
    this.setState({ redirectToEdit: true, character });
  }

  onRemoveCharacter = async (character) => {
    try {
      let response = await Characters.remove(character._id);
      await this.refreshCharacters();
      this.setState({ showModal: true })
    } catch (error) {
      console.log(error.message);
    }
  }

  redirectToEdit = () => {
    if (this.state.redirectToEdit) {
      return <Redirect to={`/new?${qs.stringify(this.state.character)}`} />
    }
    return null;
  }

  renderCharacters = () => {
    return (
      this.state.characters.map((character, index) =>
        (<tr key={`character-${index}`}>
          <th>{character.name}</th>
          <th>{character.height !== 'unknown' ? `${character.height} cm` : `Height not provided`}</th>
          <th>{character.mass !== 'unknown' ? `${character.mass} kg` : `Mass not provided`}</th>
          <th>{character.gender !== 'unknown' ? `${character.gender}` : `Gender not provided`}</th>
          <th>
            <ButtonGroup>
              <Button variant="warning" onClick={() => this.onEditCharacter(character)}>Edit</Button>&nbsp;
              <Button variant="danger" onClick={() => this.onRemoveCharacter(character)}>Delete</Button>
            </ButtonGroup>
          </th>
        </tr>))
    );
  }

  render() {
    const { characters } = this.state;
    return (
      <Container>

        {this.redirectToEdit()}
        <Modal animation={false} show={this.state.showModal}>
          <Modal.Body>
            <p>Character saved succesffuly.</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.setState({ showModal: false })}>Close</Button>
          </Modal.Footer>
        </Modal>

        <Row className="justify-content-center"><h2>Sample List of Star Wars Characters</h2></Row>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Name</th>
              <th>Height</th>
              <th>Mass</th>
              <th>Gender</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.renderCharacters()}
          </tbody>
        </Table>
        <Row>
          <Pagination total={this.state.total} onClick={this.refreshCharacters} />
        </Row>
      </Container>
    );
  }
}

export default Edit_Delete;