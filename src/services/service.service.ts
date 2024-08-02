import { Service } from '@/infra/interfacess/service';
import { authorizedRequest } from '../utils/axios';
import { env } from '@/infra/config/env';
import axios from 'axios';

const API_URL = env.apiUrl + '/services';


export const createService = async (title: string, description: string, price: number): Promise<Service> => {
  return authorizedRequest(API_URL, 'POST', { title, description, price });
};

export const getServices = async (): Promise<Service[]> => {
  // return authorizedRequest(API_URL, 'GET');
  return axios.get(API_URL)
};

export const updateService = async (id: string, title: string, description: string, price: number): Promise<Service> => {
  return authorizedRequest(`${API_URL}/${id}`, 'PUT', { title, description, price });
};

export const deleteService = async (id: string): Promise<void> => {
  return authorizedRequest(`${API_URL}/${id}`, 'DELETE');
};
