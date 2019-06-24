import axios from 'axios';
import { BASE_URL } from './CONSTANTS';

const conectionAxios = axios.create({
  baseURL: BASE_URL
});

export default conectionAxios;
