import { env } from '@/infra/config/env';
import { IUser } from '@/infra/interfacess/user';
import { getCookie, setCookie } from '@/utils/cookies';
import axios, { AxiosResponse } from 'axios';

const API_ROUTE = env.apiUrl;


export const login = async (email: string, password: string): Promise<any> => {

  const response: AxiosResponse = await axios.post(
    `${API_ROUTE}/auth/login`,
    { email, password },
    { withCredentials: true }
  );

  console.log(response)
  const { token } = response.data;

  // Armazenar o token JWT no cookie
  setCookie('token', token);

  // Obtém e armazena o CSRF Token
  const csrfToken = getCookie('X-CSRF-TOKEN');
  if (csrfToken) {
    setCookie('X-CSRF-TOKEN', csrfToken);
  }

  return { response };

};



export const register = async (user: IUser): Promise<void> => {
  await axios.post(`${API_ROUTE}/users`, user);
};
