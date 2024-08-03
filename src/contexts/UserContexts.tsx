"use client"
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { IUser } from '@/infra/interfacess/user';
import { getCookie } from '@/utils/cookies';
import { setLocalStorage } from '@/utils/local-storage';
import axios from 'axios';
import { env } from '@/infra/config/env';
import { useRouter } from 'next/navigation';

const API_ROUTE = env.apiUrl;

interface UserContextType {
  user: IUser | null;
  login: (email: string, password: string) => Promise<any>;
  register: (user: IUser) => Promise<void>;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = localStorage.getItem('user');
      // console.log('Stored User:', storedUser);

      if (storedUser) {
        try {
          const u = JSON.parse(storedUser);
          //console.log('Parsed User:', u);
          setUser(u);
        } catch (error) {
          console.error('Failed to parse user:', error);
        }
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    //console.log(user)
    window.setTimeout(() => {
      if (user?.email === '') {
        //console.log(user?.length);
        router.push('/');
      }
    }, 5000)
    /*if(location.pathname == '/' && user) {
      router.push('/services/list')
    }*/
  }, [user, router]);


  const login = async (email: string, password: string): Promise<any> => {
    try {
      const response = await axios.post(
        `${API_ROUTE}/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      const { access_token, user } = response.data;



      setLocalStorage('token', access_token);
      setLocalStorage('user', JSON.stringify(user));
      //response.headers['set-cookie'] 
      const csrfToken = getCookie('XSRF-TOKEN');
      if (csrfToken) {
        setLocalStorage('XSRF-TOKEN', csrfToken);
      }

      setUser(user);
      // window.location.href = '/services/list'
      return response;
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  };

  const register = async (user: IUser): Promise<void> => {
    try {
      await axios.post(`${API_ROUTE}/users`, user);
    } catch (error) {
      console.error('Registration failed', error);
      throw error;
    }
  };

  const logout = async () => {
    localStorage.removeItem('user')
  }

  return (
    <UserContext.Provider value={{ user, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
