import { getCookie, setCookie } from '@/utils/cookies';
import axios from 'axios';


const API_URL = '/api/auth';

interface LoginResponse {
  token: string;
}

export const login = async (email: string, password: string): Promise<void> => {
  const response = await axios.post<LoginResponse>(`${API_URL}/login`, { email, password }, { withCredentials: true });
  const { token } = response.data;

  // Armazenar o token JWT no cookie
  setCookie('token', token);

  // Obtém e armazena o CSRF Token
  const csrfToken = getCookie('X-CSRF-TOKEN');
  if (csrfToken) {
    setCookie('X-CSRF-TOKEN', csrfToken);
  }
};

export const register = async (email: string, password: string): Promise<void> => {
  await axios.post(`${API_URL}/register`, { email, password });
};
