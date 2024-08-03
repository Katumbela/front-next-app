
"use client"; // Deve estar no início do arquivo
import CardService from '@/components/card-service';
import NavBar from '@/components/navbar';
import useUser from '@/hooks/userHooks';
import { Service } from '@/infra/interfacess/service';
import { getAllCookies, getServices } from '@/services/service.service';

import { useEffect, useState } from 'react';


import useSWR from 'swr';


const fetcher = () => getServices();

const MyServices = () => {
    const { data, error } = useSWR('/services', fetcher);
    const { user } = useUser()
    const [cookies, setCookies] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        // Obter todos os cookies e armazenar no estado
        const allCookies = getAllCookies();
        setCookies(allCookies);
    }, []);

    if (error) return <div>Failed to load</div>;
    if (!data) return <div>Loading...</div>;


    // console.log(data)
    return (
        <div className="s p-20 mx-auto">
            <NavBar />

            <div>
                <a className='bg-white text-black px-2 py-1 mb-4' href="/services/list">Home</a>
                <h2 className="text-white font-bold text-4xl">
                    Bulir App - My Services
                </h2>
                <p>
                    Search for local services to contract, whenever you want or even wherever
                </p>
            </div>
            <br />

            <div className='flex gap-6 flex-wrap sm:flex-nowrap'>
                {data.filter((e) => e.provider?.id === user?.id).map((service: Service, i) => (
                    <CardService isDashboard={true} key={i} data={service} />
                ))}
            </div>
        </div>
    );
};

export default MyServices;
