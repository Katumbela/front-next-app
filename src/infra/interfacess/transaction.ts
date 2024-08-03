import { IUser } from "./user";

export interface Transaction {
    id: number;
    service: string; 
    client: IUser;
    amount: number;
    date: string;
    serviceId: number
    provider: IUser
  }
  