import axios from 'axios';

const conectionAxios = axios.create({
  baseURL: 'http://localhost:5000'
});

export default conectionAxios;
