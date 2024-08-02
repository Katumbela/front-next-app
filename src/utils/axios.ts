import axios from 'axios';
import { getCookie } from './cookies';

const API_URL = '/api';

const createAuthorizedAxiosInstance = () => {
  const token = getCookie('token');
  const csrfToken = getCookie('X-CSRF-TOKEN'); 

  const instance = axios.create({
    baseURL: API_URL,
    headers: {
      'Authorization': `Bearer ${token}`,
      'X-CSRF-TOKEN': csrfToken || '', 
    },
    withCredentials: true, 
  });

  return instance;
};

export const authorizedRequest = async (url: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', data?: any) => {
  const instance = createAuthorizedAxiosInstance();
  const response = await instance.request({
    url,
    method,
    data,
  });
  return response.data;
};
