 
"use client";

import { useState } from 'react';
import { register } from '@/services/auth.service';  

const Register = () => {
    const [fullName, setFullName] = useState('');
    const [nif, setNif] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('provider');
    // const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const userDatas = {
            fullName,
            nif,
            email,
            password,
            userType,
            balance: 5000
        }

        try {
            await register(userDatas);
            setLoading(false); 
        } catch (error: any) {
            setLoading(false);
            console.log(error.message);
            setError('Falha ao registrar. Verifique suas informações.' + error.message);
            console.error('Registration error:', error);
        }
    };


    return (
        <div className='h-screen w-full grid items-center place-content-center'>
            <form className='bg-white w-[25rem] py-[2rem] rounded-lg shadow shadow-white px-14' onSubmit={handleSubmit}>
                <center><h2 className="font-bold tracking-wider mb-3 text-black text-3xl">BULIR APP</h2></center>
                <div className='flex flex-col text-black'>
                    <label htmlFor="fullName" className='text-xs text-gray-300'>Full Name</label>
                    <input
                        id="fullName"
                        type="text"
                        value={fullName}
                        className='border-2 border-gray rounded-sm py-2 px-4 mt-1 outline-none focus:border-black/70 transition-all'
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
                </div>
                <div className='flex flex-col mt-4 text-black'>
                    <label htmlFor="nif" className='text-xs text-gray-300'>NIF</label>
                    <input
                        id="nif"
                        type="text"
                        value={nif}
                        className='border-2 border-gray rounded-sm py-2 px-4 mt-1 outline-none focus:border-black/70 transition-all'
                        onChange={(e) => setNif(e.target.value)}
                        required
                    />
                </div>
                <div className='flex flex-col mt-4 text-black'>
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
                <div className='flex flex-col mt-4 text-black'>
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
                <div className='flex flex-col mt-4 text-black'>
                    <label htmlFor="userType" className='text-xs text-gray-300'>User Type</label>
                    <select
                        id="userType"
                        value={userType}
                        className='border-2 border-gray rounded-sm py-2 px-4 mt-1 outline-none focus:border-black/70 transition-all'
                        onChange={(e) => setUserType(e.target.value)}
                        required
                    >
                        <option value="provider">Provider</option>
                        <option value="consumer">Consumer</option>
                    </select>
                </div>
                {
                    /*
                         <div className='flex flex-col mt-4 text-black'>
                        <label htmlFor="balance" className='text-xs text-gray-300'>Balance</label>
                        <input
                            id="balance"
                            type="number"
                            value={balance}
                            className='border-2 border-gray rounded-sm py-2 px-4 mt-1 outline-none focus:border-black/70 transition-all'
                            onChange={(e) => setBalance(Number(e.target.value))}
                            required
                        />
                    </div>
                    */
                }
                {error && <p className='text-red-600 text-xs text-center mt-2'>{error}</p>}
                <button className='bg-black hover:bg-black/80 transition-all w-full py-2 mt-4 text-lg font-semibold' type="submit">
                    {loading ? 'Registrando...' : 'Register'}
                </button>
                <br />
                <br />
                <center>
                    <a href="/" className='text-black hover:underline'>Login</a>
                </center>
            </form>
        </div>
    );
};

export default Register;
