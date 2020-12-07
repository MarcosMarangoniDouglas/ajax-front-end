import React, { Component, useState, useEffect } from 'react';
import { Table, Container, Row, Form } from 'react-bootstrap';
import Characters from '../api/characters';

function Home() {
  const [state, setState] = useState({
    filteredCharacters: [],
    characters: [],
    name: '',
    height: '',
    mass: '',
    gender: ''
  });

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    try {
      let response = await Characters.index();
      setState({ ...state, filteredCharacters: response.data, characters: response.data });
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
          <th>{character.height !== 'unknown' ? `${character.height} cm` : `Height not provided`}</th>
          <th>{character.mass !== 'unknown' ? `${character.mass} kg` : `Mass not provided`}</th>
          <th>{character.gender !== 'unknown' ? `${character.gender}` : `Gender not provided`}</th>
        </tr>))
    );
  }

  return (
    <Container>
      <Row className="justify-content-center"><h2>Sample List of Star Wars characters</h2></Row>
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
    </Container>
  );
}

export default Home;