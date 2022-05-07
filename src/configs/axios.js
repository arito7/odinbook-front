import Axios from 'axios';
import local from '../helpers/localStorage';

export default Axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 1000,
  headers: { Authorization: `Bearer ${local.getJwt()}` },
});
