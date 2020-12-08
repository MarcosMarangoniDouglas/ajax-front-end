import axios from './axios';

function index(page, size) {
  return axios.get('characters', {
    params: {
      page,
      size
    }
  });
}

function show(id) {
  return axios.get(`characters/${id}`);
}

function create(med) {
  return axios.post('characters', med);
}

function update(id, character) {
  return axios.put(`characters/${id}`, character);
}

function remove(id) {
  return axios.delete(`characters/${id}`);
}

export default {
  index,
  show,
  create,
  update,
  remove
};