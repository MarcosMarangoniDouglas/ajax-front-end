import React, { useState, useEffect } from 'react';
import { Table, Container, Row, Form } from 'react-bootstrap';
import Characters from '../api/characters';
import Pagination from './pagination';

function Home() {
  const [state, setState] = useState({
    filteredCharacters: [],
    characters: [],
    name: '',
    height: '',
    mass: '',
    gender: '',
    total: 0
  });

  useEffect(() => {
    fetchData(0, 10);
  }, [])

  const fetchData = async (page, size) => {
    try {
      let response = await Characters.index(page, size);
      setState({ ...state, filteredCharacters: response.data.documents, characters: response.data.documents, total: response.data.total });
    } catch (error) {
      console.log(error.message);
    }
  }

  const filter = (e, key) => {
    const attr = e.target.value;
    const tmpFilteredCharacters = state.characters.filter((character) => {
      return character[key].includes(attr);
    });
    setState({...state, filteredCharacters: tmpFilteredCharacters, [key]: attr });
  }

  const renderCharacters = () => {
    return (
      state.filteredCharacters.map((character, index) => 
        (<tr key={`character-${index}`}>
          <th>{character.name}</th>
          <th>{character.height !== 'unknown' ? `${character.height} cm` : character.height}</th>
          <th>{character.mass !== 'unknown' ? `${character.mass} kg` : character.mass}</th>
          <th>{character.gender !== 'unknown' ? `${character.gender}` : character.gender}</th>
        </tr>))
    );
  }

  return (
    <Container>
      <Row className="justify-content-center"><h2>Sample List of Star Wars Characters</h2></Row>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Name</th>
            <th>Height</th>
            <th>Mass</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th><Form.Control value={state.name} onChange={(v) => filter(v, 'name')}/></th>
            <th><Form.Control value={state.height} onChange={(v) => filter(v, 'height')}/></th>
            <th><Form.Control value={state.mass} onChange={(v) => filter(v, 'mass')}/></th>
            <th><Form.Control value={state.gender} onChange={(v) => filter(v, 'gender')}/></th>
          </tr>
          { renderCharacters() }
        </tbody>
      </Table>
      <Row>
        <Pagination total={state.total} onClick={fetchData}/>
      </Row>
    </Container>
  );
}

export default Home;