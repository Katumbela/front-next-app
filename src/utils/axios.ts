import axios from 'axios';
import { getCookie } from './cookies';  // Certifique-se de que o caminho está correto

const API_URL = '/api';

// Função para criar uma instância autorizada do Axios
const createAuthorizedAxiosInstance = () => {
  const token = getCookie('token');
  const csrfToken = getCookie('X-CSRF-TOKEN');

  console.log('Token:', token);
  console.log('CSRF Token:', csrfToken);

  const instance = axios.create({
    baseURL: API_URL,
    headers: {
      'Authorization': `Bearer ${token}`,
      'X-CSRF-TOKEN': csrfToken || '', // Inclua CSRF token se necessário
    },
    withCredentials: true,
  });

  return instance;
};

// Função para realizar requisições autorizadas
export const authorizedRequest = async (url: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', data?: any) => {
  try {
    const instance = createAuthorizedAxiosInstance();
    const response = await instance.request({
      url,
      method,
      data,
    });
    return response.data;
  } catch (error) {
    console.error('Request failed', error);
    throw error;
  }
};
