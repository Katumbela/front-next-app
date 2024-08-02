import { Transaction } from '@/infra/interfacess/transaction';
import { authorizedRequest } from '../utils/axios';

const API_URL = '/transactions';

export const getTransactions = async (): Promise<Transaction[]> => {
  return authorizedRequest(API_URL, 'GET');
};
