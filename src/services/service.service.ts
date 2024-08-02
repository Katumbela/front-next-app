import { Service } from '@/infra/interfacess/service';
import { authorizedRequest } from '../utils/axios';

const API_URL = '/services';


export const createService = async (title: string, description: string, price: number): Promise<Service> => {
  return authorizedRequest(API_URL, 'POST', { title, description, price });
};

export const getServices = async (): Promise<Service[]> => {
  return authorizedRequest(API_URL, 'GET');
};

export const updateService = async (id: string, title: string, description: string, price: number): Promise<Service> => {
  return authorizedRequest(`${API_URL}/${id}`, 'PUT', { title, description, price });
};

export const deleteService = async (id: string): Promise<void> => {
  return authorizedRequest(`${API_URL}/${id}`, 'DELETE');
};
