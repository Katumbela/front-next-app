
"use client"; // Deve estar no início do arquivo



import CardService from '@/components/card-service';
import NavBar from '@/components/navbar';
import useUser from '@/hooks/userHooks';
import { Service } from '@/infra/interfacess/service';
import { getServices } from '@/services/service.service';

import useSWR from 'swr';


const fetcher = () => getServices();

const ServiceList = () => {
    const { data, error } = useSWR('/services', fetcher);
    const { user, logout } = useUser()
    if (error) return <div>Failed to load</div>;
    if (!data) return <div>Loading...</div>;

    function GoTo(link: string) {
        window.location.href = link
    }
    return (
        <div className="s p-20 mx-auto">
            <NavBar />
            <div>
                <h2 className="text-white font-bold text-4xl">
                    Bulir App
                </h2>
                <p>
                    Search for local services to contract, whenever you want or even wherever
                </p>
            </div>
            <br />

            <div className='grid gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
                {data.map((service: Service, i) => (
                    <CardService key={i} data={service} />
                ))}
            </div>
        </div>
    );
};

export default ServiceList;
