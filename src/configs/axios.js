import Axios from 'axios';
import local from '../helpers/localStorage';

const axios = Axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 1000,
});

axios.interceptors.request.use((config) => {
  const jwt = local.getJwt();
  config.headers = { ...config.headers, Authorization: `Bearer ${jwt}` };
  return config;
});

export default axios;
