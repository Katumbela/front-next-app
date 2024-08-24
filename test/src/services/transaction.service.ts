// services/transaction.service.ts
import { Transaction } from '@/infra/interfacess/transaction';
import { authorizedRequest } from '../utils/axios';
import { env } from '@/infra/config/env';

const API_URL = env.apiUrl + '/transactions';

export const getTransactions = async (userId: number): Promise<Transaction[]> => {
  return authorizedRequest(`${API_URL}/history?userId=${userId}`, 'GET');
};
