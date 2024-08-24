import axios from "axios";
import { getLocalStorage } from "./local-storage";
import { getCookie } from "./cookies";


const API_URL = '/api';
  
const createAuthorizedAxiosInstance = () => {
  const token = getLocalStorage('token');
  const csrfToken = getCookie('XSRF-TOKEN'); 
   

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

// Função para realizar requisições autorizadas
export const authorizedRequest = async (url: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH', data?: any) => {
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
