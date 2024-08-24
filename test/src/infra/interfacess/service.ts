import { IUser } from "./user";

export interface Service {
    id: string;
    title: string;
    description: string;
    price: number;
    provider?: IUser
  }