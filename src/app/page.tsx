"use client";

import { useState } from 'react';
import { login } from '@/services/auth.service';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const response = await login(email, password);

    if (response.status === 201) {
      console.log('Logado com sucesso!');
      setLoading(false); 
      console.log(response.data);
    } else {
      setLoading(false);
      console.log(response.response.message)
      setError(response.data);
    }
  };

  return (
    <div className='h-screen w-full grid items-center place-content-center'>
      <form className='bg-white w-[25rem] py-[3rem] rounded-lg shadow shadow-white px-14' onSubmit={handleSubmit}>
        <center><h2 className="font-bold tracking-wider mb-3 text-black text-3xl">BULIR APP</h2></center>
        <div className='flex flex-col text-black'>
          <label htmlFor="email" className='text-xs text-gray-300'>Email</label>
          <input
            id="email"
            type="email"
            value={email}
            className='border-2 border-gray rounded-sm py-2 px-4 mt-1 outline-none focus:border-black/70 transition-all'
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='flex mt-4 flex-col text-black'>
          <label htmlFor="password" className='text-xs text-gray-300'>Password</label>
          <input
            id="password"
            type="password"
            value={password}
            className='border-2 border-gray rounded-sm py-2 px-4 mt-1 outline-none focus:border-black/70 transition-all'
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className='text-red-600 text-xs text-center mt-2'>{error}</p>}
        <button className='bg-black hover:bg-black/80 transition-all w-full py-2 mt-4 text-lg font-semibold ' type="submit">
          {loading ? 'Entrando...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
