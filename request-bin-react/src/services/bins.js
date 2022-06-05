import axios from 'axios';
const baseUrl = '/api/bins';

const getOne = url => {
  const request = axios.get(`${baseUrl}/view/${url}`)
  return request.then(response => response.data)
}

const create = () => {
  const request = axios.post(baseUrl);
  return request.then(response => response.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then(response => response.data);
};

const methods = {
  getOne, create, update
}

export default methods;

// POST http://localhost:3000/:3001/api/bins 