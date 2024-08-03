import { Service } from '@/infra/interfacess/service';
import { authorizedRequest } from '../utils/axios';
import { env } from '@/infra/config/env';

const API_URL = env.apiUrl + '/services';


export const createService = async (title: string, description: string, price: number): Promise<Service> => {
  return authorizedRequest(API_URL, 'POST', { title, description, price });
};

export const getServices = async (): Promise<Service[]> => {


  return authorizedRequest(API_URL, 'GET');
  // return axios.get(API_URL)
};

export const updateService = async (id: string, title: string, description: string, price: number): Promise<any> => {
  return authorizedRequest(`${API_URL}/${id}`, 'PATCH', { price, description });
};

export const contractService = async (id: string, clientId: number, serviceId: number, price: number): Promise<any> => {
  return authorizedRequest(`${API_URL}/${id}`, 'POST', { clientId, serviceId });
};

export const deleteService = async (id: string): Promise<void> => {
  return authorizedRequest(`${API_URL}/${id}`, 'DELETE');
};


export const getAllCookies = (): { [key: string]: string } => {
  const cookies = document.cookie.split('; ');
  const cookieObj: { [key: string]: string } = {};

  cookies.forEach(cookie => {
    const [name, value] = cookie.split('=');
    cookieObj[name] = value;
  });

  return cookieObj;
};
